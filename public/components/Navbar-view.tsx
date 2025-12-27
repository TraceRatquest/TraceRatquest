
interface NavbarViewPropsI {
    tablist: string[]
    currentPage: string
}

export const NavbarView = ({ tablist, currentPage } : NavbarViewPropsI) => {
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
                                <div className={tab.includes(currentPage) ? "navbar-currentpage" : "navbar-tab"}>
                                    <h1>{tab}</h1>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}