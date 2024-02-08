import { Button, Card, Stack, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserProfileDialog = () => {
  const [first, setfirst] = useState("");
const navigate = useNavigate();
  const backtopage = () => {
    const token = localStorage.getItem("token");
    const role = first.role; 
    if (token) {
      if (role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/userPoll");
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decode = jwtDecode(token);
    setfirst(decode);
    console.log(decode, "");
  }, []);

  return (
    <>
      <Stack
        sx={{
          background: "#cac0ba91",
          height: "100vh"
        }}
      >
        <Button 
         sx={{ my: 2, color: "#8C7569", display: "block"  , paddingLeft : 3 ,
         width : '100px'
          }}
        onClick={backtopage}>Go back</Button>
        <Card
          sx={{
            width: 350,
            padding: 2,
            boxShadow: 2,
            display: "flex",
            justifyContent: "center",
            margin: "auto",
            alignContent: "center",
            alignItems: "center",
            height: "200px"
          }}
          variant="outlined"
        >
          <Stack sx={{ textAlign: "center" }}>
            <Typography>{`ID: ${first._id}`}</Typography>
            <Typography>{`USERNAME: ${first.username}`}</Typography>
            <Typography>{`ROLE: ${first.role}`}</Typography>
          </Stack>
        </Card>
      </Stack>
    </>
  );
};

export default UserProfileDialog;
