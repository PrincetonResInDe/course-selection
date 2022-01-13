import create from "zustand";

export const useCalendarStore = create((set) => ({
  hoveredClass: {},
  calendarClasses: [],
  searchWidth: 0,
  setSearchWidth: (w) => {
    set({ searchWidth: w });
  },
  setHoveredClass: (c) => {
    set({ hoveredClass: c });
  },
  addCalendarClass: (c) => {
    set((state) => ({
      calendarClasses: [...state.calendarClasses, c],
    }));
  },
}));
