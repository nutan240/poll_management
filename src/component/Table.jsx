import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userApi } from "../Redux/slice/UserSlice";
import { Box, Card, Stack, Pagination } from "@mui/material";

function Table() {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50); 
  const [displayedPages] = useState(3);

  const userDetails = useSelector((state) => state.userDetails.data);

  useEffect(() => {
    setLoading(true);
    userApi()
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userDetails.data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (event, value) => setCurrentPage(value);

  // Go to previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Go to next page
  const goToNextPage = () => {
    if (currentPage < Math.ceil(userDetails.data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Calculate the range of visible page numbers
  const startPage = Math.max(1, currentPage - Math.floor(displayedPages / 2));
  const endPage = Math.min(
    startPage + displayedPages - 1,
    Math.ceil(userDetails.data.length / itemsPerPage)
  );

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <Stack sx={{ width: "70%", gap: 0, margin: "auto" }}>
          <table>
          <tr>
              <th>
                <Card
                  sx={{
                    justifyContent: "center",
                    width: 350,
                    padding: 2,
                    boxShadow: 2,
                    bgcolor: "#8C7569",
                    display: "flex",
                    color: "white",
                  }}
                  variant="outlined"
                >
                  ID
                </Card>
              </th>
              <th>
                <Card
                  sx={{
                    width: 350,
                    padding: 2,
                    boxShadow: 2,
                    bgcolor: "#8C7569",
                    display: "flex",
                    justifyContent: "center",
                    color: "white",
                  }}
                  variant="outlined"
                >
                  USER NAME
                </Card>
              </th>{" "}
              <th>
                <Card
                  sx={{
                    width: 350,
                    padding: 2,
                    boxShadow: 2,
                    bgcolor: "#8C7569",
                    display: "flex",
                    justifyContent: "center",
                    color: "white",
                  }}
                  variant="outlined"
                >
                  ROLE
                </Card>
              </th>
            </tr>
           
            {currentItems.map((user) => (
              <tr key={user._id}>
                  <td>
                    <Card
                      sx={{
                        width: 350,
                        padding: 2,
                        boxShadow: 2,
                        //   bgcolor: "#dbdbdb99",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      variant="outlined"
                    >
                      {user._id}
                    </Card>
                  </td>
                  <td>
                    <Card
                      sx={{
                        width: 350,
                        padding: 2,
                        boxShadow: 2,
                        //   bgcolor: "#dbdbdb99",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      variant="outlined"
                    >
                      {user.username}
                    </Card>
                  </td>
                  <td>
                    <Card
                      sx={{
                        width: 350,
                        padding: 2,
                        boxShadow: 2,
                        //   bgcolor: "#dbdbdb99",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      variant="outlined"
                    >
                      {user.role}
                    </Card>
                  </td>
                </tr>
            ))}
          </table>
        
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Pagination
              count={Math.ceil(userDetails.data.length / itemsPerPage)}
              page={currentPage}
              onChange={paginate}
              color="primary"
            />
          </Box>
        </Stack>
      )}
    </>
  );
}

export default Table;
