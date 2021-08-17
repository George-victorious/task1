import {RootStateType} from "./store";

export const getUserList = (state: RootStateType) => state.users.userList;

export const getPageNumber = (state: RootStateType) => state.posts.pageNumber;
export const getPostsOnPage = (pageNumber: number) => (state: RootStateType) =>
  state.posts.postList.slice(pageNumber * 5).slice(0, 5);
export const getPagesCount = (state: RootStateType) =>
  Math.ceil(state.posts.postList.length / 5);
