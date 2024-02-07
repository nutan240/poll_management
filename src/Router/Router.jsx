import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../component/Login";
import Admin from "../component/Admindashboard";
import User from "../component/Userdashboard";
import SignUp from "../component/Signup";
import AddPoll from '../component/AddPoll';
import UserDetails from '../component/UserDetails';
import EditPoll from "../component/EditPoll";
import Protected from "./Protected";
import UserProfileDialog from "../component/UserProfileDialog";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={
      <Protected Component={Admin }  />
     } />
      <Route path="/userPoll" element={
      <Protected Component={User }  />
     } />
      <Route path="/userdetails" element={<UserDetails />} />
      <Route path="/addPoll" element={<AddPoll />} />
      <Route path="/addPoll" element={<AddPoll />} /> 
      <Route   path="/editPoll/:id" element={<EditPoll/>} />
      <Route   path="/profile" element={<UserProfileDialog/>} />
    </Routes>
  );
}

export default Router;