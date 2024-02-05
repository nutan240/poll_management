import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userApi } from "../Redux/slice/UserSlice";
import { Box, Card, Stack } from "@mui/material";

function Table() {
  const [loading, setLoading] = useState(false);
  const userDetails = useSelector((state) => state.userDetails.data);

  useEffect(() => {
    userApi();
  }, []);

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
            {userDetails.data &&
              userDetails.data.map((user) => (
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
        </Stack>
      )}
    </>
  );
}

export default Table;
