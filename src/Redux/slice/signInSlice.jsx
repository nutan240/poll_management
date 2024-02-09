import { createSlice } from "@reduxjs/toolkit";
import Instance from "../../axios/axios";

const initialState = {
  loading: false,
  isError: false,
  isSuccess: false,
  data: [],
};

const signIn = createSlice({
  name: "signIn",
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

export const signInApi = (payload) => async (dispatch) => {
  dispatch(startLoading());
  try {
    let response = await Instance.post(
      `login?username=${payload.name}&password=${payload.password}`
    );
    dispatch(loginSuccessful(response.data));
  } catch (e) {
    dispatch(hasError(e));
    console.log(e, "afadfadf");
  }
};

export const { startLoading, loginSuccessful, hasError, resetReducer } =
  signIn.actions;

export default signIn.reducer;
