import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Grid,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { signUpApi, signupResetReducer, startLoading } from "../Redux/slice/signUpslice";
import { useFormik } from "formik";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { signUpSchema } from "../schemas";

function Signup() {
  const dispatch = useDispatch();
  const location = useNavigate();
  const [buttonDisable, setButtonDisable] = useState(false);
  const signUpslice = useSelector((state) => state.signUp);
  const status = signUpslice.loading;

  useEffect(() => {
    if (signUpslice.data.error === 1) {
      setButtonDisable(false);
      dispatch(signupResetReducer());

    }
     else if (signUpslice.data.error === 0) {
      setButtonDisable(true);
      dispatch(signupResetReducer());
      location("/", { state: formik.values });
    }
  }, [signUpslice.isSuccess]);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        password: "",
        confirm_password: "",
        role: "Guest",
      },
      validationSchema: signUpSchema,
      onSubmit:async (values) => {
        console.log("Form submitted with values:", values);

        try {
          dispatch(startLoading());
          await dispatch(signUpApi(values));
        } catch (error) {
          dispatch(signupResetReducer());
        }
      },
    });

  useEffect(() => {
    // Here, you can dispatch the resetReducer action
    return () => {
      dispatch(signupResetReducer());
    };
  }, [dispatch]);


  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box sx={{ marginTop: 20 }}>
          <Stack
            spacing={3}
            sx={{
              width: "40%",
              m: "auto",
              border: "2px solid #8080803b",
              borderRadius: 2,
              padding: 3,
              boxShadow: 3,
            }}
          >
            <Box sx={{ color: "blue" }}>
              <h2 className="font-bold">Sign in...</h2>
            </Box>
            <label>
              <h3 className="font-bold">Username</h3>
            </label>
            <TextField
              id="outlined-basic"
              label="username"
              variant="outlined"
              name="name"
              placeholder="enter username.."
              value={values.name}
              p
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && touched.name ? (
              <p className="text-red-600">{errors.name}</p>
            ) : null}

            <label className="font-bold">email</label>
            <TextField
              id="outlined-basic"
              label="email..."
              variant="outlined"
              name="email"
              placeholder="enter username.."
              value={values.email}
              p
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email ? (
              <p className="text-red-600">{errors.email}</p>
            ) : null}
            <label>
              <h3 className="font-bold">password</h3>
            </label>

            <TextField
              id="outlined-basic"
              label="password"
              variant="outlined"
              placeholder="enter password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password ? (
              <p className="text-red-600">{errors.password}</p>
            ) : null}

            <label>
              <h3 className="font-bold">Confirm Password</h3>
            </label>

            <TextField
              id="outlined-basic"
              label="password"
              variant="outlined"
              placeholder="enter password"
              type="password"
              name="confirm_password"
              value={values.confirm_password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.confirm_password && touched.confirm_password ? (
              <p className="text-red-600">{errors.confirm_password}</p>
            ) : null}
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Role
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={values.role}
                name="role"
                onChange={handleChange}
                label="role"
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value={10}>Admin</MenuItem>
                <MenuItem value={20}>User</MenuItem>
              </Select>
            </FormControl>

            <Button variant="contained" type="submit" disabled={buttonDisable}>
              Login
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <NavLink style={{ color: "#1565c0" }} to={"/"} variant="body2">
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </form>
    </>
  );
}

export default Signup;
