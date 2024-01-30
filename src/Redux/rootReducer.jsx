import { combineReducers } from "@reduxjs/toolkit";
import signUpslice from "./slice/signUpslice";
import signInSlice from "./slice/signInSlice";
import AdminSlice from "./slice/AdminSlice";
import AddSlice from "./slice/AddSlice";
const rootReducer = combineReducers({
    signIn: signInSlice, 
    signUp: signUpslice,
    AdminSlice:AdminSlice,
    AddSlice :AddSlice,
});

export default rootReducer;
