import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  
  useEffect(() => {
    const checkAuthentication = () => {
      if (!token) {
     
        navigate('/');
      } else if (role !== 'Admin') {
        
        navigate('/userPoll');
      }
    };

    checkAuthentication();
  }, [token, role, navigate]);

  
  return <Component />;
};

export default Protected;
