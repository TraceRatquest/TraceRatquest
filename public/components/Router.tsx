import { useContext } from "react"
import { NavContext } from "../contexts/navContext"
import { Table } from "./Table"

export const Router: React.FC<React.PropsWithChildren> = ({ children }) => {

    return (
        <div className="router">
            {children}
        </div>
    )
    
}