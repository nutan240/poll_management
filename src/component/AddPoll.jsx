import React, { useState } from "react";
import { Box, Button, Fab, Stack, TextField, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import { AddPollApi, resetReducer } from "../Redux/slice/AddSlice";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
const AddPoll = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newOption, setNewOption] = useState([{ option: "" }, { option: "" }]);
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

  const handleDeleteOption = (indexToDelete) => {
    const updatedOptions = newOption.filter(
      (_, index) => index !== indexToDelete
    );
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
                navigate("/dashboard");
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
    <Box
      sx={{
        background: "#a9988f7a",
        height: "100vh",
        padding: "20px",
      }}
    >
      <Box
        className="formBodyStyle"
        sx={{
          width: 500,
          marginX: "auto",
          background: "white",
          padding: 4,
          borderRadius: 3,
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Stack direction={"column"} spacing={2} className="form_container">
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                fontStyle: "italic",
                fontSize: "36px",
                color: "#6f5c52",
                textDecoration: "underline",
                textAlign: "center",
              }}
            >
              Add Poll
            </Typography>
            <TextField
              sx={{ width: "410px" }}
              label={"Title"}
              name="title"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {newOption.map((e, i) => (
              <Stack direction={"row"} key={i}>
                <TextField
                  sx={{ width: "410px" }}
                  label={"Option " + (i + 1)}
                  name={`option`}
                  value={e.option}
                  onChange={(event) => handleChange(event, i)}
                />
                {newOption.length > 2 && (
                  <Typography>
                    <DeleteIcon
                      sx={{
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        textAlign: "center",
                        color: "red",
                        marginTop: "13px",
                        fontSize: "30px",
                      }}
                      onClick={() => handleDeleteOption(i)}
                    />
                  </Typography>
                )}
              </Stack>
            ))}

            <Stack
              direction={"row"}
              sx={{
                justifyContent: "space-between",
              }}
            >
              {newOption.length < 4 && (
                <Button
                  variant="contained"
                  sx={{
                    background:
                      "linear-gradient(to top, #c79081 0%, #dfa579 100%)",
                    "&:hover": {
                      background: "#6b5b51",
                    },
                  }}
                  onClick={() => increseLength()}
                >
                  Add Option
                </Button>
              )}
            </Stack>

            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(to top, #c79081 0%, #dfa579 100%)",
              }}
              type="submit"
            >
              Submit
            </Button>

            <Link to={"/dashboard"} width="100%">
              <Button
                sx={{
                  background:
                    "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)",

                  width: "100%",
                  color: "white",
                }}
              >
                Cancel
              </Button>
            </Link>
          </Stack>
        </form>
        <ToastContainer />
        <Outlet />
      </Box>
    </Box>
  );
};
export default AddPoll;
