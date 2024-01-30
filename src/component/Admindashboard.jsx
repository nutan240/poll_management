import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

function Admindashboard() {

  const [loading, setLoading] = useState(true);
const dispatch = useDispatch();

  const navigate = useNavigate();

  const pollList = useSelector((state) => state.AdminPoll);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <Box sx={{ height:'100vh'}}>
      <Stack direction={'row'}  sx={{justifyContent:'space-between', padding:5}}>
     <Box>
     <Typography variant="h4"  sx={{fontFamily:'sans-serif',padding:2 ,  }}>well come to Admin poll</Typography>
     </Box>
        <Box>
        <Button sx={{ textAlign: "center" ,width:'100px'}} variant="contained"type="submit" onClick={logout}>
          Logout
        </Button>
        </Box>
      </Stack>
      <Box>
      <NavLink
        style={{ textDecoration: "none", color: "black" }}
        to={"/addPoll"}
      >
        <Typography variant="h5" textAlign={"center"}>
          Add Poll +
        </Typography>
      </NavLink>
      </Box>
    </Box>
  );
}

export default Admindashboard;
