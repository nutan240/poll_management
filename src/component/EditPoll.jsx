import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import { updatePoll, resetState } from "../Redux/slice/UpdateSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Image from "../assets/addpollimg.jpg";

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
        const trimmedTitle = values.title.trim();

        if (values.title.trim() !== "") {
          if (location.state && location.state.pollData) {
            const id = location.state.pollData._id;
            const updatedData = trimmedTitle;

            setIsLoading(true);
            const updatedPoll = await dispatch(updatePoll(id, updatedData));
            setIsLoading(false);

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
        setIsLoading(false);
      }
    },
  });

  return (
    <Box
      sx={{
        backgroundImage: ` url( ${Image} )`,
        height: "100vh",
        padding: "20px",
      }}
    >
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
                fontWeight: "bold",
                fontStyle: "italic",
                fontSize: "36px",
                color: "#255470",
                textDecoration: "underline",
                textAlign: "center",
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
              <CircularProgress color="primary" />
            ) : (
              <Button
                type="submit"
                variant="contained"
                sx={{
                  background:
                    "linear-gradient(90.9deg, rgb(3, 195, 195) 0.3%, rgb(37, 84, 112) 87.8%)",
                  "&:hover": {
                    background: "rgb(3, 195, 195)",
                  },
                }}
              >
                Update
              </Button>
            )}
            <Link to={"/dashboard"} width="100%">
              <Button
                sx={{
                  background:
                    "linear-gradient(90.9deg, rgb(3, 195, 195) 0.3%, rgb(37, 84, 112) 87.8%)",
                  "&:hover": {
                    background: "rgb(3, 195, 195)",
                  },
                  width: "100%",
                }}
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
