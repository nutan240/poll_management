import { combineReducers } from "@reduxjs/toolkit";
import signUpslice from "./slice/signUpslice";
import signInSlice from "./slice/signInSlice";
import AdminSlice, { addVote } from "./slice/AdminSlice";
import AddSlice from "./slice/AddSlice";
import DeleteTitle from './slice/DeleteTitle';
import userDetails from './slice/UserSlice';
import EditTitle from "./slice/EditTitle";
import AddVote from "./slice/AddVote";

const rootReducer = combineReducers({
    signIn: signInSlice, 
    signUp: signUpslice,
    AdminSlice:AdminSlice,
    AddSlice :AddSlice,
    DeleteTitle:DeleteTitle,
    userDetails: userDetails,
    EditTitle : EditTitle,
    AddVote:AddVote
   
});

export default rootReducer;
