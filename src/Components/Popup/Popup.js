import React,{useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import './Popup.css'

import TextField from '@mui/material/TextField';
import useFetch from '../../hooks/useFetch';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '35%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius : '10px',
};

export default function Popup() {
  const [open, setOpen]                 = useState(false);
  const [episodeName,setEpisodeName]        = useState('');
  const [episodeUrl,setEpisodeURL]      = useState('');
  const [backendToken,setBackendToken]  = useState('');

  const {isCompleted , error , fetchAPI4Post , responseData} = useFetch();

  function clearInputs(){
    setEpisodeName('');
    setEpisodeURL('');
    setBackendToken('');
  }

  function handleSubmit(e){
    e.preventDefault();

    fetchAPI4Post('/api/v1/add',{
      episode_name : episodeName,
      episode_url : episodeUrl,
      token : backendToken
    });
  }

  useEffect(()=>{
    if(responseData){
      console.log(responseData);
      setOpen(false);
      clearInputs();
      toast("Data Added Successfully",{
        type : 'success'
      });
    }
  },[responseData]);

  useEffect(()=>{
    if(error){
      console.log(error);
      setOpen(false);
      clearInputs();
      toast(error,{
        type : 'error'
      });
    }
  },[error]);

  return (
    <div>
      <Button variant='contained' onClick={()=>setOpen(true)}>Add Episode</Button>
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" textAlign="center">
            Add Episode in Database
          </Typography>
          <form onSubmit={handleSubmit}>
            <div className='formbox'>
                <div>
                  <TextField  id="episode_name" 
                              value={episodeName}
                              onChange={(e)=>setEpisodeName(e.target.value)}
                              label="Episode Name" 
                              variant="outlined" 
                              required/>
                </div>
                <div>
                  <TextField  id="episode_url" 
                              value={episodeUrl}
                              onChange={(e)=>setEpisodeURL(e.target.value)}
                              label="Episode URL"  
                              variant="outlined" 
                              required/>
                </div>
                <div>
                  <TextField  id="token" 
                              value={backendToken}
                              onChange={(e)=>setBackendToken(e.target.value)}
                              label="Backend Token"  
                              variant="outlined" 
                              type='password'
                              required />
                </div>
                <div>
                 {
                    isCompleted && 
                    <Button type='submit' color='primary' variant='contained'>
                      Submit
                    </Button>
                  }
                  {
                    !isCompleted && 
                    <Button color='primary' variant='contained' disabled>
                      <CircularProgress />
                    </Button>
                  }
                </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}