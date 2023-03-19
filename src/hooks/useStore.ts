import { create } from "zustand";

export const useStore = create((set) => ({
  // get the data from local storage
  authData: localStorage.getItem("authData")
    ? JSON.parse(localStorage.getItem("authData") || "")
    : null,

  setAuthData: (authData: any) => {
    if (authData === null) localStorage.removeItem("authData");
    else localStorage.setItem("authData", JSON.stringify(authData));
    set({ authData });
  },
}));
