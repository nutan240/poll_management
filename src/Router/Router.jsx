import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../component/Login";

import Admin from "../component/Admindashboard";
import User from "../component/Userdashboard";
import SignUp from "../component/Signup";
import AddPoll from '../component/AddPoll';

function Router() {
 
  return (
    <Routes>
    <Route path="/addPoll" element={<AddPoll />}/>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/userPoll" element={<User />} />
    </Routes>
  );
}

export default Router;
