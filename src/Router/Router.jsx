import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from '../component/Login';

import Admin from "../component/AdminPoll";
import User from '../component/UserPoll';
import SignUp from "../component/Signup";


function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route  path="/signup" element={<SignUp />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/userPoll" element={<User />} />
    </Routes>
  );
}

export default Router;
