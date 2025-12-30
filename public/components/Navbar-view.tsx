
interface NavbarViewPropsI {
    tablist: string[]
    currentPage: string
    changeOnClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export const NavbarView = ({ tablist, currentPage, changeOnClick } : NavbarViewPropsI) => {
    return (
        <>
            <div className="navbar-main">
                <div className="navbar-title">
                    <h2>Ratquest</h2>
                </div>
                <div className="navbar-tabs-container">
                    {tablist.map((tab, index) => {
                        return (
                            <div key={index} className="navbar-tabs">
                                <div onClick={changeOnClick} className={tab.includes(currentPage) ? "navbar-currentpage" : "navbar-tab"}>
                                    <span>{tab}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}