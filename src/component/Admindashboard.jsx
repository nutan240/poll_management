import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AdminPollApi } from "../Redux/slice/AdminSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from "./Navbar";
import EditIcon from "@mui/icons-material/Edit";
import { DeleteTitleApi } from "../Redux/slice/DeleteTitle";
import Pagination from "@mui/material/Pagination";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pollList = useSelector((state) => state.AdminSlice.data);
  const deleteTitleLoading = useSelector((state) => state.DeleteTitle.loading);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    dispatch(AdminPollApi());
  }, [dispatch, deleteId, deleteTitleLoading]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const deleteTitleData = (titleID) => {
    dispatch(DeleteTitleApi(titleID));
    setDeleteId(titleID);
    toast.success("Title deleted successfully!", { autoClose: 1000 });
  };

  const handleEditClick = (titleID) => {
    const selectedPoll = pollList.find((poll) => poll._id === titleID);
    if (selectedPoll) {
      navigate(`/editPoll/${titleID}`, { state: { pollData: selectedPoll } });
    }
  };

  const reversedPollList = [...pollList].reverse();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = reversedPollList.slice(startIndex, endIndex);

  return (
    <Box
      sx={{ width: "100%", height: "100vh", overflow: "auto", margin: "auto" }}
    >
      <Box>
        <Navbar />
      </Box>

      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexWrap: "wrap",
          width: "97%",
          margin: "auto",
        }}
      >
        {currentItems && currentItems.length > 0 ? (
          currentItems.map((dataList) => (
            <Typography
              sx={{
                border: 1,
                borderColor: "#8c7569c7",
                marginBottom: 1,
                width: {
                  lg: "45%",
                  sm: "100%",
                },

                margin: 3,
                padding: 2,
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
                <EditIcon
                  onClick={() => handleEditClick(dataList._id)}
                  style={{ cursor: "pointer" }}
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
                    <Typography> Vote {option.vote}</Typography>
                  </Stack>
                ))}
              </Typography>
              <Typography
                sx={{
                  color: "white",
                  padding: 1,
                  marginTop: 1,
                  borderRadius: 1,
                }}
              >
                {dataList._id === deleteId && deleteTitleLoading ? (
                  <Typography sx={{ height: "10px" }}>
                    <CircularProgress
                      sx={{
                        width: "10px",
                        height: "5px",
                        color: "red",
                      }}
                    />
                  </Typography>
                ) : (
                  <Button
                    sx={{
                      background:
                        "linear-gradient(111.3deg, rgb(252, 56, 56) 11.7%, rgb(237, 13, 81) 81.7%)",
                      color: "white",
                    }}
                    onClick={() => deleteTitleData(dataList._id)}
                    variant="outlined"
                  >
                    DELETE
                    <DeleteIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => deleteTitleData(dataList._id)}
                    />
                  </Button>
                )}
              </Typography>
            </Typography>
          ))
        ) : (
          <Typography variant="h6" textAlign={"center"}></Typography>
        )}
      </Box>

      <Box sx={{ margin: "auto", width: { sm: "70%" } }}>
        <Pagination
          sx={{
            margin: "auto",
            width: {
              lg: "35%",
              sm: "70%",
            },
          }}
          count={Math.ceil(pollList.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default Admin;
