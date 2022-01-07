import create from "zustand";

export const useCalendarStore = create((set) => ({
  hoveredClass: {},
  setHoveredClass: (c) => {
    set({ hoveredClass: c });
  },
}));
