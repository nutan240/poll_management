import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AdminPollApi, addVote } from "../Redux/slice/AdminSlice";
import { AddVoteApi } from "../Redux/slice/AddVote";
import { toast } from "react-toastify";
import UserNavbar from "../component/UserNavbar";

function Userdashboard() {
  const [loading, setLoading] = useState(false);
  const [voteCounts, setVoteCounts] = useState({});
  const [votedOptions, setVotedOptions] = useState({});
  const [voteTest, setVoteTest] = useState(null); 

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pollList = useSelector((state) => state.AdminSlice.data);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoading(true);
    dispatch(AdminPollApi()).then(() => setLoading(false));
  }, [dispatch]);

  const header = {
    headers: {
      access_token: token,
    },
  };

  const handleVote = (dataList, OptionId, OptionData, i) => {
    setVoteTest(i);
    if (votedOptions[dataList.title]) {
      toast.error("You have already voted for this poll.");
      return;
    }
  
    dispatch(AddVoteApi(OptionId, OptionData, header))
      .then(() => {
        toast.success("Your Vote has been Submitted", { autoClose: 1000 });
  
        
        localStorage.setItem(`${dataList.title}_voted`, OptionData);
  
       
        dispatch(updateVoteCounts(OptionId));
  
        setVoteCounts((prevCounts) => ({
          ...prevCounts,
          [OptionId]: (prevCounts[OptionId] || 0) + 1,
        }));
  
        setVotedOptions((prevVotedOptions) => ({
          ...prevVotedOptions,
          [dataList.title]: OptionId,
        }));
      })
      .catch((error) => {
        console.error("Error while adding vote:", error);
        toast.error("Failed to submit your vote. Please try again later.");
      });
  };
  

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <UserNavbar />

      <Typography variant="h4" sx={{ textAlign: "center" }}>
        ALL POLLS
      </Typography>
      <Stack sx={{ height: "100vh" }}>
        <Stack
          sx={{
            display: "flex",
            alignItems: "end",
          }}
        ></Stack>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            borderRadius: 2,
            width: "97%",
            margin: "auto",
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
                      margin: 2,
                      width: {
                        lg: "45%",
                        sm: "100%",
                      },
                      padding: 1,
                    }}
                    key={dataList._id}
                  >
                    <Typography
                      sx={{
                        background: "  #8c7569c7",
                        padding: 1,
                      }}
                    >
                      <div className="pl-1">{dataList.title}</div>
                    </Typography>

                    <Typography sx={{ marginTop: 1 }}>
                      <div>
                        {dataList.options.map((option, i) => (
                          <Stack direction={'column'} sx={{ background: "#d9d2ce ",
                        marginTop: 1,
                          
                           }} key={i}>
                            <Stack
                             direction={'row'} 
                             sx={{  padding: 1 ,
                             display : 'flex',
                             justifyContent : 'space-between'
                             
                              }}>

                            <Typography>
                              {option.option}
                              </Typography>
                              <Typography>
                              <Button
                                onClick={() =>
                                  handleVote(dataList, dataList._id, option.option, i)
                                }
                                variant="contained"
                                size="small"
                                sx={{
                                  ml: 1,
                                  background: "#8c7569c7",
                                }}
                              >
                                Vote {votedOptions[dataList.title] === dataList._id && i === voteTest ? voteCounts[dataList._id] || 0 : '0'}
                              </Button>
                              </Typography>
                            </Stack>
                          </Stack>
                        ))}
                      </div>
                    </Typography>
                  </Typography>
                )
            )}
        </Box>
      </Stack>
    </>
  );
}

export default Userdashboard;
