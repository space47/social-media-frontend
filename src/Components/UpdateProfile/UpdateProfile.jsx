import React, { useEffect, useState } from 'react';
import './UpdateProfile.css';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { loadUser, updateProfile } from '../../Actions/Users';
import { Avatar, Button} from '@mui/material';

const UpdateProfile = () => {

    const dispatch = useDispatch();
    const{loading,error,user}=useSelector(state=>state.user)
    const { loading:updateLoading, error:updateError, message } = useSelector(state => state.like)
    const [name, setOldName] = useState(user.name)
    const [mail, setOldEmail] = useState(user.email)
    const [avatarPrev, setAvatarPrev] = useState(user.avatar.url)
    const [avatar, setAvatar] = useState()
    const alert = useAlert()

    const imageHandler = (e) => {
        const file = e.target.files[0]

        const Reader = new FileReader()
        Reader.readAsDataURL(file)

        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setAvatar(Reader.result)
                setAvatarPrev(Reader.result)
            }
        }
    }

    const submitHandler = async(e) => {
        e.preventDefault();
        await dispatch(updateProfile(name, mail, avatar))
        dispatch(loadUser())
    }

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch({
                type: 'clearErrors'
            })
        }

        if (updateError) {
            alert.error(updateError)
            dispatch({
                type: 'clearErrors'
            })
        }

        if(message){
            alert.success(message)
            dispatch({
                type: 'clearMessage'
            })
        }
    }, [dispatch,error,message,updateError,alert])

  return (
    <div className='update'>
            <form className="updateForm" onSubmit={submitHandler}>
                <Avatar src={avatarPrev} alt="User" sx={{ height: "6vmax", width: "6vmax" }} />
                <input type="file" accept='image/*' className="file" onChange={imageHandler}/>
                <input type="text" value={name} placeholder='Update name' id="name" onChange={(e) => setOldName(e.target.value)} />
                <input type="email" placeholder='Update Email' value={mail} required onChange={(e) => setOldEmail(e.target.value)} />
                <Button disabled={loading} type="submit">Update</Button>
            </form>
        </div>
  )
}

export default UpdateProfile