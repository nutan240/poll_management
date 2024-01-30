import { createSlice } from "@reduxjs/toolkit";
import Instance from "../../axios/axios";

const initialState = {
    loading: false,
    isError: false,
    isSuccess: false,
    data: {},
  };

  const AddSlice = createSlice({
    name:"AddSlice",
    initialState:initialState,
    reducers :{
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
          resetReducer(state) {
            state.isError = false;
            state.loading = false;
            state.isSuccess = false;
            state.data = {};
          },
    }
  })

  export const AddPollApi = (payload,)=> async ()=>{
    dispatchEvent(AddSlice.actions.startLoading());
  try{

  }
catch (e){
    dispatch(hasError(e));
}
  };

  export const { startLoading,loginSuccessful,hasError,resetReducer} = AddSlice.actions;
  export default AddSlice.reducer;
