import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography, Pagination } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AdminPollApi, addVote } from "../Redux/slice/AdminSlice";
import { AddVoteApi } from "../Redux/slice/AddVote";
import { toast } from "react-toastify";
import UserNavbar from "../component/UserNavbar";

function Userdashboard() {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [voteCounts, setVoteCounts] = useState({});
  const [votedOptions, setVotedOptions] = useState({});
  const [voteTest, setVoteTest] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pollList = useSelector((state) => state.AdminSlice.data);
  const token = localStorage.getItem("token");
  const itemsPerPage = 3; // Set the number of items per page

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
      })
      .catch((error) => {
        console.error("Error while adding vote:", error);
        toast.error("Failed to submit your vote. Please try again later.");
      });
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <>
      <Box >
        <UserNavbar />
        <box >
          <Typography variant="h4" sx={{ textAlign: "center" }}>
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
              {!pollList.loading &&
                pollList.slice(startIndex, endIndex).map(
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
                          </div>
                        </Typography>
                      </Typography>
                    )
                )}
            </Box>
          </Stack>
        </box>
        <Pagination
          sx={{ textAlign: "center", width: "30%", margin: "auto" }}
          count={Math.ceil(pollList.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </>
  );
}

export default Userdashboard;
