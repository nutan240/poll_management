import { createSlice } from "@reduxjs/toolkit";
import Instance from "../../axios/axios";

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
      state.data = [];
    },
    addVote: (state, action) => {
      const { pollId, optionId } = action.payload;

      const poll = state.data.find((poll) => poll._id === pollId);
      if (poll) {
        const option = poll.options.find((option) => option._id === optionId);
        if (option) {
          option.vote = (option.vote || 0) + 1;
        }
      }
    },
  },
});

export const AdminPollApi = () => async (dispatch) => {
  dispatch(startLoading());
  try {
    let response = await Instance.post(`list_polls`);
    dispatch(getSuccess(response.data));
  } catch (e) {
    dispatch(hasError(e));
  }
};

export const { startLoading, getSuccess, hasError, resetReducer, addVote } =
  AdminPoll.actions;

export default AdminPoll.reducer;
