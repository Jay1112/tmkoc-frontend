import { useEffect, useState } from 'react';
import './App.css';
import { themeConfig } from './enums/theme';
import NavBar from './Components/NavBar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import { useAppContext } from './hooks/useAppContext';
import { AppActions } from './enums/appActions';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import EpisodePage from './Pages/EpisodePage/EpisodePage';
import useFetch from './hooks/useFetch';

function App() {
  const {state,dispatch} = useAppContext();
  const {responseData,fetchAPI4Get} = useFetch();
  const rootAttribute = themeConfig.rootAttribute ; 
  const theme = state.theme ; 

  useEffect(()=>{
    if(localStorage.getItem(themeConfig.accessorKey)){
      const theme = localStorage.getItem(themeConfig.accessorKey);
      if(theme === themeConfig.lightTheme){
        applyLightTheme();
      }else{
        applyDarkTheme();
      }
    }else{
      applyLightTheme();
    }
    fetchAPI4Get('/api/v1/total','');
  },[]);

  useEffect(()=>{
    if(responseData){
      dispatch({type : AppActions.SET_EPISODES_DATA , payload : responseData.total});
    }
  },[responseData]);

  function applyLightTheme(){
      dispatch({type : AppActions.TOGGLE_THEME , payload : themeConfig.lightTheme});
      localStorage.setItem(themeConfig.accessorKey,themeConfig.lightTheme);
      document.querySelector(rootAttribute).setAttribute(themeConfig.accessorKey,themeConfig.lightTheme);
  }

  function applyDarkTheme(){
    dispatch({type : AppActions.TOGGLE_THEME , payload : themeConfig.darkTheme});
    localStorage.setItem(themeConfig.accessorKey,themeConfig.darkTheme);
    document.querySelector(rootAttribute).setAttribute(themeConfig.accessorKey,themeConfig.darkTheme);
  }

  function toggle(){
    if(theme === themeConfig.lightTheme){
      applyDarkTheme();
    }else{
      applyLightTheme();
    }
  }

  return (
    <BrowserRouter>
    <div className="App">
      <div className='custom_container full  app_navbar '>
        <NavBar theme={theme} toggleTheme={toggle}/>
      </div>
      <Routes>
          <Route exact path='/' element={<HomePage/>} />
          <Route exact path='/episode' element={<EpisodePage/>}/>
          <Route exact path='*' element={<NotFoundPage/>} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
