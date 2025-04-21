import { createSlice } from "@reduxjs/toolkit";

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: null,
  reducers: {
    addCurrentUser: (state, action) => {
      return action.payload;
    },
    removeCurrentUser: (state, action) => {
      return null;
    },
  },
});

export const { addCurrentUser, removeCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
