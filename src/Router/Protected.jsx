import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = (props) => {
  const { Component } = props;

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const checkAuthentication = () => {
      if (token) {
        if (role === "Guest") {
          navigate("/userPoll");
        } else if (role === "Admin") {
          navigate("/dashboard");
        }
      } else if (token === null) {
        navigate("/");
      }
    };

    checkAuthentication();
  }, [token, role]);

  return (
    <div>
      <Component />
    </div>
  );
};

export default Protected;
