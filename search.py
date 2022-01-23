from database_api import DatabaseAPI

"""
    This is how input dict query should be structured.
    query = {
        "string": "the query string",
        "semester": "one of the semester",
        "sort": "Course Code, Relevance, Rating, Title",
        "filters": {
            "special": "*" or "NEW",
            "dists": [list of dist codes],
            "grading": [list of grading categorise],
            "levels": [list of levels],
            "depts": [list of dept codes]
        }
    }
"""

def do_search(query: dict): 

    db = DatabaseAPI()

    string = query["string"]
    semester = query["semester"]

    query_filters = query["filters"]
    special = query_filters["special"]
    dists = query_filters["dists"]
    grading = query_filters["grading"]
    levels = query_filters["levels"]
    depts = query_filters["depts"]
    # sort = query.sort

    # Filters passed into MongoDB query to get courses
    course_filters = {"$and": []}
    # Filters passed into MongoDB query to get instructors
    instr_filters = {}

    # Assume semester is passed in as "[Fall/Spring/Summer] [Year]"
    term_data = db.db.semesters.find_one(
                {"name": semester}, {"_id": 0, "code": 1}
            )
    if term_data is not None:
        course_filters["$and"].append(
            {
                "term": term_data["code"]
            }
        )

    # Flag used to determine whether we query for courses
    # Remains False if no filters are set AND no query string entered
    get_courses = False

    # Assume special options are "*" (all courses), "NEW" (new courses)
    # Assume only one option can be selected
    if special == "*":
        get_courses = True
    elif special == "NEW":
        get_courses = True
        # TO-DO: implement getting NEW courses

    # Assume selected distribution codes are passed in as list
    # e.g. 'CD', 'EC', ...

    # New dist code: old dist code
    DIST_EQUIVALENTS = {
        "QCR": "QR",
        "SEL": "STL",
        "SEN": "STN",
    }
    if len(dists) > 0:
        get_courses = True
        all_dists = []
        for dist in dists:
            if dist in DIST_EQUIVALENTS:
                # regex handles courses with multiple distributions, e.g. "CD or SA"
                all_dists.append(
                    {"distribution": {"$regex": DIST_EQUIVALENTS[dist]}}
                )
            all_dists.append({"distribution": {"$regex": dist}})
        course_filters["$and"].append({"$or": all_dists})

    # Assume selected department codes are passed in as list
    # e.g. 'AAS', 'COS', ...
    if len(depts) > 0:
        get_courses = True
        course_filters["$and"].append(
            {
                "$or": [
                    {"department": {"$in": depts}},
                    {"crosslistings.subject": {"$in": depts}},
                ]
            }
        )

    # Assume selected levels are passed in as list
    # Based on Princeton Courses, options are [1-5]XX, UGRD, GRAD
    if len(levels) > 0:
        get_courses = True
        tracks, catalog_nums = [], []
        for level in levels:
            if level in ["UGRD", "GRAD"]:
                tracks.append(level)
            else:
                pattern = {"$regex": r"^" + level[0]}
                catalog_nums.extend(
                    [
                        {"catalog_number": pattern},
                        {"crosslistings.catalog_number": pattern},
                    ]
                )

        if len(tracks) > 0:
            course_filters["$and"].append({"track": {"$in": tracks}})

        if len(catalog_nums) > 0:
            course_filters["$and"].append({"$or": catalog_nums})

    # Assume selected grading is passed in as list
    # Based on Princeton Courses, options are PDF, PDFO, or NPDF (for PDF)
    # or AUDIT, NAUDIT (for AUDIT)
    # Assume only one PDF option, one AUDIT option can be selected
    PDF_MAPPINGS = {
        "PDF": {"required": False, "permitted": True},
        "PDFO": {"required": True, "permitted": True},
        "NPDF": {"required": False, "permitted": False},
    }

    AUDIT_MAPPINGS = {"AUDIT": True, "NAUDIT": False}

    if len(grading) > 0:
        get_courses = True
        pdf, audit = None, None
        for code in grading:
            if code in PDF_MAPPINGS.keys():
                pdf = PDF_MAPPINGS[code]
            elif code in AUDIT_MAPPINGS.keys():
                audit = AUDIT_MAPPINGS[code]

        if pdf is not None:
            course_filters["$and"].append({"pdf": pdf})

        if audit is not None:
            course_filters["$and"].append({"audit": audit})

    # Search by course code + number, title, or instructor
    if string != "":
        get_courses = True
        course_filters["$and"].append(
            {
                "$or": [
                    {"title": {"$regex": string, "$options": "i"}},
                    {
                        "catalog_title": {
                            "$regex": string.replace(" ", ""),
                            "$options": "i",
                        }
                    },
                ]
            }
        )

        names = string.split(" ")
        names = list(
            map(lambda name: {"$regex": r"^" + name, "$options": "i"}, names)
        )
        instr_filters["$or"] = []
        for name in names:
            instr_filters["$or"].extend(
                [{"name.first_name": name}, {"name.last_name": name},]
            )

    if not get_courses:
        return ([],[])

    # For debugging search tests:
    # print("== Course Filters: ==")
    # print(course_filters)
    # print("== Instructor Filters: ==")
    # print(instr_filters)

    course_res = db.db.courses.find(course_filters, {"_id": 0})
    instr_res = db.db.instructors.find(instr_filters, {"_id": 0})

    # TO-DO: do sort after retrieving results
    # TO-DO: return course information for each instructor retrieved

    # result[0] is list of courses, result[1] is list of instructors
    return (list(course_res), list(instr_res))

