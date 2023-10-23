import React, { useEffect, useState } from 'react';
import './ForgotPassword.css';
import { Button, Typography } from '@mui/material';
import { forgotPassword } from '../../Actions/Users';
import {useDispatch,useSelector} from 'react-redux';
import { useAlert } from 'react-alert';

const ForgotPassword = () => {
  const dispatch=useDispatch();  
  const [email,setEmail]=useState();
  const {loading,message,error}=useSelector(state=>state.like);
  const alert=useAlert();

  const SubmitHandler=async(e)=>{
      e.preventDefault();
      await dispatch(forgotPassword(email));
  }

  useEffect(() => {
     if(error){
        alert.error(error)
        dispatch({
            type:'clearErrors'
        })
     }

     if(message){
        alert.success(message)
        dispatch({
            type:'clearMessage'
        })
     }
  }, [error,message])
  

  return (
    <div className='forgotPass'>
         <form className='ForgotPasswordForm' onSubmit={SubmitHandler}>
                <Typography variant='h4' style={{ padding: '2vmax', color: 'rgb(82, 83, 82)' }}>Social Media</Typography>
                <input type="email" placeholder='Email' value={email} required onChange={(e) => { setEmail(e.target.value) }} />
               
                <Button disabled={loading} type="submit">Send Token</Button>
               
            </form>
    </div>
  )
}

export default ForgotPassword