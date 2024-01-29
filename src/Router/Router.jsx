import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from '../component/Login';
import Signup from '../component/Signup';
import Admin from "../component/AdminPoll";
import User from '../component/UserPoll';


function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/userPoll" element={<User />} />
    </Routes>
  );
}

export default Router;
