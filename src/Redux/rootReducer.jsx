import { combineReducers } from "@reduxjs/toolkit";
import signUpslice from "./slice/signUpslice";
import signInSlice from "./slice/signInSlice";

const rootReducer = combineReducers({
    signIn: signInSlice, 
    signUp: signUpslice,
});

export default rootReducer;
