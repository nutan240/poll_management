import React, { useEffect, useRef, useState } from "react";
import { Box, Button, TextField, Grid, Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { resetReducer, login } from "../Redux/slice/loginSlice";
import { signUpSchema } from "../schemas";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function LoginForm() {
  const ref = useRef(null);
  const [buttonDisable, setButtonDisable] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginSlice = useSelector((state) => state.login);

  useEffect(() => {
    if (loginSlice.isSuccess && loginSlice.data && loginSlice.data.token) {
      const decoded = jwtDecode(loginSlice.data.token);
      localStorage.setItem("token", loginSlice.data.token);
      localStorage.setItem("role", decoded.role.toLowerCase());
      if (decoded.role.toLowerCase() === "admin") {
        navigate("/admin");
      } else if (decoded.role.toLowerCase() === "user") {
        navigate("/user");
      }
    } else if (loginSlice.data && loginSlice.data.error === 1) {
      console.error("User does not exist!");
      setButtonDisable(false);
    }
    dispatch(resetReducer());
    console.log("hhhh");
  }, [loginSlice.isSuccess, navigate, dispatch]);

  const formik = useFormik({
    initialValues: {
      username: "",
      userpassword: "",
    },
    onSubmit: (values) => {
      try {
        if (!loginSlice.data || !loginSlice.data.token) {
          dispatch(resetReducer());
        }
        dispatch(login(values));
        setButtonDisable(true);
      } catch (error) {
        console.error("Error during login:", error);
      }
    },
    validationSchema: signUpSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ marginTop: 20 }}>
        <Stack
          spacing={3}
          sx={{
            width: "40%",
            m: "auto",
            border: "2px solid #8080803b",
            borderRadius: 2,
            padding: 3,
            boxShadow: 2,
          }}
        >
          <Box sx={{ color: "blue" }}>
            <h2 className="font-bold">Login...</h2>
          </Box>
          <label>
            <h3 className="font-bold">Username</h3>
          </label>
          <TextField
            id="outlined-basic"
            label="username"
            variant="outlined"
            name="username"
            placeholder="enter username.."
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.username && formik.touched.username ? (
            <p className="text-red-600">{formik.errors.username}</p>
          ) : null}
          <label>
            <h3 className="font-bold">Password</h3>
          </label>
          <TextField
            id="outlined-basic"
            label="password"
            variant="outlined"
            placeholder="enter password"
            type="password"
            name="userpassword"
            value={formik.values.userpassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.userpassword && formik.touched.userpassword ? (
            <p className="text-red-600">{formik.errors.userpassword}</p>
          ) : null}

          <Button
            ref={ref}
            variant="contained"
            type="submit"
            disabled={buttonDisable}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#" className="text-blue-900" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="./signup" className="text-blue-900">
                Don't have an account? Register now
              </Link>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </form>
  );
}

export default LoginForm;
