import {createSlice} from "@reduxjs/toolkit";
import {TPostsReducer, TSetPageAction} from "./types";
import {getPosts} from "../functions/requests";

const initialState: TPostsReducer = {
  postList: [],
  pageNumber: 0,
};

const postsReducer = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPage: (state: TPostsReducer, action: TSetPageAction) => {
      state.pageNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state: TPostsReducer, action: any) => {
      state.postList = action.payload;
    });
  },
});

export default postsReducer.reducer;
export const {setPage} = postsReducer.actions;
