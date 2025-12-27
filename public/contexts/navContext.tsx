import { createContext } from "react";
import { NavContextT } from "../types/types";

export const NavContext = createContext<NavContextT>("home")
