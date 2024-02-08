import { Card, Stack, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";


const UserProfileDialog = () => {
  const [first, setfirst] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decode = jwtDecode(token);
    setfirst(decode);
    console.log(decode, "");
  }, []);
  console.log(first, "tyffyth");
  return (
    <>
      
        <Card
          sx={{
            width: 350,
            padding: 2,
            boxShadow: 2,
            bgcolor: "#8C7569",
            display: "flex",
            justifyContent: "center",

            color: "white",
            margin :'auto' ,
            alignContent : 'center',
            alignItems : 'center'
          }}
          variant="outlined"
        >
        <Stack sx={{
          textAlign : 'center'
        }}>
          <Typography>{` ID :  ${first._id}`}</Typography>
          <Typography>{` USERNAME :   ${first.username}`}</Typography>
          <Typography>{` ROLE :   ${first.role}`}</Typography>
          </Stack>
        </Card>
      
     
    </>
  );
};

export default UserProfileDialog;
