import { createSlice } from "@reduxjs/toolkit";
import Instance from "../../axios/axios";

const initialState = {
  loading: false,
  isError: false,
  isSuccess: false,
  data: [],
};

const AddVote = createSlice({
  name: "AddVote",
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
      state.data = action.payload.data.reverse();
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
    updateVoteCount(state, action) {
      const { pollId, optionId, newVoteCount } = action.payload;

      const poll = state.data.filter((poll) => poll._id === pollId);
      if (poll) {
        const option = poll.options.filter((option) => option._id === optionId);
        if (option) {
          option.vote = newVoteCount;
        }
      }
    },
  },
});

export const AddVoteApi =
  (VoteId, VoteOptionText, header) => async (dispatch) => {
    dispatch(startLoading());
    try {
      let response = await Instance.get(
        `do_vote?id=${VoteId}&option_text=${VoteOptionText}`,
        header
      );
      dispatch(AddVote.actions.getSuccess(response.data));
    } catch (e) {
      dispatch(AddVote.actions.hasError(e));
    }
  };

export const {
  startLoading,
  getSuccess,
  hasError,
  resetReducer,
  updateVoteCount,
} = AddVote.actions;

export default AddVote.reducer;
