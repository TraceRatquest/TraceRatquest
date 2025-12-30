import { createContext } from "react";
import { NavContextT } from "../types/types";

export interface NavContextI {
    currentPage: NavContextT
    setCurrentPage: (page: NavContextT) => void
}

export const NavContext = createContext<NavContextI>({
    currentPage: "home",
    setCurrentPage: () => {}
})
