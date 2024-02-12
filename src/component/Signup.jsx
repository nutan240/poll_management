import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  signUpApi,
  signupResetReducer,
  startLoading,
} from "../Redux/slice/signUpslice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { dispatch } from "../Redux/store/store";
import Image from '../assets/signupimg.jpg';

const SignUp = () => {
  const navigate = useNavigate();
  const [buttonDisable, setButtonDisable] = useState(false);
  const signupSlice = useSelector((state) => state.signUp);
  const statuS = signupSlice.loading;

  useEffect(() => {
    if (signupSlice.data.error === 1) {
      toast.error("User already exists!");
      setButtonDisable(false);
      dispatch(signupResetReducer());
    } else if (signupSlice.data.error === 0) {
      setButtonDisable(true);
      dispatch(signupResetReducer());
      setTimeout(() => {
        navigate("/");
      }, 1000);
      toast.success("Sign up successful!", { autoClose: 1000 });
    }
  }, [signupSlice.isSuccess]);

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      confirm_password: "",
      role: "user",
      showPassword: false,
      showConfirmPassword: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      password: Yup.string()
        .min(
          6,
          "Password must contain at least one lowercase letter and one digit"
        )
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
          "Password must contain at least one lowercase letter and one digit"
        ),

      confirm_password: Yup.string().oneOf(
        [Yup.ref("password"), null   ],
        "Passwords don't match"
      ).required("Confirm your password!"),
    }),
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
      <Stack sx={{  
       backgroundImage :` url( ${Image} )` ,
  
  height : '100vh',
  width : '100%' ,
      }}>
        <Stack
          direction={"column"}
          sx={{ width: 500, margin: "auto", boxShadow: 3, padding: 5 ,
          height: 450 ,
          background :'rgb(255 255 255)' }}
          className="form_container"
        >
          <Typography sx={{ fontWeight: "bold" }} variant="h5">
            Sign Up
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
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={
                formik.errors.name && formik.touched.name && formik.errors.name
              }
            />

            <TextField
              fullWidth
              label="Password"
              type={formik.values.showPassword ? "text" : "password"}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        formik.setValues({
                          ...formik.values,
                          showPassword: !formik.values.showPassword,
                        })
                      }
                      edge="end"
                    >
                      {formik.values.showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
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
            <TextField
              fullWidth
              label="Confirm Password"
              type={formik.values.showConfirmPassword ? "text" : "password"}
              name="confirm_password"
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        formik.setValues({
                          ...formik.values,
                          showConfirmPassword:
                            !formik.values.showConfirmPassword,
                        })
                      }
                      edge="end"
                    >
                      {formik.values.showConfirmPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
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
              {formik.errors.confirm_password &&
                formik.touched.confirm_password &&
                formik.errors.confirm_password}
            </Typography>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formik.values.role}
                name="role"
                label="Role"
                onChange={formik.handleChange}
                sx={{ textAlign: "left" }}
              >
                <MenuItem value={"user"}>User</MenuItem>
                <MenuItem value={"admin"}>Admin</MenuItem>
              </Select>
            </FormControl>

            {statuS ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : (
              <Button
                variant="contained"
                sx={{
                  
                  background: 'linear-gradient(90.9deg, rgb(3, 195, 195) 0.3%, rgb(37, 84, 112) 87.8%)',
                }}
                type="submit"
                disabled={buttonDisable}
              >
                Sign Up
              </Button>
            )}
          </Stack>
          <Box>
            <NavLink style={{ color: "#1565c0" , paddingTop : 3 }} to={"/"} variant="body2">
              Already have an account? Sign in
            </NavLink>
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default SignUp;
