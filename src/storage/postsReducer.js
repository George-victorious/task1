import  { createSlice } from "@reduxjs/toolkit";

const postsReducer = createSlice({
  name: 'posts',
  initialState: {
    postList: [],
    pageNumber: 0
  },
  reducers: {
    setPosts(state, action) {
      state.postList = action.payload;
    },
    setPage(state, action) {
      state.pageNumber = action.payload;
    },
  }
});

export default postsReducer.reducer;
export const { setPosts, setPage } = postsReducer.actions;
