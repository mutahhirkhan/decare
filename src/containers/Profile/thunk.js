import { createAsyncThunk } from "@reduxjs/toolkit";

import { signInUser, signOutUser, signUpUser, getCurrentUser, onAuthStateChanged } from "../../services/firebase/authService";

export const signin = createAsyncThunk(
  "profile/signin",
  async (payload) => {
    const response = await signInUser(...payload);
    console.log('signin res', response);
    return response;
  }
);