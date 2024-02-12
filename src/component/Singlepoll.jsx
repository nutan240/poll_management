import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Image from "../assets/addpollimg.jpg";


function Singlepoll() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pollData } = location.state;

  const backtopage = () => {
    navigate("/userPoll");
  };

  return (
    <Stack  sx={{
       backgroundImage: ` url( ${Image} )`,
        height: "100vh",
        padding: "20px",
    }}>
      <Typography
        sx={{
          fontWeight: "bold",
          fontStyle: "italic",
          fontSize: "36px",
          color: "white",
          textDecoration: "underline",
          textAlign: "center",
        }}
      >
        Single Poll Data
      </Typography>
      {pollData && (
        <Stack
          sx={{
            padding: 1,
            display: "flex",
            justifyContent: "space-between",
            borderRadius: 2,
            border: 2,
            borderColor: "#255470",
            margin: "auto",
            width: "400px",
          }}
        >
          <Typography
            sx={{
              background: " #255470",
              padding: 1,
            }}
          >
            <div className="pl-1">{pollData.title}</div>
          </Typography>

          <Stack
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {pollData.options.map((option, index) => (
              <Typography
                sx={{
                  background: "#d9d2ce ",
                  padding: 1,
                  marginTop: 1,
                }}
                key={index}
              >
                {option.option}
              </Typography>
            ))}
          </Stack>
        </Stack>
      )}

      <Button
        sx={{ my: 2, color: "white", display: "block", paddingLeft: 3 }}
        onClick={backtopage}
      >
        go back
      </Button>
    </Stack>
  );
}

export default Singlepoll;
