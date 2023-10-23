import React from 'react';
import './Home.css';
import User from '../User/User';
import Post from '../Post/Post';
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { allUsers, postOfFollowing } from '../../Actions/Users';
import { Typography } from '@mui/material';
import Loader from '../Loader/Loader';
import { useAlert } from 'react-alert';

const Home = () => {    
    const dispatch=useDispatch();
    const alert=useAlert();
    const {error:likeError,message}=useSelector(state=>state.like);

    const {loading,posts,error}=useSelector(state=>state.postOfFollowing);
    const {users,loading:usersLoading}=useSelector(state=>state.allUsers);

    useEffect(() => {
         dispatch(postOfFollowing());
         dispatch(allUsers());
    }, [dispatch])
    
    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch({
                type:'clearErrors'
            })
        }

         if(likeError){
            alert.error(likeError)
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
    }, [alert,likeError,message,error,dispatch])
    
    return (
        loading===true || usersLoading===true?<Loader/>:(
            <div className='home'>
            <div className="homeleft">
                  {
                    posts && posts.length>0?posts.map((post)=>(
                         <Post  
                                key={post._id}
                                postId={post._id}
                                caption={post.caption}
                                postImage={post.imageUrl.url}
                                likes = {post.likes}
                                comments = {post.comments}
                                ownerImage={post.owner.avatar.url}
                                ownerName={post.owner.name}
                                ownerId={post.owner._id}
                                isDelete = {false}
                                isAccount = {false}
                         />
                    )):<Typography>No posts available</Typography>
                  }
            </div>
            <div className="homeright">
                   {
                    users && users.length>0?users.map((user)=>(
                        <User key={user._id} name={user.name} avatar={user.avatar.url} userId={user._id}/>
                    )):<Typography>No users Present</Typography>
                   }
             </div>
        </div>
        )
    )
}

export default Home;