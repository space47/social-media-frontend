import React,{useEffect, useState} from 'react';
import '../Post/Post.css';
import {useDispatch, useSelector} from 'react-redux';
import { followandUnfollow, getUserPosts, getUserProfile} from '../../Actions/Users';
import Loader from '../Loader/Loader';
import Post from '../Post/Post';
import { Avatar, Button, Dialog, Typography } from '@mui/material';
import { useAlert } from 'react-alert';
import User from '../User/User';
import { useParams } from 'react-router-dom';

const Account = () => {

  const dispatch=useDispatch();
  const alert=useAlert();

  const {user,error:userError}=useSelector(state=>state.userProfile);
  const {user:me,loading:userloading}=useSelector(state=>state.user);
  const {loading,error,posts}=useSelector(state=>state.userPosts);
  const {message,error:followError,loading: followLoading,}=useSelector(state=>state.like);
  const [followersToggle,setFollowersToggle]=useState(false);
  const [followingToggle,setFollowingToggle]=useState(false);
  const [following,setFollowing]=useState(false);
  const [myProfile,setmyProfile]=useState(false);

  const param=useParams();

  const followHandler=async()=>{
    setFollowing(!following);
    dispatch(followandUnfollow(user._id));
  }
   
    useEffect(() => {
           dispatch(getUserPosts(param.id));
           dispatch(getUserProfile(param.id));
           if(me._id===param.id){
              setmyProfile(true);
           }else{
              setmyProfile(false);
           }
     }, [dispatch,param.id,me._id])

     useEffect(()=>{
      if(user){
        user.followers.forEach((follower)=>{
          if(follower._id===me._id){
             setFollowing(true);
             dispatch(getUserPosts(param.id));
            //  dispatch(getUserProfile(param.id));
             return;
          }   else{
             setFollowing(false);
             dispatch(getUserPosts(param.id));
          }
        })
      }
     },[dispatch,me._id,param.id,user,following])

    useEffect(() => {
         if(error){
          alert.error(error);
          dispatch({
             type:"clearErrors"
          })
         }
         if(followError){
            alert.error(followError)
            dispatch({
                type:'clearErrors'
            })
         }
         if(userError){
          alert.error(userError)
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
    
    }, [alert,error,followError,message,dispatch,userError])
  
  return (
      loading===true || userloading===true?<Loader/>:(
        <div className='account'>
              <div className='accountLeft'>
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
                                isDelete = {true}
                                isAccount = {true}
                         />
                    )):<Typography variant='h6' margin='2vmax'>No posts available</Typography>
                  }
              </div>
              <div className='accountright'>
                   {
                    user && (
                      <>
                       <Avatar src={user.avatar.url}  sx={{height:"7vmax",width:"7vmax"}} />
                   <Typography variant="h6" marginTop={"1vmax"} color={'#3B3B3B'} marginBottom={"2vmax"}>{user.name}</Typography>
                   <div className='a'>
                      <button onClick={()=>setFollowingToggle(!followingToggle)}>Following {user.following.length}</button>
                   </div>
                    <div className='a'>
                      <button onClick={()=>setFollowersToggle(!followersToggle)}>Followers {user.followers.length}</button>
                   </div>
                    <div className='a'>
                       Posts {user.posts.length}
                   </div>

                   {myProfile? null:<Button variant="contained" onClick={followHandler} style={{background:following?'red':'blue'}} disabled={followLoading}>{following?'Unfollow':'Follow'}</Button>}
              
                   {/* <Button disabled={deleteLoading} style={{color:"red",marginTop:"1vmax"}} onClick={deleteHandler}>Delete My Profile</Button> */}

                    {/* DialogBox for followers */}
                    <Dialog open={followersToggle} onClose={() => { setFollowersToggle(!followersToggle) }}>
                        <div className='dialogBox'>
                           <Typography variant='h6'>Followers</Typography>
                    {
                         user && user.followers.length>0?user.followers.map((follower)=>(
                              <User key={follower._id} name={follower.name} avatar={follower.avatar.url} userId={follower._id} />
                         )):<Typography style={{margin:'2vmax'}}>No Followers present</Typography>
                    }
                </div>
                   </Dialog>

             {/* DialogBox for following */}
                    <Dialog open={followingToggle} onClose={() => { setFollowingToggle(!followingToggle) }}>
                        <div className='dialogBox'>
                           <Typography variant='h6'>Following</Typography>
                    {
                         user && user.following.length>0?user.following.map((follow)=>(
                              <User key={follow._id} name={follow.name} avatar={follow.avatar.url} userId={follow._id} />
                         )):<Typography style={{margin:'2vmax'}}>No Following present</Typography>
                    }
                </div>
            </Dialog>
                       </>
                    )
                   }

              </div>
        </div>
      )
  )
}

export default Account;