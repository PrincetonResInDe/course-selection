import create from "zustand";
import axios from "axios";

export const useSearchStore = create((set) => ({
  searchResults: [],
  setSearchResults: async (query) => {
    await axios
      .get("http://localhost:5000/api/get-all-courses")
      .then((req, res) => {
        let data = [];

        for (let i = 0; i < req.data.length; i++) {
          if (i < 10) {
            data.push(req.data[i]);
          } else {
            break;
          }
        }

        set({ searchResults: data });
      });
  },
}));
