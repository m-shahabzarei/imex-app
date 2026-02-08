import { create } from "zustand";

type YearType = 1403 | 1404;

interface PublicState {
  selectedYear: YearType;
  setYear: (year: YearType) => void;
}

export const usePublicStore = create<PublicState>((set) => ({
  selectedYear: 1404, // 👈 دیفالت
  setYear: (year) => set({ selectedYear: year }),
}));
