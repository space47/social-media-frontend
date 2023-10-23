import { Button, Typography } from "@mui/material";
import "./Newpost.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { createNewPost } from "../../Actions/Post";
import { loadUser } from "../../Actions/Users";

const Newpost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const { loading, error, message } = useSelector((state) => state.like);
  const alert = useAlert();
  const dispatch = useDispatch();

  const handleImage = (e) => {
    const files = e.target.files[0];

    const Reader = new FileReader();

    Reader.readAsDataURL(files);

    Reader.onload = (e) => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(createNewPost(caption, image));
    dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({
        type: "clearErrors",
      });
    }

    if (message) {
      alert.success(message);
      dispatch({
        type: "clearMessage",
      });
      setImage(null);
      setCaption("");
    }
  }, [dispatch, error, message, alert]);

  return (
    <div className="newPost">
      <form className="newPostForm" onSubmit={submitHandler}>
        <Typography
          style={{ alignSelf: "center", margin: "2vmax", fontWeight: 300 }}
          variant="h4"
        >
          New Post
        </Typography>
        {image && <img src={image} alt="post" />}
        <input
          type="file"
          accept="image/*"
          placeholder="uploadfile"
          onChange={handleImage}
          id="image"
        />
        <input
          type="text"
          placeholder="caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          id="caption"
        />
        <Button type="submit" disabled={loading}>
          Post
        </Button>
      </form>
    </div>
  );
};

export default Newpost;
