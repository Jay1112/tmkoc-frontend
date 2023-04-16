import React from "react";
import './NavBar.css';
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import NavTab from "../NavTab/NavTab";
import { useNavigate } from "react-router-dom";
import { navtabList } from "../../utils/navtabData";

function NavBar(props){
    const navigate = useNavigate();

    function gotoHomePage(){
        navigate('/');
    }

    return (
        <div className="custom_container full">
            <div className="navbar">
                <div className="navbar_title" onClick={gotoHomePage}>
                    <span>TMKOC</span>
                </div>
                <div className="navbar_links">
                    <div className="navbar_tabs">
                        {
                            navtabList.map((item)=>{
                                return <NavTab key={item.id}
                                        routeUrl={item.routeUrl}
                                        routeName={item.routeName}
                                        isScrollableLink={item.isScrollableLink}
                                        protectedRoute={item.protectedRoute} />
                            })
                        }
                    </div>
                    <div className="navbar_theme_toggle">
                        <ThemeToggle    toggleTheme={props.toggleTheme}
                                        theme={props.theme}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;