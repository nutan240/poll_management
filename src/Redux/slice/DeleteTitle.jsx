import { createSlice } from "@reduxjs/toolkit";
import Instance from "../../axios/axios";
import { dispatch } from "../store/store";
const initialState = {
  loading: false,
  isError: false,
  isSuccess: false,
  data: {},
};

const DeleteTitle = createSlice({
  name: "DeleteTitle",
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

export const DeleteTitleApi = (payload) => async () => {
  dispatch(DeleteTitle.actions.startLoading());
  try {
    let response = await Instance.delete(`delete_poll?id=${payload}`);
    dispatch(DeleteTitle.actions.loginSuccessful(response.data));
  } catch (e) {
    dispatch(DeleteTitle.actions.hasError(e));
  }
};

export const { startLoading, loginSuccessful, hasError, resetReducer } =
  DeleteTitle.actions;

export default DeleteTitle.reducer;
