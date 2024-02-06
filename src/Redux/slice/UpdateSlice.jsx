import { createSlice } from "@reduxjs/toolkit";
import Instance from "../../axios/axios";

const initialState = {
  loading: false,
  error: null,
  success: false,
};

const updateSlice = createSlice({
  name: "update",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    updateSuccess(state) {
      state.loading = false;
      state.error = null;
      state.success = true;
    },
    updateError(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    resetState(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
});


export const updatePoll = (pollId, updatedData) => async (dispatch) => {


    console.log(updatedData , pollId ,'pollIddddddddddddddd');

  dispatch(startLoading());
  try {
   
    const response = await Instance.put(`/update_poll_title?id=${pollId}&title=${updatedData}`, updatedData);
    

    dispatch(updateSuccess());
    console.log(response.data);
  } catch (error) {
    console.log(error);
  
    dispatch(updateError(error.message));
  }
};

export const { startLoading, updateSuccess, updateError, resetState } =
  updateSlice.actions;


export default updateSlice.reducer;
