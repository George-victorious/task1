import { configureStore, combineReducers } from "@reduxjs/toolkit";
import postsReducer from './postsReducer';

const rootReducer = combineReducers({
  posts: postsReducer,
});

const store = configureStore({
  reducer: rootReducer
});

export default store;