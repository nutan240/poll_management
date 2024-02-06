import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../component/Login";
import Admin from "../component/Admindashboard";
import User from "../component/Userdashboard";
import SignUp from "../component/Signup";
import AddPoll from '../component/AddPoll';
import UserDetails from '../component/UserDetails';
import EditPoll from "../component/EditPoll";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/userPoll" element={<User />} />
      <Route path="/userdetails" element={<UserDetails />} />
      <Route path="/addPoll" element={<AddPoll />} />
      <Route path="/addPoll" element={<AddPoll />} /> 
      <Route   path="/editPoll/:id" element={<EditPoll/>} />
    </Routes>
  );
}

export default Router;
