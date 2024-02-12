import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import { dispatch } from "../Redux/store/store";
import { resetReducer, signInApi } from "../Redux/slice/signInSlice";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { signInScheema } from "../schemas";
import Image from "../assets/loginimg.jpg";

const SignIn = () => {
  const navigate = useNavigate();
  const [buttonDisable, setButtonDisable] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const signinSlice = useSelector((state) => state.signIn);
  const status = signinSlice.loading;

  useEffect(() => {
    if (signinSlice.isSuccess && signinSlice.data.token) {
      const decode = jwtDecode(signinSlice.data.token);

      localStorage.setItem("token", signinSlice.data.token);
      localStorage.setItem("role", decode.role);
      dispatch(resetReducer());
      if (decode.role === "Guest") {
        navigate("/userPoll", { state: decode });
        navigate("/profile", { state: { decode } });
      } else if (decode.role === "Admin") {
        navigate("/dashboard");
      }
    } else if (signinSlice.data.error === 1) {
      toast.error("User does not exist!", { autoClose: 1500 });
      setButtonDisable(false);
    }

    dispatch(resetReducer());
  }, [signinSlice.isSuccess]);

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    validationSchema: signInScheema,
    onSubmit: async (values) => {
      try {
        if (!signinSlice.data.token) {
          dispatch(resetReducer());
          toast.success("Sign in successful!", { autoClose: 1000 });
        }
        await dispatch(signInApi(values));
      } catch (error) {}
    },
  });

  let token = localStorage.getItem("token");
  let role = localStorage.getItem("role");
  useEffect(() => {
    if (token) {
      if (role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/userPoll");
      }
    }
  }, [token, role, navigate]);

  return (
    <>
      <Stack
        sx={{
          backgroundImage: ` url( ${Image} )`,

          height: "100vh",
          width: "100%",
        }}
      >
        <Stack
          direction={"column"}
          spacing={2}
          sx={{
            width: 500,
            margin: "auto",
            boxShadow: 3,
            padding: 5,
            background: "rgb(239 237 240)",
          }}
        >
          <Typography variant="h4">sign in..</Typography>
          <Stack
            sx={{ width: "100%", fontSize: "19px" }}
            direction={"column"}
            spacing={2}
            component="form"
            onSubmit={formik.handleSubmit}
          >
            <TextField
              fullWidth
              label="User Name"
              type="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={
                <Typography variant="p" color={"red"}>
                  {formik.errors.name &&
                    formik.touched.name &&
                    formik.errors.name}
                </Typography>
              }
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Typography
              variant="p"
              sx={{
                fontSize: "13px",
                fontStyle: "italic",
              }}
              color={"red"}
            >
              {formik.errors.password &&
                formik.touched.password &&
                formik.errors.password}
            </Typography>
            {status ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : (
              <Button
                variant="contained"
                sx={{
                  background:
                    "linear-gradient(90.9deg, rgb(3, 195, 195) 0.3%, rgb(37, 84, 112) 87.8%)",
                }}
                type="submit"
                disabled={buttonDisable}
              >
                Sign In
              </Button>
            )}
          </Stack>
          <NavLink style={{ color: "#1565c0" }} to={"/signup"} variant="body2">
            Don't have an account? Register now
          </NavLink>
        </Stack>
      </Stack>
      <ToastContainer />
    </>
  );
};

export default SignIn;