if __name__ == "__main__":
    import copy

    """
        query = {
            "string": "the query string",
            "semester": "one of the semester",
            "sort": "Course Code, Relevance, Rating, Title",
            "filters": {
                "special": "*" or "NEW",
                "dist": [list of dist codes],
                "grading": [list of grading categorise],
                "level": [list of levels],
                "depts": [list of dept codes]
            }
        }
    """

    empty_query = {
        "string": "",
        "semester": "Spring 2022",
        "filters": {
            "special": "",
            "dists": [],
            "grading": [],
            "levels": [],
            "depts": [],
        },
    }

    # For debugging search tests
    def call_search(get_course, get_instr):
        res = do_search(query)
        if get_course:
            print("# Courses returned:", len(res[0]))
        if get_instr:
            print("# Instructors returned:", len(res[1]))

    print("NO QUERY")
    query = copy.deepcopy(empty_query)
    print("# Courses returned:", len(do_search(query)))

    print("\nALL COURSES")
    query = copy.deepcopy(empty_query)
    query["filters"]["special"] = "*"
    call_search(True, False)

    print("\nSET DISTRIBUTIONS")
    query = copy.deepcopy(empty_query)
    query["filters"]["dists"] = ["CD", "QCR", "SEL", "SEN"]
    call_search(True, False)

    print("\nSET LEVELS")
    query = copy.deepcopy(empty_query)
    query["filters"]["levels"] = ["1XX", "5XX", "UGRD", "GRAD"]
    call_search(True, False)

    print("\nSET GRADING")
    query = copy.deepcopy(empty_query)
    query["filters"]["grading"] = ["PDFO", "AUDIT"]
    call_search(True, False)

    print("\nSET DEPTS")
    query = copy.deepcopy(empty_query)
    query["filters"]["depts"] = ["AAS", "COS", "NEU"]
    call_search(True, False)

    print("\nQUERY FOR COURSE (CODE)")
    query = copy.deepcopy(empty_query)
    query["string"] = "COS 126"
    call_search(True, True)

    print("\nQUERY FOR COURSE (CODE) - CASE INSENSITIVE")
    query = copy.deepcopy(empty_query)
    query["string"] = "cos 126"
    call_search(True, True)

    print("\nQUERY FOR CROSS-LISTED COURSE (CODE)")
    query = copy.deepcopy(empty_query)
    query["string"] = "EGR 126"
    call_search(True, True)

    print("\nQUERY FOR COURSE (CODE)")
    query = copy.deepcopy(empty_query)
    query["string"] = "202"
    call_search(True, True)

    print("\nQUERY FOR COURSE (TITLE)")
    query = copy.deepcopy(empty_query)
    query["string"] = "Race"
    call_search(True, True)

    print("\nQUERY FOR COURSE (TITLE) - CASE INSENSITIVE")
    query = copy.deepcopy(empty_query)
    query["string"] = "rAcE"
    call_search(True, True)

    print("\nQUERY FOR INSTRUCTORS")
    query = copy.deepcopy(empty_query)
    query["string"] = "Kevin"
    call_search(True, True)

    print("\nQUERY FOR INSTRUCTORS - CASE INSENSITIVE")
    query = copy.deepcopy(empty_query)
    query["string"] = "keViN"
    call_search(True, True)

    print("\nQUERY FOR INSTRUCTORS")
    query = copy.deepcopy(empty_query)
    query["string"] = "Wayne"
    call_search(True, True)

    print("\nQUERY FOR INSTRUCTORS - TWO NAMES")
    query = copy.deepcopy(empty_query)
    query["string"] = "kevin wayne"
    call_search(True, True)

    print("\nSET MULTIPLE FILTERS")
    query = copy.deepcopy(empty_query)
    query["string"] = "Race"
    query["filters"]["depts"] = ["AAS"]
    query["filters"]["dists"] = ["SA", "HA"]
    query["filters"]["grading"] = ["NPDF"]
    query["filters"]["levels"] = ["3XX"]
    call_search(True, False)