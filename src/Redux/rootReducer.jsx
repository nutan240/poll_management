import { combineReducers } from "@reduxjs/toolkit";
import signUpslice from "./slice/signUpslice";
import signInSlice from "./slice/signInSlice";
import AdminSlice from "./slice/AdminSlice";
import AddSlice from "./slice/AddSlice";
import DeleteTitle from './slice/DeleteTitle';
const rootReducer = combineReducers({
    signIn: signInSlice, 
    signUp: signUpslice,
    AdminSlice:AdminSlice,
    AddSlice :AddSlice,
    DeleteTitle:DeleteTitle,
});

export default rootReducer;
