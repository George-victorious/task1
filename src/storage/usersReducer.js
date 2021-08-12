import  { createSlice } from "@reduxjs/toolkit";

const usersReducer = createSlice({
  name: 'users',
  initialState: {
    userList: [
      {
        firstName: 'qwerty',
        lastName: 'asdfgh',
        email: 'zxcvbn@mail.ru',
        role: 'user',
      }
    ]
  },
  reducers: {
    addUser(state, action) {
      state.userList.push(action.payload);
    },
    updateUserRole(state, action) {
      state.pageNumber = action.payload;
    },
  }
});

export default usersReducer.reducer;
export const { addUser, updateUserRole } = usersReducer.actions;
