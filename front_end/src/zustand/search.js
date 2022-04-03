import create from "zustand";
import axios from "axios";

export const useSearchStore = create((set) => ({
  searchResults: [],
  showReview: {},
  setSearchResults: async (query) => {
    await axios
      .get("http://localhost:5000/search", {
        params: {
          query: query.query,
          semester: query.semester,
          special: query.special,
        },
      })
      .then((req, res) => {
        set({ searchResults: req.data[0] });
      });
  },

  setShowReview: (query) => {
    set({showReview: query});
  }
}));
