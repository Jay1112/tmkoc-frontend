import axios from 'axios';
import React, {useState} from 'react';

function useFetch(){
    const [isCompleted,setCompleted] = useState(true);
    const [responseData,setResponseData] = useState(null);
    const [error,setError] = useState(null);
    const prefix = 'https://tmkoc-backend-production.up.railway.app';
    
    const fetchAPI4Get = (url,queryParams) => {
        setCompleted(false);
        setError(null);
        setResponseData(null);

        axios.get(prefix + url + '?' + queryParams).then((res)=>{
            if(res.status === 200){
                setResponseData(res.data);
                setError(null);
                setCompleted(true);
            }else{
                setResponseData(null);
                setError(res.data);
                setCompleted(true);
            }
        }).catch((err)=>{
            setResponseData(null);
            setError(err.message);
            setCompleted(true);
        })

    }

    const fetchAPI4Post = (url,body) => {
        setCompleted(false);
        setError(null);
        setResponseData(null);

        axios.post(prefix + url,{...body},{}).then((res)=>{
            
            if(res.status === 200){
                setResponseData(res.data);
                setError(null);
                setCompleted(true);
            }else{
                setResponseData(null);
                setError(res.data);
                setCompleted(true);
            }
        }).catch((err)=>{
            setResponseData(null);
            setError(err.response.data.message);
            setCompleted(true);
        })
    }

    return {isCompleted,responseData,error, fetchAPI4Get , fetchAPI4Post} ; 

}

export default useFetch;