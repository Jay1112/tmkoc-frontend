import React, { useEffect, useState } from "react";
import './HomePage.css';
import { Button } from "@mui/material";
import Logo from '../../assets/logo.png';
import { themeConfig } from "../../enums/theme";
import { useNavigate } from "react-router-dom";

function HomePage(){
    const navigate = useNavigate();
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

    function gotoEpisodePage(){
        navigate('/episode');
    }
    
    return (
        <div className='custom_container full homepage'>
            <div className="custom_container full homepage_intro" style={{height:introHeight}}>
                <div className="left_intro">
                    <span className="homepage_title">Tarak Maheta ka Ooltah Chasmah</span>
                    <span className="homepage_description">
                        The day-to-day happenings of Gokuldham Society and its members, 
                        who live, celebrate and often face problems together.
                    </span>
                    {
                        theme === themeConfig.lightTheme ?
                        <Button variant="contained" color="warning" onClick={gotoEpisodePage}>
                            Watch Episodes
                        </Button> :
                        <Button variant="outlined" color="warning" onClick={gotoEpisodePage}>
                            Watch Episodes
                        </Button>
                    } 
                </div>
                <div className="right_intro">
                    <img src={Logo} />
                </div>
            </div>
            {/* <div className="custom_container full actors_list" style={{height:introHeight}} id="starcast" >
            </div> */}
        </div>
    );
}

export default HomePage;