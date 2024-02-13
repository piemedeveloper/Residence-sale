import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.data = {};
    },
    addUser: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { reset, addUser } = userSlice.actions;

export const user = {
  user: (state) => state.user.data,
};

export const addUsers = {
  user: (users) => (dispatch) => {
    dispatch(addUser(users));
  },
};

export default userSlice.reducer;
