import React, { useEffect, useState } from 'react';
import './ResetPassword.css';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { resetPassword } from '../../Actions/Users';
import {Link, useParams} from 'react-router-dom';

const ResetPassword = () => {

  const [newPassword,setNewPassword]=useState("");
  const {loading,error,message}=useSelector(state=>state.like)
  const dispatch=useDispatch();
  const alert=useAlert();
  const params=useParams();
  
  const passwordHandler=(e)=>{
      e.preventDefault();
      dispatch(resetPassword(params.token,newPassword));
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
            setNewPassword('')
        }
   }, [loading,error,message,alert])

  return (
   <div className='resetPassword'>
            <form className='ResetPasswordForm' onSubmit={passwordHandler}>
                <Typography variant='h4' style={{ padding: '2vmax', color: 'rgb(82, 83, 82)' }}>Reset Password</Typography>
                <input type="password" placeholder='New Password' value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} required />
                <Link to="/">Login</Link>
                <Typography>Or</Typography>
                <Link to="/forgot/password">Request another Token</Link>
                <Button disabled={loading} type="submit">Reset Password</Button>
            </form>
        </div>
  )
}

export default ResetPassword;