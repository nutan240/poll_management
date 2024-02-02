import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userApi } from "../Redux/slice/UserSlice";
function Table() {

    const userDetails = useSelector((state) => state.userDetails.data);
    const dispatch = useDispatch();
    console.log(userDetails, "dcdfghyui");
    useEffect(() => {
      dispatch(userApi());
    }, [dispatch]);
  return (
    <>
      <table>
        <tr>
          <th>ID </th>
          <th>USER NAME </th>
          <th>ROLE </th>
        </tr>
        {userDetails.data.map((user) => (
       <tr>
       <td >
           {user._id}
        </td>
        <td >
           {user.username}
        </td>
        <td >
           {user.role}
        </td>
       </tr>
        
      ))}
      </table>
    </>
  );
}

export default Table;
