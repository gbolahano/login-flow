import { configureStore } from "@reduxjs/toolkit";
import {combineReducers} from "redux";
import { authReducer } from "../reducers/authReducer";

const rootReducer = combineReducers({
  auth: authReducer
})

export default configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof rootReducer>;
