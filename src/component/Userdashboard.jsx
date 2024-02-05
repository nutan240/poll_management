import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dispatch } from "../Redux/store/store";
import { AdminPollApi, addVote } from "../Redux/slice/AdminSlice";
import { AddVoteApi } from "../Redux/slice/AddVote";
import { toast } from "react-toastify";

function Userdashboard() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const pollList = useSelector((state) => state.AdminSlice.data);
  const token = localStorage.getItem("token");
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  useEffect(() => {
    dispatch(AdminPollApi()).then(() => setLoading(false));
  }, [dispatch]);


  const header = {
    headers: {
      access_token: token,
    },
  };


  const VoteChange = (title, OptionId, OptionData) => {
    dispatch(AddVoteApi(OptionId, OptionData, header));
   
    toast.success("Your Vote has been Submitted", { autoClose: 1000 });
    
    localStorage.setItem(`${title}_voted`, OptionData);

    console.log(`Vote added for "${title}" with OptionId: ${OptionId}`);


    dispatch(addVote(OptionId));

  };
  if (loading) {
    return <h1>loading</h1>;
  }
  return (
    <Stack sx={{ height: "100vh" }}>
      <Stack
        sx={{
          display: "flex",
          alignItems: "end",
        }}
      >
        <Button
          sx={{ width: 100, background: "#d9d2ce " }}
          variant="contained"
          onClick={logout}
        >
          Log Out
        </Button>
      </Stack>

      <Box
        sx={{
          borderRadius: 2,
        }}
      >
        {!pollList.loading &&
          pollList.map(
            (dataList) =>
              dataList.options.length > 0 && (
                <Typography
                  sx={{
                    borderRadius: 2,
                    border: 2,
                    borderColor: "#8c7569c7",
                    marginTop: 3,
                  }}
                  key={dataList._id}
                >
                  <Typography
                    sx={{
                      background: "  #8c7569c7",
                      padding: 1,
                      borderRadius: 2,
                    }}
                  >
                    <div>{dataList.title}</div>
                  </Typography>

                  <Typography
                    sx={{
                      marginTop: 1,
                    }}
                  >
                    <div>
                      {dataList.options.map((option, i) => (
                        <Typography
                          sx={{
                            background: "#d9d2ce ",

                            borderRadius: 2,
                          }}
                        >
                          <Typography
                            sx={{
                              marginTop: 1,
                            }}
                          ></Typography>
                          <Typography
                            sx={{
                              padding: 1,
                            }}
                            key={i}
                          >
                            <input
                              className="mr-3 ml-2"
                              type="radio"
                              name={dataList._id}
                              style={{ cursor: "pointer" }}
                              onChange={() =>
                                VoteChange(
                                  dataList.title,
                                  dataList._id,
                                  option.option
                                )
                              }

                            />
                            {option.option}
                          </Typography>
                        </Typography>
                      ))}
                    </div>
                  </Typography>
                </Typography>
              )
          )}
      </Box>
    </Stack>
  );
}

export default Userdashboard;
