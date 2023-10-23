import { configureStore } from "@reduxjs/toolkit";
import { likesReducer, myPostReducer, userPostReducer } from "./Reducers/Post";
import {
  allUsersReducer,
  postOfFollowingReducer,
  userReducer,
  userProfileReducer,
} from "./Reducers/User";

const store = configureStore({
  reducer: {
    user: userReducer,
    postOfFollowing: postOfFollowingReducer,
    allUsers: allUsersReducer,
    like: likesReducer,
    myPost: myPostReducer,
    userProfile: userProfileReducer,
    userPosts: userPostReducer,
  },
});

export default store;
