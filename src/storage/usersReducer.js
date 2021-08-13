import  { createSlice } from "@reduxjs/toolkit";

const usersReducer = createSlice({
  name: 'users',
  initialState: {
    userList: [
      {
        id: 0,
        firstName: 'qwerty',
        lastName: 'asdfgh',
        email: 'zxcvbn@mail.ru',
        role: 'user',
      }
    ]
  },
  reducers: {
    addUser(state, action) {
      const index = state.userList.findIndex(el=>el.id === action.payload.id);
      if(index === -1) {
      state.userList.push(action.payload);
      } else {
        state.userList.splice(index,1,action.payload);
      }
    },
    removeUser(state, action) {
      state.userList = state.userList.filter(el => el.id !== action.payload)
    },
    updateUserRole(state, action) {
      state.pageNumber = action.payload;
    },
  }
});

export default usersReducer.reducer;
export const { addUser, removeUser, updateUserRole } = usersReducer.actions;
