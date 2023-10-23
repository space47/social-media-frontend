import React, { useEffect, useState } from 'react';
import './Search.css';
import { Button, Typography } from '@mui/material';
import { allUsers } from '../../Actions/Users';
import { useDispatch, useSelector } from 'react-redux';
import User from '../User/User';

const Search=()=>{
    const [name,setName]=useState('');
    const dispatch=useDispatch();
    const {users,loading}=useSelector(state=>state.allUsers);

    const submitHandler=(e)=>{
          e.preventDefault();    
          dispatch(allUsers(name));
    }

    const changeHandler=(e)=>{
        setName(e.target.value);
        if(e.target.value){
            dispatch(allUsers(name));
        }else{
            dispatch(allUsers(""));
        }
    }

    useEffect(()=>{
        dispatch(allUsers(name))
    },[])

     return <>
            <div className='update'>
            <form className="updateForm" onSubmit={submitHandler}>
                <input type="text"placeholder='Search here' value={name} onChange={changeHandler} required={true}/>
                <Button disabled={loading} type="submit">Search</Button>   
                <div className='allUsersStyle'>
                     {users && users.length>0 ? users.map((user) => {
                         return <User key={user._id} name={user.name} avatar={user.avatar.url} userId={user._id}/>
                     }):<div>No user Present</div>} 
               </div>             
            </form>
           
        </div>
      </>
}

export default Search;