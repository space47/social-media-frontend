import React, { useState, useEffect } from 'react';
import './Post.css';
import { Typography, Avatar, Button, Dialog } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { MoreVert, FavoriteBorder, Favorite, ChatBubbleOutline, DeleteOutline } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { commentOnPost, deletePost, likePost, updateCaption } from '../../Actions/Post';
import { getUserPosts, loadUser, myAllPosts, postOfFollowing } from '../../Actions/Users';
import User from '../User/User';
import CommentCard from '../CommentCard/CommentCard';


const Post = ({
    postId,
    caption,
    postImage,
    likes,
    comments,
    ownerImage,
    ownerName,
    ownerId,
    isDelete,
    isAccount
}) => {
    const dispatch = useDispatch();
    const [liked, setLiked] = useState(false);
    const [likeUsers, setlikeUsers] = useState(false);
    const [commentValue, setCommentValue] = useState("");
    const [commentToggle, setCommentToggle] = useState(false);
    const [captionValue, setCaptionValue] = useState("");
    const [captionToggle, setCaptionToggle] = useState(false);
    const { user } = useSelector(state => state.user);
    const param=useParams()

    const handleLike = async (e) => {
        setLiked(!liked);
        await dispatch(likePost(postId));
        if (isAccount) {
            dispatch(myAllPosts())
            dispatch(getUserPosts(param.id))
        } else {
            dispatch(myAllPosts())
            dispatch(postOfFollowing());
        }
    }

    const addCommentHandler = async (e) => {
        e.preventDefault()

        await dispatch(commentOnPost(postId, commentValue));

        if (isAccount) {
            dispatch(myAllPosts())
        } else {
            dispatch(postOfFollowing());
        }
    }

//    update handler
    const addCaptionHandler=async(e)=>{
        e.preventDefault()
       await dispatch(updateCaption(captionValue,postId))
       await  dispatch(myAllPosts())
    }

//    post delete handler
    const postDeleteHandler=async()=>{
        await dispatch(deletePost(postId))
        await dispatch(myAllPosts())
        await dispatch(loadUser())
    }

    useEffect(() => {
        likes.forEach((item) => {
            if (item._id === user._id) {
                setLiked(true)
                //   dispatch(myAllPosts())
            }
        })

    }, [likes, user._id])

    return (
        <div className='post'>
            <div className='postHeader'>
                {isAccount ? <Button onClick={()=>setCaptionToggle(!captionToggle)}><MoreVert /></Button> : null}
            </div>
            <img src={postImage} alt="Post" />
            <div className='postDetails'>
                <Avatar src={ownerImage} alt={ownerName} sx={{ height: "3vmax", width: "3vmax" }} />
                <Link to={`/user/${ownerId}`}>
                    <Typography fontWeight={700} color="rgba(0, 0, 0, 0.767)">{ownerName}</Typography>
                </Link>
                <Typography fontWeight={100} color="rgba(0,0,0,0.500)" style={{ alignSelf: "center",fontSize:"2vw" }}>{caption}</Typography>
            </div>
            <button style={{ backgroundColor: "#fff", border: "none", cursor: "pointer", margin: "0.4vmax 2vmax" }} onClick={() => { setlikeUsers(!likeUsers) }} disabled={likes.length > 0 ? false : true}>
                <Typography fontSize="1.2vmax" color="rgba(0,0,0,0.900)" fontWeight={500}>{likes.length} likes</Typography>
            </button>

            <div className="postFooter">
                <Button onClick={handleLike} >
                    {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
                </Button>
                <Button>
                    <ChatBubbleOutline onClick={() => { setCommentToggle(!commentToggle) }} />
                </Button>
                {
                    isDelete && isAccount ? <Button onClick={postDeleteHandler}>
                        <DeleteOutline />
                    </Button> : null
                }
            </div>

            {/* DialogBox for likes */}
            <Dialog open={likeUsers} onClose={() => { setlikeUsers(!likeUsers) }}>
                <div className='dialogBox'>
                    <Typography variant='h6'>Liked By</Typography>
                    {
                        likes.map((like) => (
                            <User key={like._id} name={like.name} avatar={like.avatar.url} userId={like._id} />
                        ))
                    }
                </div>
            </Dialog>

            {/* DialogBox For comments */}
            <Dialog open={commentToggle} onClose={() => { setCommentToggle(!commentToggle) }}>
                <div className='dialogBox'>
                    <Typography variant='h6'>Comments</Typography>
                    <form className='commentForm' onSubmit={addCommentHandler}>
                        <input type="text" value={commentValue} onChange={(e) => { setCommentValue(e.target.value) }} required placeholder='Comment here' />
                        <Button type='submit' variant="contained">Add</Button>
                    </form>
                    {
                        comments && comments.length > 0 ? comments.map((item => (
                            <CommentCard key={item._id} name={item.user.name} userId={item.user._id} avatar={item.user.avatar.url} comment={item.comment} commentId={item._id} postId={postId} isAccount={isAccount} />
                        ))) : <Typography>No comments Present Here.</Typography>
                    }
                </div>
            </Dialog>

            {/* DialogBox for update caption */}
             <Dialog open={captionToggle} onClose={() => { setCaptionToggle(!captionToggle) }}>
                <div className='dialogBox'>
                    <Typography variant='h6'>Update caption</Typography>
                    <form className='commentForm' onSubmit={addCaptionHandler}>
                        <input type="text" value={captionValue} onChange={(e) => { setCaptionValue(e.target.value) }} required placeholder='Caption here...' />
                        <Button type='submit' variant="contained">Update</Button>
                    </form>
                </div>
            </Dialog>
        </div >
    )
}

export default Post;