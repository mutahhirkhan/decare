import { createSlice } from "@reduxjs/toolkit";
import { signin } from './thunk';

const initialState = {
	status: "idle",
	user: {
		address: "",
		bio: "",
		email: "",
		imageUrl: "",
		name: "",
		organizationName: "",
		campaigns: {},
	},
};
const thunk = [
    signin,
]

export const counterSlice = createSlice({
	name: "profile",
	initialState,

	//async reducers, automatically invoked by thunk
	extraReducers: (builder) => {
		builder
			.addCase(signin.fulfilled, (state, action) => {
				state.status = "idle";
				state.user = { ...state.user, ...action.payload };
			})
			.addCase(...thunk, (state) => {
				state.status = "loading";
			})

			.addCase(...thunk, (state, action) => {
				state.status = "failed";
				state.user = initialState;
			});
	},
});

export const selectStatus = (state) => state.profile.status;
export const selectUser = (state) => state.profile.user;

// Action creators are generated for each case reducer function

export default counterSlice.reducer;
