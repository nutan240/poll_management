import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "../Redux/slice/loginSlice"; 
import signUp from "../Redux/slice/signUpslice";

const rootReducer = combineReducers({
  login: loginReducer,
  signUp: signUp,
});

export default rootReducer;
