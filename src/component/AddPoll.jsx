import React, { useState } from "react";
import { Box, Button, Fab, Stack, TextField, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import { AddPollApi, resetReducer } from "../Redux/slice/AddSlice";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const AddPoll = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newOption, setNewOption] = useState([{ option: "" },
{option: ''}]);
  const pollData = useSelector((state) => state);
  console.log("Redux State in AddPoll:", pollData);

  const decreseLength = () => {
    if (newOption.length > 2) {
      const newar = [...newOption];
      newar.pop();
      setNewOption(newar);
    } else {
      toast.error("two Option is necessary");
    }
  };
  const increseLength = () => {
    if (newOption.length < 4) {
      setNewOption([...newOption, { option: "" }]);
    } else {
      toast.error("only four options are allowed");
    }
  };

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const updatedOptions = newOption.map((option, i) => {
      if (i === index) {
        return { ...option, [name]: value };
      }
      return option;
    });
    setNewOption(updatedOptions);
  };

 

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: (values) => {
      try {
        if (values.title.trim() !== "") {
          const nonEmptyOptions = newOption.every(
            (option) => option.option.trim() !== ""
          );

          if (nonEmptyOptions) {
            {
              dispatch(AddPollApi(values, newOption));
              setTimeout(() => {
                navigate("/admin");
              }, 200);
            }
          } else {
            toast.warning("Please enter Options");
          }
        } else {
          dispatch(resetReducer());
          toast.warning("Please enter a title or Opions");
        }
      } catch (error) {}
    },
  });

  return (
    <Box className="formBodyStyle">
      <form onSubmit={formik.handleSubmit}>
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
          {newOption.map((e, i) => {
            return (
              <TextField
                key={i}
                label={"Option " + (i + 1)}
                name={`option`}
                value={e.option}
                onChange={(event) => handleChange(event, i)}
              />
            );
          })}
          <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
            <Button variant="contained" onClick={() => increseLength()}>
              add option
            </Button>

            <Button sx={{bgcolor:'red'}} variant="contained" onClick={() => decreseLength()}>
              remove option
            </Button>
          </Stack>
          <Button
            variant="contained"
            
            type="submit"
           
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
      <Outlet />
    </Box>
  );
};
export default AddPoll;
