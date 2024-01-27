import React from "react";
import { Box, Button, TextField, Grid, Stack, Link } from "@mui/material";
import { signUpSchema } from "../schemas";
import { useFormik } from "formik";
// import { Link, useNavigate } from 'react-router-dom';

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
};

function Signup() {
  //   const navigate = useNavigate()

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values) => {
        console.log("Form submitted with values:", values);
      },
    });

  return (
    <>
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

          <Button variant="contained" type="submit">
            Login
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link>already have account ? Login</Link>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </>
  );
}

export default Signup;