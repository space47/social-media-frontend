import React, {useEffect, useState } from 'react';
import './Login.css';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../Actions/Users';
import { useAlert } from 'react-alert';

const Login = () => {
    const [mail, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const alert=useAlert();

    const {error,message}=useSelector(state=>state.user)
    const {message:logOutMessage}=useSelector(state=>state.like)

    const loginHandler = async(e) => {
        e.preventDefault();
        dispatch(loginUser(mail, password));
        setEmail('');
        setPassword('');
    }

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch({
              type:'clearErrors'
            })
        }
    
        if(logOutMessage){
            alert.success(logOutMessage)
            dispatch({
                type:'clearMessage'
            })
        }
    }, [error,alert,dispatch,message,logOutMessage])
    
    return (
        <div className='login'>
            <form className='loginForm' onSubmit={loginHandler}>
                <Typography variant='h4' style={{ padding: '2vmax', color: 'rgb(82, 83, 82)' }}>Social Media</Typography>
                <input type="email" placeholder='Email' value={mail} required onChange={(e) => { setEmail(e.target.value) }} />
                <input type="password" placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} required />
                <Link to="/forgot/password">
                    <Typography>Forgot password?</Typography>
                </Link>
                <Button type="submit">login</Button>
                <Link to="/register">
                    <Typography>New user?</Typography>
                </Link>
            </form>
        </div>
    )
}

export default Login