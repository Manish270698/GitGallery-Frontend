import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import repoReducer from "./repoSlice";
import currentRepoReducer from "./currentRepoSlice";
import currentUserReducer from "./currrentUserSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    repo: repoReducer,
    currentRepo: currentRepoReducer,
    currentUser: currentUserReducer,
  },
});

export default appStore;
