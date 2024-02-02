import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store/store";
import Instance from "../../axios/axios";



const initialState ={
    loading: false,
  isError: false,
  isSuccess: false,
  data: [],
};

const userDetails = createSlice({
    name : "userDetails",
    initialState:initialState,
    reducers:{

        startLoading: (state) => {
            state.loading = true;
            state.isError = false;
          },
          loginSuccessful: (state, action) => {
            state.loading = false;
            state.isError = false;
            state.isSuccess = true;
            state.data = { ...action.payload };
          },
          hasError: (state, action) => {
            state.loading = false;
            state.isError = true;
            state.isSuccess = false;
            state.errorMessage = action.payload;
          },

    }
});

export const userApi = ()=> async () =>{
    dispatch(startLoading());
    try {
        let response = await Instance.get(`list_users`);
        dispatch(loginSuccessful(response.data));
        console.log(response,'response');
      }catch (e) {
        dispatch(hasError(e));
        console.log(e,'sdffsf');
      }
};

export const { startLoading, getSuccess ,loginSuccessful ,hasError} = userDetails.actions;

export default userDetails.reducer;