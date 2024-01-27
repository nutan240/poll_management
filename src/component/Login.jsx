import { Box, Button, TextField, Grid, Link, Stack } from "@mui/material";

import React from "react";
import { signUpSchema } from "../schemas";
import { useFormik } from "formik";

const initialValues = {
  name: "",
  password: "",
};

function Loginpage() {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values) => {
        console.log("Form submitted with values:", values);
      },
    });

  return (
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
        component="form"
        onSubmit={handleSubmit}
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
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
      </Stack>
     
    </Box>
  );
}

export default Loginpage;
