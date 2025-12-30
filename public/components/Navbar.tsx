import { useContext, useEffect, useState } from "react"
import { NavbarView } from "./Navbar-view"
import { NavContext } from "../contexts/navContext"
import { NavContextT } from "../types/types"

export interface NavbarPropsI {
    callbacks?: (() => void)[]
}

export const Navbar = ({ callbacks }: NavbarPropsI) => {
    const [currentPageList, setCurrentPageList] = useState<string[]>([])    

    const { currentPage, setCurrentPage } = useContext(NavContext)

    useEffect(() => {
        setCurrentPageList(["home", "logs", "traces"])
    }, [currentPage])    

    const changeCurrentPage = (page: NavContextT) => {
        setCurrentPage(page)
    }

    const onClickEventHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const needPage = e.currentTarget.innerText.toLowerCase() as NavContextT
        setCurrentPage(needPage)   
    }

    return (
        <>
            <div>
                <NavbarView tablist={currentPageList}
                            currentPage={currentPage} 
                            changeOnClick={onClickEventHandler}/>
            </div>
        </>
    )
}