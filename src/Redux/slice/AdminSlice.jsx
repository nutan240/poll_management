import { createSlice } from "@reduxjs/toolkit";

import Instance from "../../axios/axios";

const initialState ={
    loading: false,
    isError: false,
    isSuccess: false,
    data: {},
}

export const AdminPoll = createSlice({
name: "AdminPoll",
initialState:initialState,
reducers:{
    startLoading: (state)=>{
        state.loading=true;
        state.isError =false
    },
    getSuccess: (state ,action)=>{
        state.loading = false;
        state.isError = false;
        state.isSuccess= true;
        state.data ={...action.payload}
    },
    hasError : (state, action) =>{
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

export const AdminPollApi = ()=> async ()=>{
    dispatch (startLoading());
    try{
        let response = await Instance.post(
            `list_poll`
        );
        dispatch(AdminPoll.actions.getSuccess(response.data));
    } catch (e){
        dispatch(AdminPoll.actions.hasError(e));

    }
}

export const {startLoading, hasError,resetReducer, getSuccess} = AdminPoll.actions;

export default AdminPoll.reducer;
