import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { AdminPollApi } from "../Redux/slice/AdminSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteTitleApi } from "../Redux/slice/DeleteTitle";
import Navbar from "./Navbar";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pollList = useSelector((state) => state.AdminSlice.data);
  const deleteTitleLoading = useSelector((state) => state.DeleteTitle.loading);
  const [deleteId, setDeleteId] = useState(null);
  const [optionData, setOptionData] = useState(null);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const deleteTitleData = (titleID) => {
    dispatch(DeleteTitleApi(titleID));
    setDeleteId(titleID);
  };

  useEffect(() => {
    dispatch(AdminPollApi());
  }, [dispatch, deleteId, deleteTitleLoading]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        overflow: "auto",
        // background:'red'
      }}
    >

   
        <Box sx={{ textAlign: "center" }}>
        <Navbar/>
     
      </Box>

      <Box
        sx={{
          height: "70%",
          overflow: "auto",
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
        }}
      >
        {pollList && pollList.length > 0 ? (
          pollList.map((dataList) => (
            <div key={dataList._id}>
              <Typography variant="h6" textAlign={"start"}  sx={{background: 'linear-gradient(45deg, #8c75694f 20%,#1976d238 70%)'}}>
                {dataList.title}
              </Typography>
              <div className="flex justify-between border-2 border-blue-600">
                {dataList.options.map((option, index) => (
                  <div key={index} style={{ marginBottom: '8px' }}>
                    {option.option}
                  </div>
                ))}
                <div>
                  {dataList._id === deleteId && deleteTitleLoading ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    <DeleteIcon
                      color="error"
                      sx={{ cursor: "pointer" }}
                      onClick={() => deleteTitleData(dataList._id)}
                    />
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <Typography variant="h6" textAlign={"center"}></Typography>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          mt: "10px",
        }}
      >
        <Button variant="contained"
        sx={{background:'#8C7569'}}
         onClick={logout}>
          Log Out
        </Button>
      </Box>
    </Box>
  );
};

export default Admin;
