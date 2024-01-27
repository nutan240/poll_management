

import React from "react";
import { Box, Button, TextField, Grid, Stack } from "@mui/material";
import { signUpSchema } from "../schemas";
import { useFormik } from "formik";
import { Link } from 'react-router-dom'; 
const initialValues = {
  name: "",
  password: "",
};

function Login({data}) {

  console.log(data ,'dfghjkl' );
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values) => {
        console.log("Form submitted with values:", values);
      },
    });

  return (

    <form  onSubmit={handleSubmit}>
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

        <Button variant="contained" type="submit">
          Login
        </Button>
        <Grid container>
          <Grid item xs>
            <Link to="#"  className="text-blue-900" variant="body2">
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

export default Login;
