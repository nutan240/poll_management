import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userApi } from "../Redux/slice/UserSlice";
import { Box, Card, Stack, Pagination } from "@mui/material";

const Table = () => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(16);
  const [displayedPages] = useState(3);

  const userDetails = useSelector((state) => state.userDetails.data);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = userDetails?.data
    ? userDetails.data.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  useEffect(() => {
    setLoading(true);
    userApi()
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

 
  const paginate = (event, value) => setCurrentPage(value);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <Stack
          sx={{ width: { lg: "80%" }, gap: 0, margin: { sm: 5, lg: "auto" } }}
        >
          <div style={{ overflowX: "auto" }}>
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
          </div>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Pagination
              count={Math.ceil((userDetails?.data?.length || 0) / itemsPerPage)}
              page={currentPage}
              onChange={paginate}
              color="primary"
            />
          </Box>
        </Stack>
      )}
    </>
  );
};

export default Table;
