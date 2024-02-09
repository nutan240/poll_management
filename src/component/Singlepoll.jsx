import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Singlepoll() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pollData } = location.state;

  const backtopage = () => {
    navigate("/userPoll");
  };

  return (
    <div>
      <Typography
        sx={{
          fontWeight: "bold",
          fontStyle: "italic",
          fontSize: "36px",
          color: "#6f5c52",
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
            borderColor: "#8c7569c7",
            margin: "auto",
            width: "400px",
          }}
        >
          <Typography
            sx={{
              background: "  #8c7569c7",
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
        sx={{ my: 2, color: "#8C7569", display: "block", paddingLeft: 3 }}
        onClick={backtopage}
      >
        go back
      </Button>
    </div>
  );
}

export default Singlepoll;
