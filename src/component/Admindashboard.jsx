import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
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
       
      }}
    >
      <Box>
        <Navbar />
      </Box>

      <Box
        sx={{
          height: "70%",
          overflow: "auto",
          marginTop: 2,
        }}
      >
        {pollList && pollList.length > 0 ? (
          pollList.map((dataList) => (
            <Typography
              sx={{
                border: 1,
                borderColor: "#8c7569c7",
                marginBottom: 1,
              }}
              key={dataList._id}
            >
              <Stack
                direction={"row"}
                variant="h6"
                textAlign={"start"}
                sx={{
                  background: "#8c7569c7",
                  padding: 1,
                  justifyContent: "space-between",
                }}
              >
                {dataList.title}

                <DeleteIcon
                  color="error"
                  sx={{ cursor: "pointer" }}
                  onClick={() => deleteTitleData(dataList._id)}
                />
              </Stack>
              <Typography>
                {dataList.options.map((option, index) => (
                  <Stack
                    direction={"row"}
                    sx={{
                      background: "#d9d2ce ",
                      display: "flex",
                      marginTop: 1,

                      padding: 1,
                      justifyContent: "space-between",
                    }}
                    key={index}
                  >
                    {option.option}

                    <Typography>{option.vote}</Typography>
                  </Stack>
                ))}

                <Typography>
                  {dataList._id === deleteId && deleteTitleLoading ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    <Typography></Typography>
                  )}
                </Typography>
              </Typography>
            </Typography>
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
        <Button
          variant="contained"
          sx={{ background: "#8C7569" }}
          onClick={logout}
        >
          Log Out
        </Button>
      </Box>
    </Box>
  );
};

export default Admin;
