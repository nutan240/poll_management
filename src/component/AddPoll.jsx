import { Box, Button, Fab, Stack, TextField, Typography } from '@mui/material'
import React from 'react'


function AddPoll() {
    
    const formik = useFormik({
        initialValues: {
            title: "",
          },
          onSubmit: (values) =>{
            console.log(values);
          }
    })
     const handleSubmit=()=>{

     }
     let newOption;
  return (
   <Stack sx={{width:900, margin:'auto'}}>
    <Box className="formBodyStyle">
      <form onSubmit={handleSubmit}>
        <Stack direction={"column"} spacing={2} className="form_container">
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Add Data Here
          </Typography>
          <TextField
            label={"Title"}
            name="title"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        
          <TextField
            label={"option"}
            
            name={`option`}
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
           
           
             
            
          </Stack>
          <Button
            variant="contained"
            // onClick={formik.handleSubmit}
            type="submit"
            disabled={!formik.dirty}
          >
            Submit
          </Button>
          <Link to={"/admin"} width="100%">
            <Button sx={{ width: "100%" }} variant="contained">
              Cancel
            </Button>
          </Link>
        </Stack>
      </form>
      <ToastContainer />
    
    </Box>
   </Stack>
  )
}
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export default AddPoll