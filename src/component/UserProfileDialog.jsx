import { Button, Card, Stack, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserProfileDialog = () => {
  const [userProfileInfo, setuserProfileInfo] = useState("");
  const navigate = useNavigate();
  const backtopage = () => {
    const token = localStorage.getItem("token");
    const role = userProfileInfo.role;
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
    setuserProfileInfo(decode);
  }, []);

  return (
    <>
      <Stack
        sx={{
          background: "#cac0ba91",
          height: "100vh",
        }}
      >
        <Button
          sx={{
            my: 2,
            color: "#8C7569",
            display: "block",
            paddingLeft: 3,
            width: "100px",
          }}
          onClick={backtopage}
        >
          Go back
        </Button>
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
            height: "200px",
          }}
          variant="outlined"
        >
          <Stack sx={{ textAlign: "center" }}>
            <Typography>{`ID: ${userProfileInfo._id}`}</Typography>
            <Typography>{`USERNAME: ${userProfileInfo.username}`}</Typography>
            <Typography>{`ROLE: ${userProfileInfo.role}`}</Typography>
          </Stack>
        </Card>
      </Stack>
    </>
  );
};

export default UserProfileDialog;
