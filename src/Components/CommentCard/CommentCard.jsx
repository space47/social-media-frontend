import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './CommentCard.css';
import { Delete} from '@mui/icons-material';
import {Button} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { myAllPosts, postOfFollowing } from '../../Actions/Users';
import { deleteComment } from '../../Actions/Post';

const CommentCard = ({
    userId,
    name,
    avatar,
    comment,
    commentId,
    postId,
    isAccount
}) => {
   
  const dispatch=useDispatch(); 
  const { user } = useSelector(state => state.user);
  
  const deleteCommentHandler=()=>{
        dispatch(deleteComment(postId,commentId));
        if (isAccount) {
            dispatch(myAllPosts());
        } else {
            dispatch(postOfFollowing());
        }
  }

  return (
    <div className='commentUser'>
        <Link to={`/user/${userId}`}>
            <img src={avatar} alt={name}/>
            <Typography style={{minWidth:"auto",marginRight:"1vmax"}}>{name}</Typography>
        </Link>
        <Typography className='comment'>{comment}</Typography>
            {
                isAccount?<Button style={{color:"red"}} onClick={deleteCommentHandler}>
                                <Delete color='red'/>
                          </Button>:userId===user._id?<Button style={{color:"red"}} onClick={deleteCommentHandler}>
                                                          <Delete color='red'/>
                                                      </Button>:null
            }
    </div>
  )
}

export default CommentCard