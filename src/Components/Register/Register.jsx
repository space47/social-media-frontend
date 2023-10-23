import React, { useEffect, useState } from 'react';
import './Register.css';
import { Button, Avatar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { loadUser, registerUser } from '../../Actions/Users';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

const Register = () => {
    const dispatch = useDispatch();
    const {loading} = useSelector(state => state.user);
    const {message:deleteMessage,error:deleteError} = useSelector(state => state.like);
    const [namee, setName] = useState("");
    const [mail, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const alert = useAlert();
    

    const imageHandler = (e) => {
        const file = e.target.files[0];

        const Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setAvatar(Reader.result)
            }
        }
    }

    const submitHandler = async(e) => {
        e.preventDefault();
        await dispatch(registerUser(namee, mail, password, avatar))
    }

    useEffect(() => {
       if(deleteMessage){
        alert.success(deleteMessage)
        dispatch({
            type:'clearMessage'
        })
       }
       
    }, [dispatch,alert,deleteError, deleteMessage])

    return (
        <div className='register'>
            <form className="registerForm" onSubmit={submitHandler}>
                <Typography variant='h4' style={{ padding: '2vmax', color: 'rgb(82, 83, 82)' }}>Social Media</Typography>
                <Avatar src={avatar} alt="User" sx={{ height: "6vmax", width: "6vmax" }} />
                <input type="file" accept='image/*' className="file" onChange={imageHandler} />
                <input type="text" value={namee} placeholder='Your name' id="name" onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder='Email' value={mail} required onChange={(e) => { setEmail(e.target.value) }} />
                <input type="password" placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} required />
                <Button disabled={loading} type="submit">Sign Up</Button>
                <Link to="/">
                    <Typography>Already user?</Typography>
                </Link>
            </form>
        </div>
    )
}

export default Register;