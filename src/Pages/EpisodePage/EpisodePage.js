import React, { useEffect, useState } from "react";
import './EpisodePage.css';
import Pagination from '@mui/material/Pagination';
import { useAppContext } from "../../hooks/useAppContext";
import useFetch from "../../hooks/useFetch";
import { Spinner } from "react-bootstrap";

function EpisodeBox(props){
    return (
        <div className="episode_box">
            <div className="episode_index">
                <span>{props.index}</span>
            </div>
            <div className="episode_class">
                <iframe width="100%"
                        height="100%"
                        src={props?.url} 
                        title="YouTube video player" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                        allowFullScreen
                        webkitallowfullscreen="true"
                        mozallowfullscreen="true"
                        msallowfullscreen="true">
                </iframe>
            </div>
        </div>
    );
}


function EpisodePage(){
    let [introHeight,setIntroHeight] = useState(300);
    let {state,dispatch} = useAppContext();
    const [windowHeightSize,setWindowHeightSize] = useState(window.innerHeight);
    const theme = localStorage.getItem("data-theme") ? localStorage.getItem("data-theme") : "light";
    const offset = 40;
    const [page,setPage] = useState(1);
    const perPageItems = 10 ;
    const {error,responseData,fetchAPI4Get,isCompleted} = useFetch();

    useEffect(()=>{
        fetchAPI4Get('/api/v1/episodes',`page=${page}`);
    },[page]);
 
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
        <div className='custom_container full episodepage'>
            <div className="custom_container episodepage_inner" style={{height:introHeight}}>
                <div className="custom_container episode_inner_topbar">
                </div>
                <div className="custom_container full episode_inner_mainbar">
                    {
                        isCompleted &&
                        responseData && 
                        responseData.map((item,index)=>{
                            return <EpisodeBox  url={item.episode_url}
                                                key={item.episode_id}
                                                index={index+1}/>
                        })
                    }
                    {
                        error && 
                        <h3 className="error_message">Service Unavailable</h3>
                    }
                    {
                        !isCompleted &&
                        <div className="loading_class">
                            <Spinner variant="primary"  />
                        </div>
                        
                    }
                </div>
                <div className="custom_container full episode_inner_bottombar">
                    <div className="pagination">
                        <Pagination 
                            count={
                                state.episodesData ? Math.ceil(state.episodesData/perPageItems) : 0 
                            } 
                            onChange={(_,value)=>{
                                setPage(value);
                            }}
                            color="primary" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EpisodePage;