import React from "react";
import './ThemeToggle.css';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { themeConfig } from "../../enums/theme";

function ThemeToggle(props){

    function toggleTheme(e){
        if(props.toggleTheme){
            props.toggleTheme();
        }
    }

    return (
        <div className="theme_toggle">
            <div className="theme_icon">
                <button onClick={toggleTheme}>
                    {
                        props.theme === themeConfig.lightTheme ? 
                        <LightModeIcon />  :
                        <DarkModeIcon  />
                    }
                    
                </button>
            </div>
        </div>
    );
}

export default ThemeToggle;