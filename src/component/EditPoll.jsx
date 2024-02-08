import React, { useState, useEffect } from "react";
import { Box, Button, Stack, TextField, Typography, CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import { updatePoll, resetState } from "../Redux/slice/UpdateSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

const EditPoll = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location.state && location.state.pollData) {
      const title = location.state.pollData.title;
      formik.setValues({ title });
    }
  }, [location.state]);

  const formik = useFormik({
    initialValues: {
      title: location.state,
    },
    onSubmit: async (values) => {
      try {
        if (values.title.trim() !== "") {
          if (location.state && location.state.pollData) {
            const id = location.state.pollData._id;
            const updatedData = values.title;
            
            setIsLoading(true); // Show loader when update is initiated
            const updatedPoll = await dispatch(updatePoll(id, updatedData));
            setIsLoading(false); // Hide loader after receiving API response
            
            console.log("Poll updated successfully", updatedPoll);
            toast.success("Poll updated successfully");
            setTimeout(() => {
              navigate("/dashboard");
            }, 200);
          }
        } else {
          dispatch(resetState());
          toast.warning("Please enter a title");
        }
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false); // Hide loader in case of error
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
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                fontStyle: 'italic',
                fontSize: '36px',
                color: '#6f5c52',
                textDecoration: 'underline',
                textAlign: 'center'
              }}
            >
              Update title Here
            </Typography>
            <TextField
              label={"Title"}
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            {isLoading ? (
              <CircularProgress color="primary" /> // Show loader if isLoading is true
            ) : (
              <Button
                type="submit"
                variant="contained"
                sx={{
                  background: "#8c7569bf",
                  "&:hover": {
                    background: "#6b5b51",
                  }
                }}
              >
                Update
              </Button>
            )}
            <Link to={"/dashboard"} width="100%">
              <Button
                sx={{ background: "#8c7569bf", width: "100%", "&:hover": { background: "#6b5b51" } }}
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
