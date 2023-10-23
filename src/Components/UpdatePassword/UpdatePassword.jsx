import React, { useEffect, useState } from 'react';
import './UpdatePassword.css';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography } from '@mui/material';
import { useAlert } from 'react-alert';
import { updatePassword } from '../../Actions/Users';

const UpdatePassword = () => {

   const {loading,error,message}=useSelector(state=>state.like)
   const [oldPassword, setOldPassword] = useState('');
   const [newPassword, setNewPassword] = useState('');
   const dispatch = useDispatch();
   const alert=useAlert();

   const passwordHandler=(e)=>{
         e.preventDefault()
         dispatch(updatePassword(oldPassword,newPassword))
          setOldPassword('')
          setNewPassword('')
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
            setOldPassword('')
            setNewPassword('')
        }
   }, [loading,error,message,alert])
   

  return (
    <div className='updatepassword'>
            <form className='updatePasswordForm' onSubmit={passwordHandler}>
                <Typography variant='h4' style={{ padding: '2vmax', color: 'rgb(82, 83, 82)' }}>Update Password</Typography>
                <input type="password" placeholder='Old Password' value={oldPassword} required onChange={(e) => { setOldPassword(e.target.value) }} />
                <input type="password" placeholder='New Password' value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} required />
                <Button disabled={loading} type="submit">Update</Button>
            </form>
        </div>
  )
}

export default UpdatePassword