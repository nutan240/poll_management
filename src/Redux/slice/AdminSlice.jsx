import { createSlice } from "@reduxjs/toolkit";
import Instance from "../../axios/axios";
import { dispatch } from "../store/store";


const initialState = {
  loading: false,
  isError: false,
  isSuccess: false,
  data: [],
};

const AdminPoll = createSlice({
  name: "AdminPoll",
  initialState: initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.isError = false;
    },
    getSuccess: (state, action) => {
      state.loading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = action.payload.data;
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

    addVote: (state, action) => {
      const { optionId } = action.payload;
    
      state.data.forEach((poll) => {
        poll.options.forEach((option) => {
          if (option._id === optionId) {
            option.vote = option.vote + 1; 
          }
        });
      });
    },
  },
});

export const AdminPollApi = () => async () => {
  dispatch(startLoading());
  try {
    let response = await Instance.post(`list_polls`);
    dispatch(AdminPoll.actions.getSuccess(response.data));
  } catch (e) {
    dispatch(AdminPoll.actions.hasError(e));
  }
};

export const { startLoading, getSuccess, hasError, resetReducer ,addVote } = AdminPoll.actions;

export default AdminPoll.reducer;
