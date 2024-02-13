import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography, Pagination } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AdminPollApi, addVote } from "../Redux/slice/AdminSlice";
import { AddVoteApi } from "../Redux/slice/AddVote";
import { ToastContainer, toast } from "react-toastify";
import UserNavbar from "../component/UserNavbar";
import "react-toastify/dist/ReactToastify.css";
import Image from "../assets/adminimg.jpg";

function Userdashboard() {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [voteTest, setVoteTest] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pollList = useSelector((state) => state.AdminSlice.data);
  const token = localStorage.getItem("token");
  const itemsPerPage = 4;

  useEffect(() => {
    setLoading(true);
    dispatch(AdminPollApi()).then(() => setLoading(false));
  }, [dispatch]);

 
  useEffect(() => {
    const storedDisabledOptions = JSON.parse(localStorage.getItem("disabledOptions")) || {};
    setDisabledOptions(storedDisabledOptions);
  }, []);

  const [disabledOptions, setDisabledOptions] = useState({});

  const header = {
    headers: {
      access_token: token,
    },
  };

  const handleVote = (OptionId, OptionData, OptionIndex) => {
    dispatch(AddVoteApi(OptionId, OptionData, header));
    // Disable the voting button
    setDisabledOptions((prevOptions) => ({
      ...prevOptions,
      [OptionId]: OptionIndex,
    }));
    // Update local storage to store disabled options
    localStorage.setItem("disabledOptions", JSON.stringify({ ...disabledOptions, [OptionId]: OptionIndex }));
    toast.success("Your Vote has been Submitted", { autoClose: 1000 });
  };

  const viewsinglepoll = (pollId) => {
    const selectedPoll = pollList.find((poll) => poll._id === pollId);
    if (selectedPoll) {
      navigate(`/singlepoll/${pollId}`, { state: { pollData: selectedPoll } });
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const reversedPollList = [...pollList].reverse();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPolls = reversedPollList.slice(startIndex, endIndex);

  return (
    <>
      <Box
        sx={{
          backgroundImage: ` url( ${Image} )`,
          objectFit: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          overflow: "auto",
        }}
      >
        <UserNavbar />
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              fontStyle: "italic",
              fontSize: "36px",
              color: "rgb(37 52 58)",
              textDecoration: "underline",
              textAlign: "center",
            }}
          >
            ALL POLLS
          </Typography>
          <Stack sx={{ height: "auto" }}>
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
              {paginatedPolls.map((dataList) => (
                <Typography
                  sx={{
                    borderRadius: 2,
                    border: 2,
                    borderColor: "#3f6576",
                    margin: 2,
                    width: {
                      lg: "45%",
                      sm: "100%",
                      xs : "100%"
                    },
                    padding: 1,
                  }}
                  key={dataList._id}
                >
                  <Typography
                    sx={{
                      background: "#3f6576c2",
                      padding: 1,
                    }}
                  >
                    <div className="pl-1">{dataList.title}</div>
                  </Typography>

                  <Typography sx={{ marginTop: 1 }}>
                    <div>
                      {dataList.options.map((option, i) => (
                        <Stack
                          direction={"column"}
                          sx={{ background: "rgb(255 255 255)", marginTop: 1 }}
                          key={i}
                        >
                          <Stack
                            direction={"row"}
                            sx={{
                              padding: 1,
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography>{option.option}</Typography>
                            <Typography>
                              <Button
                                onClick={() =>
                                  handleVote(
                                    dataList._id,
                                    option.option,
                                    i
                                  )
                                }
                                variant="contained"
                                size="small"
                                sx={{
                                  ml: 1,
                                  background: "rgb(65 94 106)",
                                }}
                                disabled={disabledOptions[dataList._id] === i}
                              >
                                 {disabledOptions[dataList._id] === i ? `Vote (1)` : "Vote(0)"}
                              </Button>
                            </Typography>
                          </Stack>
                        </Stack>
                      ))}
                      <Button
                        sx={{
                          my: 2,
                          color: "white",
                          display: "block",
                          textDecoration: "underline",
                          fontSize: "17px",
                          fontWeight : 'bold'
                        }}
                        onClick={() => viewsinglepoll(dataList._id)}
                      >
                        view a poll
                      </Button>
                    </div>
                  </Typography>
                </Typography>
              ))}
            </Box>
          </Stack>
        </Box>
        <Typography
          sx={{
            width: "70%",
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            paddingBottom: 3,
          }}
        >
          <Pagination
            count={Math.ceil(pollList.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Typography>
      </Box>
      <ToastContainer />
    </>
  );
}

export default Userdashboard;







