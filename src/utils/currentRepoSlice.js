import { createSlice } from "@reduxjs/toolkit";

const CurrenRepoSlice = createSlice({
  name: "currentRepo",
  initialState: null,
  reducers: {
    addCurrentRepo: (state, action) => {
      return action.payload;
    },
    removeCurrentRepo: (state, action) => {
      return { name: "" };
    },
  },
});

export const { addCurrentRepo, removeCurrentRepo } = CurrenRepoSlice.actions;

export default CurrenRepoSlice.reducer;
