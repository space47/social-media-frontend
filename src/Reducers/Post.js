import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const likesReducer = createReducer(initialState, {
  likeRequest: (state) => {
    state.loading = true;
  },
  likeSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  likeFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  //for comments
  commentRequest: (state) => {
    state.loading = true;
  },
  commentSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  commentFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  //for delete comment
  deleteRequest: (state) => {
    state.loading = true;
  },
  deleteSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  deleteFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  // for New Post
  newPostRequest: (state) => {
    state.loading = true;
  },
  newPostSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  newPostFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  // for update caption
  updateCaptionRequest: (state) => {
    state.loading = true;
  },
  updateCaptionSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  updateCaptionFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  //for delete post
  deletePostRequest: (state) => {
    state.loading = true;
  },
  deletePostSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  deletePostFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  // Update Profile
  UpdateRequest: (state) => {
    state.loading = true;
  },
  UpdateSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  UpdateFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  //  Update password
  UpdatePasswordRequest: (state, action) => {
    state.loading = true;
  },
  UpdatePasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  UpdatePasswordFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  // for delete profile
  deleteProfileRequest: (state) => {
    state.loading = true;
  },
  deleteProfileSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
    state.isAuthenticate = false;
  },
  deleteProfileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  // forgot password
  forgotPasswordRequest: (state) => {
    state.loading = true;
  },
  forgotPasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  forgotPasswordFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  // reset password
  resetPasswordRequest: (state) => {
    state.loading = true;
  },
  resetPasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  resetPasswordFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  followandUnfollowUserRequest: (state) => {
    state.loading = true;
  },
  followandUnfollowUserSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  followandUnfollowUserFailure: (state, action) => {
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});

// all my post reducer
export const myPostReducer = createReducer(initialState, {
  myPostsRequest: (state) => {
    state.loading = true;
  },
  myPostsSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  },
  myPostsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const userPostReducer = createReducer(initialState, {
  userPostsRequest: (state) => {
    state.loading = true;
  },
  userPostsSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  },
  userPostsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});
