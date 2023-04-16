import React, { useEffect, useState } from "react";
import './NotFoundPage.css';
import { Button } from "@mui/material";
import { themeConfig } from "../../enums/theme";

function NotFoundPage(){
    const offset = 20;
    const [windowHeightSize,setWindowHeightSize] = useState(window.innerHeight);
    const theme = localStorage.getItem("data-theme") ? localStorage.getItem("data-theme") : "light";
    let [introHeight,setIntroHeight] = useState(300);

    useEffect(()=>{
        const item = document.querySelector(".navbar");
        if(item){
            setIntroHeight(windowHeightSize - item.offsetHeight - offset );
        }
    },[introHeight]);

    useEffect(()=>{
        setWindowHeightSize(window.innerHeight);
    },[windowHeightSize])
    
    return (
        <div className='custom_container full notfoundpage'>
            <div className="custom_container full notfoundpage_inner" style={{height:introHeight}}>
                <div style={{color:'white',fontSize:'1.25rem'}}>Page Not Found</div>
            </div>
        </div>
    );
}

export default NotFoundPage;