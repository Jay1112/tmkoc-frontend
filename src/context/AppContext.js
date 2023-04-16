import React, { createContext, createElement, useReducer }  from "react";
import { themeConfig } from "../enums/theme";
import { AppActions } from "../enums/appActions";

export const AppContext = createContext();

function appReducer(state,action){
    switch(action.type){
        case AppActions.TOGGLE_THEME : 
            return {
                ...state,
                theme : action.payload
            };
        case AppActions.SET_EPISODES_DATA : 
            return {
                ...state,
                episodesData : action.payload
            }

        default : return state;
    }
}

export function AppContextProvider({children}){
    const [state,dispatch] = useReducer(appReducer,{
        theme : themeConfig.lightTheme,
        episodesData : 0,
    });

    return (
        <AppContext.Provider value={{state,dispatch}}>
            { children }
        </AppContext.Provider>
    );
}