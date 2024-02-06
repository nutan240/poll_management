import React, { useState, useEffect } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import { AddPollApi, resetReducer } from "../Redux/slice/AddSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updatePoll, resetState } from "../Redux/slice/UpdateSlice";

const EditPoll = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.pollData) {
      console.log("inside useeffecttttttttttt");
      const  title  = location.state.pollData.title;
      console.log(title);
      formik.setValues({ title });
    }
  }, [location.state]);

  const formik = useFormik({
    initialValues: {
      title: location.state,
    },
    onSubmit: (values) => {
      try {
        if (values.title.trim() !== "") {
          if (location.state && location.state.pollData) {
           
            const id = location.state.pollData._id; 

            const updatedData =  values.title ; 

            const updatedPoll = dispatch(updatePoll(id, updatedData));

            
            console.log("Poll updated successfully", updatedPoll);
            toast.success("Poll updated successfully");
            setTimeout(() => {
              navigate("/admin");
            }, 200);
          }
        } else {
          dispatch(resetReducer());
          toast.warning("Please enter a title ");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  return (
    <Box sx={{ background: "#a9988f7a", height: "100vh", padding: "20px" }}>
      <Box
        className="formBodyStyle"
        sx={{
          width: 500,
          marginX: "auto",
          background: "white",
          padding: 4,
          borderRadius: 3,
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Stack direction={"column"} spacing={2} className="form_container">
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              update title Here
            </Typography>
            <TextField
              label={"Title"}
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />

            <Button
              variant="contained"
              sx={{ background: "#8c7569bf" }}
              type="submit"
            >
              update
            </Button>
            <Link to={"/admin"} width="100%">
              <Button
                sx={{ background: "#8c7569bf", width: "100%" }}
                variant="contained"
              >
                Cancel
              </Button>
            </Link>
          </Stack>
        </form>
        <ToastContainer />
      </Box>
    </Box>
  );
};

export default EditPoll;
