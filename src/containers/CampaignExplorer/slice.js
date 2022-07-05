import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  status: 'idle',
}

export const counterSlice = createSlice({
  name: 'campaignExplorer',
  initialState,

  //plain reducers
  reducers: {
    //single counter reducer for all actions
    changeCounterValue: (state, action) => {
      state.value = action.payload
    },
  },
  
  //async reducers, automatically invoked by thunk
  extraReducers: (builder) => {

    /// NOTICE uncomment below code to work with async reducers

    // builder
    //   .addCase(signInAdmin.pending, (state) => {
    //     state.status = "loading";
    //   })
    //   .addCase(signInAdmin.fulfilled, (state, action) => {
    //     state.status = "idle";
    //   })
    //   .addCase(signInAdmin.rejected, (state, action) => {
    //     state.status = "failed";
    //   });
  },
})

export const selectStatus = (state) => state.campaignExplorer.status;

// Action creators are generated for each case reducer function
export const { changeCounterValue } = counterSlice.actions

export default counterSlice.reducer