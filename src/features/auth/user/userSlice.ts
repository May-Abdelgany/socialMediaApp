import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserState } from "./userState";
import type { User } from "./../interfaces/loginResponse";

const initialState: UserState = {
  data: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
      state.isLoggedIn = true;
    },

    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.data) {
        state.data = {
          ...state.data,
          ...action.payload,
        };
      }
    },

    clearUser: (state) => {
      state.data = null;
      state.isLoggedIn = false;
    },

    logoutUser: (state) => {
      state.data = null;
      state.isLoggedIn = false;
    },

    updateTokens: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken?: string;
      }>,
    ) => {
      if (!state.data) return;

      state.data.accessToken = action.payload.accessToken;

      if (action.payload.refreshToken) {
        state.data.refreshToken = action.payload.refreshToken;
      }
      if (localStorage.getItem("userData")) {
        localStorage.setItem("userData", JSON.stringify(state.data));
      } else {
        sessionStorage.setItem("userData", JSON.stringify(state.data));
      }
    },
  },
});

export const { setUser, updateUser, clearUser, logoutUser, updateTokens } =
  userSlice.actions;

export default userSlice.reducer;
