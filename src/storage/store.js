import { configureStore, combineReducers } from "@reduxjs/toolkit";
import postsReducer from './postsReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
  posts: postsReducer,
  users: usersReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;