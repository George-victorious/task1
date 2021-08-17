import {createSlice} from "@reduxjs/toolkit";
import {TAddUserAction, TRemoveUserAction, TUserRudecer} from "./types";

const initialState: TUserRudecer = {
  userList: [
    {
      id: 0,
      firstName: "Georgi",
      lastName: "Filipov",
      email: "email@email.ru",
      role: "user",
    },
  ],
};

const usersReducer = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser(state: TUserRudecer, action: TAddUserAction) {
      const index = state.userList.findIndex((el) => el.id === action.payload.id);
      if (index === -1) {
        state.userList.push(action.payload);
      } else {
        state.userList.splice(index, 1, action.payload);
      }
    },
    removeUser(state: TUserRudecer, action: TRemoveUserAction) {
      state.userList = state.userList.filter((el) => el.id !== action.payload);
    },
  },
});

export default usersReducer.reducer;
export const {addUser, removeUser} = usersReducer.actions;
