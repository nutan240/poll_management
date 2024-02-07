import React from "react";
import Table from "./Table";
import { Button, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

function UserDetails() {
  return (
    <>
      <Stack>
        <NavLink
          style={{ textDecoration: "none", color: "black" }}
          to={"/admin"}
        >
          <Typography
          sx={{ my: 2, color: "#8C7569", display: "block"  , paddingLeft : 3
          }}
          >  Go Back </Typography>
        </NavLink>
        <Table />
      </Stack>
    </>
  );
}

export default UserDetails;
