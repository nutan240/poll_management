import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { signUpSchema } from "../schemas";

import { useSelector } from "react-redux";
import {
  signupResetReducer,
  signUpApi,
  startLoading,
} from "../Redux/slice/signUpslice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import { dispatch } from "../Redux/store/store";

const SignUp = () => {
  const navigate = useNavigate();
  const [buttonDisable, setButtonDisable] = useState(false);
  const signupSlice = useSelector((state) => state.signUp);
  const statuS = signupSlice.loading;

  const params = useParams();
  console.log(signupSlice, "dfghj");
  useEffect(() => {
    if (signupSlice.data.error === 1) {
      toast.error("User already exists!");
      setButtonDisable(false);
      dispatch(signupResetReducer());
    } else if (signupSlice.data.error === 0) {
      setButtonDisable(true);
      dispatch(signupResetReducer());
      navigate("/");
    }
  }, [signupSlice.isSuccess]);

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      confirm_password: "",
      role: "user",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      try {
        dispatch(startLoading());
        dispatch(signUpApi(values));
      } catch (error) {
        dispatch(signupResetReducer());
      }
      formik.resetForm();
    },
  });

  return (
    <>
      <ToastContainer />
      <Box sx={{ marginTop: 5, height: 400 }}>
        <Stack
          direction={"column"}
          sx={{ width: 500, margin: "auto", boxShadow: 3, padding: 5 }}
          className="form_container"
        >
          <Typography sx={{ fontWeight: "bold" }} variant="h5">
            sign up..
          </Typography>
          <Stack
            sx={{ width: "100%", fontSize: "19px" }}
            direction={"column"}
            spacing={1}
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
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={
                <Typography variant="p" color={"red"}>
                  {formik.errors.password &&
                    formik.touched.password &&
                    formik.errors.password}
                </Typography>
              }
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              name="confirm_password"
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={
                <Typography variant="p" color={"red"}>
                  {formik.errors.confirm_password &&
                    formik.touched.confirm_password &&
                    formik.errors.confirm_password}
                </Typography>
              }
            />
            <Box>
              <Typography variant="h6" sx={{ textAlign: "left", mb: "10px" }}>
                Role :
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.role}
                  name="role"
                  label="role"
                  onChange={formik.handleChange}
                  sx={{ textAlign: "left" }}
                >
                  <MenuItem value={"user"}>user</MenuItem>
                  <MenuItem value={"Admin"}>Admin</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {statuS ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : (
              <Button
                variant="contained"
                sx={{
                  background:
                    "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)",
                }}
                type="submit"
                disabled={buttonDisable}
              >
                Sign Up
              </Button>
            )}
          </Stack>
          <Box>
            <NavLink style={{ color: "#1565c0" }} to={"/"} variant="body2">
              Already have an account? Sign in
            </NavLink>
          </Box>
        </Stack>
      </Box>
      <ToastContainer />
    </>
  );
};

export default SignUp;
