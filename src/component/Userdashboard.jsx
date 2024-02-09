import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography, Pagination } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AdminPollApi, addVote, getSuccess } from "../Redux/slice/AdminSlice";
import { AddVoteApi } from "../Redux/slice/AddVote";
import { ToastContainer, toast } from "react-toastify";
import UserNavbar from "../component/UserNavbar";
import "react-toastify/dist/ReactToastify.css";

function Userdashboard() {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [voteCounts, setVoteCounts] = useState({});
  const [votedOptions, setVotedOptions] = useState({});
  const [voteTest, setVoteTest] = useState(null);
  const [disabledOptions, setDisabledOptions] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pollList = useSelector((state) => state.AdminSlice.data);
  const token = localStorage.getItem("token");
  const itemsPerPage = 4;

  const addvoteSuccessloading = useSelector((state) => state.AddVote.isSuccess);
  useEffect(() => {}, [addvoteSuccessloading]);
  console.log(pollList, "pollListpollListpollList");
  useEffect(() => {
    setLoading(true);
    dispatch(AdminPollApi()).then(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    const storeDisabledOptions = JSON.parse(
      localStorage.getItem("disabledOptions")
    );
    if (storeDisabledOptions) {
      setDisabledOptions(storeDisabledOptions);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("disabledOptions", JSON.stringify(disabledOptions));
  }, [disabledOptions]);

  const header = {
    headers: {
      access_token: token,
    },
  };

  const handleVote = (dataList, OptionId, OptionData, i) => {
    setVoteTest(i);

    const hasVotedForPoll = votedOptions[dataList.title];

    dispatch(AddVoteApi(OptionId, OptionData, header))
      .then(() => {
        
        if (hasVotedForPoll) {
          

          const previousVoteCountKey = `${dataList.title}_${
            votedOptions[dataList.title]
          }_vote`;

          const previousVoteCount =
            parseInt(localStorage.getItem(previousVoteCountKey)) || 0;
          localStorage.setItem(previousVoteCountKey, previousVoteCount - 1);
        }

        localStorage.setItem(`${dataList.title}_voted`, OptionData);

        const voteCountKey = `${dataList.title}_${OptionId}_vote`;
        const currentVoteCount = localStorage.getItem(voteCountKey) || 0;
        localStorage.setItem(voteCountKey, parseInt(currentVoteCount) + 1);

        setVoteCounts((prevCounts) => ({
          ...prevCounts,
          [OptionId]: 1,
        }));

        setVotedOptions((prevVotedOptions) => ({
          ...prevVotedOptions,
          [dataList.title]: OptionId,
        }));

        setDisabledOptions((prevDisabledOptions) => ({
          ...prevDisabledOptions,
          [`${dataList.title}_${OptionId}`]: true,
        }));

        toast.success("Your Vote has been Submitted", { autoClose: 1000 });
      })
      .catch((error) => {
        console.error("Error while adding vote:", error);
        toast.error("Failed to submit your vote. Please try again later.");
      });
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
      <Box>
        <UserNavbar />
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              fontStyle: "italic",
              fontSize: "36px",
              color: "#6f5c52",
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
                        <Stack
                          direction={"column"}
                          sx={{ background: "#d9d2ce ", marginTop: 1 }}
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
                                    dataList,
                                    dataList._id,
                                    option.option,
                                    i
                                  )
                                }
                                variant="contained"
                                size="small"
                                sx={{
                                  ml: 1,
                                  background: "#8c7569c7",
                                }}
                                disabled={
                                  disabledOptions[dataList.title] ||
                                  (votedOptions[dataList.title] ===
                                    dataList._id &&
                                    i === voteTest) ||
                                  voteCounts[
                                    `${dataList.title}_${dataList._id}_${i}`
                                  ] === 1
                                }
                              >
                                Vote{" "}
                                {votedOptions[dataList.title] ===
                                  dataList._id && i === voteTest
                                  ? 1
                                  : 0}
                              </Button>
                            </Typography>
                          </Stack>
                        </Stack>
                      ))}
                      <Button
                        sx={{
                          my: 2,
                          color: "#6f5c52",
                          display: "block",
                          textDecoration: "underline",
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
