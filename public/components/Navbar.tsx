import { useContext, useEffect, useState } from "react"
import { NavbarView } from "./Navbar-view"
import { NavContext } from "../contexts/navContext"

export interface NavbarPropsI {
    callbacks?: (() => void)[]
}

export const Navbar = ({ callbacks }: NavbarPropsI) => {
    const [currentPageList, setCurrentPageList] = useState<string[]>([])    

    const currentPage = useContext(NavContext)

    useEffect(() => {
        setCurrentPageList(["home", "logs", "traces"])
    }, [currentPage])    

    return (
        <>
            <div>
                <NavbarView tablist={currentPageList}
                            currentPage={currentPage} />
            </div>
        </>
    )
}