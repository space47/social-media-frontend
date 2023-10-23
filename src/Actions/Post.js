import axios from "axios";

// for likepost
export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "likeRequest",
    });

    const { data } = await axios.get(`/api/v1/post/${id}`);

    console.log("data", data);

    dispatch({
      type: "likeSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "likeFailure",
      payload: error.response.data.message,
    });
  }
};

// for comments
export const commentOnPost = (id, comment) => async (dispatch) => {
  try {
    dispatch({
      type: "commentRequest",
    });

    const { data } = await axios.put(
      `/api/v1/post/comment/${id}`,
      { comment },
      {
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );

    dispatch({
      type: "commentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "commentFailure",
      payload: error.response.data.message,
    });
  }
};

// for deleteComment
export const deleteComment = (id, commentId) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteRequest",
    });

    const { data } = await axios.delete(`/api/v1/post/comment/${id}`, {
      data: { commentId },
    });

    dispatch({
      type: "deleteSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteFailure",
      payload: error.response.data.message,
    });
  }
};

// for Post
export const createNewPost = (caption, image) => async (dispatch) => {
  try {
    dispatch({
      type: "newPostRequest",
    });

    const { data } = await axios.post(`/api/v1/post/upload`, {
      caption,
      image,
    });

    dispatch({
      type: "newPostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "newPostFailure",
      payload: error.response.data.message,
    });
  }
};

// update Post
export const updateCaption = (caption, id) => async (dispatch) => {
  try {
    dispatch({
      type: "updateCaptionRequest",
    });

    const data = await axios.put(`/api/v1/post/${id}`, {
      caption,
    });

    dispatch({
      type: "updateCaptionSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateCaptionFailure",
      payload: error.message,
    });
  }
};

// delete Post
export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deletePostRequest",
    });

    const { data } = await axios.delete(`/api/v1/post/${id}`);

    dispatch({
      type: "deletePostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deletePostFailure",
      payload: error.response.data.message,
    });
  }
};
