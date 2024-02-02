import { createSlice } from "@reduxjs/toolkit";
import Instance from "../../axios/axios";

const initialState = {
  loading: false,
  isError: false,
  isSuccess: false,
  data: {},
};

const AddPoll = createSlice({
  name: "AddPoll",
  initialState: initialState,
  reducers: {
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
  },
});

export const AddPollApi = (payload, newOption) => async (dispatch) => {
  dispatch(AddPoll.actions.startLoading());
  
  try {
 
    const optionsString = newOption.map(option => option.option).join('____');

    const response = await Instance.post(
      `add_poll?title=${payload.title}&options=${optionsString}`
    );

    dispatch(AddPoll.actions.loginSuccessful(response.data));
  } catch (e) {
    dispatch(AddPoll.actions.hasError(e));
  }
};

export const { startLoading, loginSuccessful, hasError, resetReducer } =
  AddPoll.actions;

export default AddPoll.reducer;
