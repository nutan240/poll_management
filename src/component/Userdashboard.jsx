import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Userdashboard() {
  const navigate = useNavigate();
  const pollList = useSelector((state) => state.AdminSlice.data);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };


  return (
    <Stack sx={{ bgcolor: 'pink', height: "100vh" }}>

   
      <Button sx={{ width: 100 }} variant="contained" onClick={logout}>
        Log Out
      </Button>


      <Box>
        {!pollList.loading && pollList.map((dataList) => (
          dataList.options.length > 0 && (
            <div key={dataList._id}>
              <div>{dataList.title}</div>
              <div>
                {dataList.options.map((option, i) => (
                  <div key={i}>
                    <input
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
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </Box>

    </Stack>
  );
}

export default Userdashboard;
