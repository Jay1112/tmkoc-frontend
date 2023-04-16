import React from "react";
import { Link, useLocation } from "react-router-dom";
import './NavTab.css';
import { Button } from "@mui/material";
import Popup from '../Popup/Popup'

function NavTab(props){
    const location = useLocation();
    return (
        <>
            <div className="navtab">
                {
                    props.isScrollableLink && 
                    (location.pathname === props.protectedRoute) &&
                    <a href={props?.routeUrl}>
                        {props?.routeName}
                    </a>
                }
                {
                    !props.isScrollableLink && 
                    <Link to={props?.routeUrl}>
                        {props?.routeName}
                    </Link>
                }
            </div>
            <div className="add_episode">
                <Popup />
            </div>
        </>
    );
}

export default NavTab;