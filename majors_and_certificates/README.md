# Major and Certificate Requirements

Each of the folders named `certificates`, `degrees`, and `majors`
contains requirement files in either `JSON` or `YAML` format that are parsed
by `scripts/verifier.py`.

The parsed requirements are used to do automated requirements checking
of the user's course schedule, and are then displayed to the user in
the requirements tree panel on the right of the screen.

## Requirement File Categories

**Degrees** are either AB or BSE, and are automatically selected
depending on the degree type of the user's major.
This could in the future be expanded to include graduate degrees.

**Majors** are listed according to the three-letter course code of their
respective departments.

**Certificates** are also listed according to three-letter codes, but this
is less standardized, and the codes are not officially used by the registrar.
Certificates are currently not displayed to the user, but including them
is a major future goal.

The three-letter codes used for naming majors and certificates requirement
files are listed in [`scripts/university_info.py`](https://github.com/TigerPathApp/tigerpath/blob/master/tigerpath/majors_and_certificates/scripts/university_info.py).

## Understanding requirement files

Requirement files can be written in either `JSON` or `YAML` format.
In the past, the verifier had accepted only `JSON` files, and the examples
below are still in `JSON` format.

More recently, the option to use `YAML` format was added.
[`YAML`](https://en.wikipedia.org/wiki/YAML) is a superset of `JSON` but also
includes extra features which allow for the possibility to write cleaner
and more human-friendly requirement files.
So while the verifier now reads the files using a `YAML` parser,
either format is accepted.

Because of this, all the older requirement files are written in `JSON` format
(equivalently, compact `YAML`),
but any newer requirement files can be written in either the `JSON` or
`YAML` formats.

Each requirements file is structured as a tree with the full major at the root. The leaves code for the simplest kind of requirement,
which is usually a list of courses (encoded as a `course_list` or `dist_req`). Intermediate nodes (those
containing a `req_list`) express the relationships among their children.

### Course Code Conventions

At the bottom of the requirement trees, the leaves are nearly always
`course_list`s. A `course_list` is just a list of possible courses that
can count towards a requirement.

Most course codes in these lists are just simply the registrar's course code
for that course, such as `AAA 111`.
This is optionally followed by a colon (`:`) and the name of the course.
Note that everything after the colon *is not parsed*, and is
in fact just like a comment, used to aid a human reader in following along and
checking the list of courses.

There are several placeholders/wildcard codes that can capture many
courses using a single list item. These are used to capture broader
categories of courses, such as "300-level courses from the AAA" department,
or "200-level language courses".

Here are the possible types of course codes:

| code                                              | meaning                                                                           |
| ------------------------------------------------- | --------------------------------------------------------------------------------- |
| AAA 111<br>AAA 123/BBB 133                        | course listing                                                                    |
| AAA \*\*\*<br>AAA \*                              | any course in department AAA                                                      |
| AAA 2\*\*<br>AAA 2\*                              | any 200 level course in department AAA                                            |
| **LANG** 101                                      | the 101 course in any language department                                         |
| **STL**<br>**STN**<br>**EC**, **EM**, **HA**, etc | Distribution requirements                                                         |
| AAA 101: Intro to Aardvarks                       | course listing with title <br>(title is ignored and only for human readability)   |

### Requirements Format Specifications

Note: For the root node of the requirement tree, `min_needed` is always
implicitly `"ALL"` and `max_counted` is irrelevant, so neither is
explicitly present.

A `*` in the comment describing a field signifies that it is **required**.

In `YAML` format, the requirements files should be formatted to look like this:

```yaml
---
#* Major, Certificate, or Degree
type: Major
#* major/certificate name (If separate files for same program, specify AB/BSE.
# For instance, "Computer Science - BSE")
name: Name Studies
#* Three-letter dept code, as listed in university_info.py
# For Spanish/Portuguese and French/Italian, use SPO and FIT, respectively.
code: NST
#* the degree type of a major. AB or BSE for majors, or null otherwise
degree: AB
description: |-
  These are a few sentences describing the major/certificate.
  It is not strictly required, but should be copied from an official source.
  It can contain <i>html-type formatting</i>, and is displayed to the user in
  a tooltip when they hover over the major's name.
# allowed_majors is only relevant for certificates and should not appear for
# majors and degrees. It is a list of majors that are allowed to be taken with
# the certificate. Default if empty / not present is that all majors are allowed
allowed_majors:
- NST
# every source of information on the listed requirements should be linked to here
# and the info in the links should back up every detail of the requirements file
urls: #* links to requirements pages
- https://ua.princeton.edu/academic-units/name-studies
contacts: #* departmental office contacts for the department or certificate
- type: Departmental Representative
  name: Dr. Professor
  email: dprof@princeton.edu
#* requirement lists contain requirements and/or subrequirements
req_list: # the highest level **must** contain a req_list
- name: Prerequisites #* requirement name
  max_counted: 1 # > 0 or null: max units passed up to the parent requirement. unlimited if null
  min_needed: 4 #* >= 0 or "ALL": min units demanded of children (subrequirements)
  explanation: |- #* long human readable description of the requirement
    This text should be copied almost word-for-word from the department website.
    It can contain <i>html-type formatting</i> and can include the explicit list of courses if this is how the department website lists it.
    This text is displayed to the user in a tooltip when they hover over the requirement.
  double_counting_allowed: false # whether courses may count for multiple subrequirements of this requirement
                                 # should only be explicitly listed for the root of the subtree to which it applies
  max_common_with_major: 0 # number of courses that can be in common with major
                           # only relevant for certificates
  pdfs_allowed: false # whether student is allowed to take the courses SPDF (student-elected Pass/D/Fail)
                      # can be false, true, or a number indicating how many courses can
  completed_by_semester: 4 # 1-8: semester by the end of which the requirement must be complete
                           # optional and usually only needed for some prerequisites
  #* the requirement may contain only one of: a course_list, a req_list, a dist_req, or a num_courses
  # each has a different purpose and function
  req_list: #* a req_list defines this requirement as composed of a list of smaller subrequirements
  - name: First Prerequisite #* a subreq. is only revealed to user if its name field exists and is non-null
                             # otherwise, it is a 'hidden subrequirement'
    max_counted: 1 #* see above
    min_needed: 1 #* see above
    explanation: Take an interesting course in the department #*
    #* this again may be any one of: a course_list, a req_list, a dist_req, or a num_courses
    course_list: #* a course_list defines this requirement as an explicit or implicit list of courses
    - NST 100 # course lists contain the course codes
    - NST 2** # of courses satisfying the requirement
    - NST 312C # and, optionally, a colon-sparated course name which is
    - NST 96 # ignored by the parser (only for human reference)
    - NST 482/ACR 382 # (see the course code conventions table above)
    - 'NST 487: The Study of Modern Names'
    # an optional list of courses excluded from counting for this requirement
    excluded_course_list: # the format is the same as for a course_list
    - NST 221 # this prevents NST 221 from counting, despite NST 2** listed above
# any requirement that TigerPath cannot possibly verify,
# such as a Senior Thesis or internship, should contain a no_req
# instead of a req_list or course_list. Here is an example:
- name: Unverifiable Requirement
  max_counted: #*
  min_needed: #*
  explanation: All students must visit New York City three times. #*
  no_req: #*
```

For legacy requirement files, many of which are still written in `JSON`,
the format looks instead something like the following. Note that these are
both equivalent and equally valid `YAML` formats.

```yaml
{ # Note: JSON does not normally allow comments, but this is JSON parsed as YAML
  "type": "Major", # for descriptions of these fields, see the YAML version above
  "name": "Name Studies",
  "code": "NST", respectively.
  "degree": "AB",
  "description": "These are at most a couple sentences describing the Name Studies major/certificate.\nIt is not strictly required, but should be copied from an official source.",
  "allowed_majors": [
    "NST"
  ],
  "urls": [
    "https://ua.princeton.edu/academic-units/name-studies"
  ],
  "contacts": [
    {
      "type": "Departmental Representative",
      "name": "Dr. Professor",
      "email": "dprof@princeton.edu"
    }
  ],
  "req_list": [
    {
      "name": "Prerequisites",
      "max_counted": 1,
      "min_needed": 4,
      "explanation": "Long text\nfrom dept website",
      "double_counting_allowed": false,
      "max_common_with_major": 0,
      "pdfs_allowed": false,
      "completed_by_semester": 4,
      "req_list": [
        {
          "name": "First Prerequisite",
          "max_counted": 1,
          "min_needed": 1,
          "explanation": "Long description",
          "course_list": [
            "NST 100",
            "NST 2**",
            "NST 312C",
            "NST 96",
            "NST 482/ACR 382",
            "NST 487: The Study of Modern Names"
          ]
        }
      ]
    },
    {
      "name": "Unverifiable Requirement",
      "max_counted": null,
      "min_needed": null,
      "explanation": "All students must visit New York City three times.",
      "no_req": null
    }
  ]
}
```

### For Degrees (AB/BSE)

Additional subrequirement types are available for use in the requirement files
for degree types (AB: "Bachelor of Arts", and BSE: "Bachelor of Science in
Engineering"), but will normally not be used in major or certificate
requirement files, except perhaps in rare scenarios.

These include the `num_courses`, which verifies that the user has taken at
least a certain prescribed number of courses by different checkpoints in
their 4 years (used to track degree progress), and `dist_req`, which allows
any courses that fall under the specified
[distribution area](https://odoc.princeton.edu/curriculum/general-education-requirements)
to count.

Here is an example of their usage:

```yaml
{
  "type": "Degree",
  "name": "A.B.", # "A.B." or "B.S.E."
  "code": "AB", # "AB" or "BSE"
  "urls": [
    "https://ua.princeton.edu/contents/program-study-degree-bachelor-arts",
    ...
  ],
  "contacts": [
    {
      "type": "Dean",
      "name": "Dr. Professor",
      "email": "dprof@princeton.edu"
    }
  ],
  "req_list": [
    {
      "name": "Degree Progress",
      "max_counted": 1,
      "min_needed": "ALL",
      "explanation": "Explanation of degree progress requirements",
      "req_list": [
        {
          "name": "Courses completed by 6th semester",
          "max_counted": 1,
          "explanation": null,
          "completed_by_semester": 6,
          "num_courses": 31 # number of course credits that must be completed
          # note: min_needed is not present and is automatically set to num_courses
        },
        {
          ...
        }
      ]
    },
    {
      "name": "Epistemology and Cognition",
      "max_counted": 1,
      "min_needed": 1,
      "explanation": "Explanation",
      "dist_req": [
        "EC" # the distribution requirement code: EC, EM, HA, etc.
      ]
    },
    {
        ... # another requirement
    }
  ]
}
```

### Class Year Differences

The requirements file format supports another primitive called `year_switch`,
which decides from a list of possibilities depending on the user's class year.
This is useful when the requirements differ for students in different class
years.
For example, the requirements for a certain major might change, but then
only apply to the incoming class and later, or an exception might be made
for a specific class year.

A `year_switch` is formatted almost like a `req_list`, in that its value is
a list of subrequirements.
Each subrequirement must have a `year_code` field, a string or integer which
specifies which class year range that the subrequirement applies to
(refer to the [table below](#year-code-values) for possible values).
Style dictates that, for readability, the `year_code` field should always
appear at the top of the subrequirement.

The first requirement in the list whose `year_code` matches the student's
class year is selected, at which point its explicitly listed fields override
those of the parent requirement (the one that contains the `year_switch`),
and the `year_switch` and `year_code` fields are dropped.
Interpretation of the requirements file then proceeds as usual (with any
remaining `year_switch`s evaluated recursively).

As an example, this requirement

```yaml
---
name: A Transitioning Requirement
max_counted: 1
min_needed:
explanation: Students from the class of 2021 should take any one NST course,
  while students from the classes of 2022 and later should take one 300-level
  and one 400-level NST course.
year_switch:
- year_code: 2021
  min_needed: 1  # note that this overrides the existing min_needed if selected
  course_list:
  - NST *
- year_code: ">=2022"
  min_needed: ALL
  double_counting_allowed: true  # any additional fields can be added here too
  req_list:  # the structure need not be the same among the different cases
  - name: One 300-level course
    max_counted: 1
    min_needed: 1
    explanation:
    course_list:
    - NST 3**
  - name: One 400-level course
    max_counted: 1
    min_needed: 1
    explanation:
    course_list:
    - NST 4**
- year_code: default # equivalently, null or blank
  max_counted:
  min_needed:
  explanation: This requirement only applies to classes of 2021 and after,
    so lucky you, you don't have to do anything!
  no_req:
```

will appear differently to students of different class years.

To a student of the class of 2021, it will appear as if it were

```yaml
---
name: A Transitioning Requirement
max_counted: 1
min_needed: 1
explanation: Students from the class of 2021 should take any one NST course,
  while students from the classes of 2022 and later should take one 300-level
  and one 400-level NST course.
course_list:
  - NST *
```

while to a student from the classes of 2022 and later, it will appear as

```yaml
---
name: A Transitioning Requirement
max_counted: 1
min_needed: ALL
explanation: Students from the class of 2021 should take any one NST course,
  while students from the classes of 2022 and later should take one 300-level
  and one 400-level NST course.
double_counting_allowed: true
req_list:
- name: One 300-level course
  max_counted: 1
  min_needed: 1
  explanation:
  course_list:
  - NST 3**
- name: One 400-level course
  max_counted: 1
  min_needed: 1
  explanation:
  course_list:
  - NST 4**
```

To a student of any earlier class, it would fall to the default case and look
like

```yaml
---
name: A Transitioning Requirement
max_counted:
min_needed:
explanation: This requirement only applies to classes of 2021 and after,
  so lucky you, you don't have to do anything!
no_req:
```

Note that if no default case is specified, and a user's class year does not
fall under any of the cases, then the `year_switch` is just dropped without
modifying the parent requirement.
This means that whatever fields are specified explicitly in the parent are
used.
In the example above, this would result in an incomplete requirement, since
the parent requirement is not fully specified by itself, but this doesn't
have to be the case.
For example, the following requirement is fully specified with or without the
contents of the `year_switch`.

```yaml
---
name: Any NST Course
max_counted: 1
min_needed: 1
explanation: Any one NST course. From the class of 2023, NST 300 doesn't count.
course_list:
- NST *
year_switch:
- year_code: ">=2023"
  excluded_course_list:
  - NST 300
```

#### Year Code Values

The possible values for the `year_code` field are as follows:

| code                                                       | meaning                                               |
| ---------------------------------------------------------- | ----------------------------------------------------- |
| "<XXXX", "<=XXXX", ">XXXX", ">=XXXX", "==XXXX", "!=XXXX"   | less than, less than or equal to, etc. the year XXXX  |
| "XXXX" (a str) or XXXX (an int)                            | same as ==XXXX                                        |
| "XXXX-YYYY"                                                | inclusive range of years: >=XXXX and <=YYYY           |
| "default", null, empty or missing                          | course listing                                        |
