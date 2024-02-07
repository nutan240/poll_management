import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography, Dialog, DialogContent } from "@mui/material";
import { userApi } from "../Redux/slice/UserSlice";

const UserProfileDialog = ({ isOpen, onClose }) => {
 


  useEffect(() => {
 
    userApi()
      
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  const userDetails = useSelector((state) =>
  
  
  //   console.log(state.
  //     userDetails.data.data
  //      , 'statesdfghj')
    
  state.userDetails.data.data
    );


  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent>
        <Typography variant="h5">User Profile</Typography>
        {Array.isArray(userDetails) && userDetails.length > 0 ? (
          userDetails.map((user) => (
            <div key={user._id}>
              <Typography>Username: {user.username}</Typography>
              <Typography>ID: {user._id}</Typography>
              <Typography>Role: {user.role}</Typography>
            </div>
          ))
        ) : (
          <Typography>No user details available</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileDialog;
