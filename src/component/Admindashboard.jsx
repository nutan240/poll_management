// Admin component
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { AdminPollApi } from "../Redux/slice/AdminSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteTitleApi } from "../Redux/slice/DeleteTitle";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pollList = useSelector((state) => state.AdminSlice.data);
  const [deleteId, setDeleteId] = useState(null);

  const deleteTitleLoading = useSelector((state) => state.DeleteTitle.loading);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const deleteTitleData = (titleID) => {
    dispatch(DeleteTitleApi(titleID));
    setDeleteId(titleID);

    console.log(DeleteTitleApi, "nutan");
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
        bgcolor: "#63cdda32",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h3"> Welcome to Admin Poll</Typography>
      </Box>
      <NavLink
        style={{ textDecoration: "none", color: "black" }}
        to={"/addPoll"}
      >
        <Typography variant="h5" textAlign={"center"}>
          Add Poll +
        </Typography>
      </NavLink>
      <Box
        sx={{
          height: "70%",
          overflow: "auto",
          width:"95%" ,
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
        }}
      >
        <Box sx={{ display: "flex"  ,alignItems:'flex-start'}}>
        <div className="m-3">
          {pollList && pollList.length > 0 ? (
            pollList.map((dataList) => (
              <div key={dataList._id}>
                <Typography variant="h6" textAlign={"start"}>
                  {dataList.title}
                </Typography>
                <div className="flex justify-between border-2 ">
                 
                    {dataList.options.map((option, index) => (
                      <div className="w-[600px]"  key={index}>{option.option}</div>
                    ))}
                    <div  >
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
          </div>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          mt: "10px",
        }}
      >
        <Button variant="contained" onClick={logout}>
          Log Out
        </Button>
      </Box>
    </Box>
  );
};

export default Admin;
