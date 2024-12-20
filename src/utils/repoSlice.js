import { createSlice } from "@reduxjs/toolkit";

const repoSlice = createSlice({
  name: "repo",
  initialState: null,
  reducers: {
    addRepo: (state, action) => {
      return action.payload;
    },
    removeRepo: (state, action) => {
      return null;
    },
  },
});

export const { addRepo, removeRepo } = repoSlice.actions;

export default repoSlice.reducer;
