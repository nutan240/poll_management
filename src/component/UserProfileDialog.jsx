import { Button, Card, Stack, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Image from '../assets/adminimg.jpg';

const UserProfile = () => {
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
          backgroundImage :` url( ${Image} )` ,
  
  
  width : '100%' ,
          
          height: "100vh",
        }}
      >
        <Button
          sx={{
            
            color: "white",
            width: "100px",
            fontSize : '15px' ,
            fontWeight : 'bold'
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
            background : 'rgb(242 242 242)',
            fontSize : '27px'
          }}
          variant="outlined"
        >
          <Stack sx={{ textAlign: "center",
           fontSize : '27px'
          
           }}>
            <Typography sx={{ fontSize : '20px' ,
            }}>{`ID: ${userProfileInfo._id}`}</Typography>
            <Typography   sx={{ fontSize : '20px', 
            
            }}>{`USERNAME: ${userProfileInfo.username}`}</Typography>
            <Typography sx={{ fontSize : '20px'}} >{`ROLE: ${userProfileInfo.role}`}</Typography>
          </Stack>
        </Card>
      </Stack>
    </>
  );
};

export default UserProfile;
