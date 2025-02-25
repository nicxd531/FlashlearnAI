import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  avatar?: string;
  backgroundCover: string | undefined;
  followers: number;
  followings: number;
}
interface AuthState {
  profile: UserProfile | null;
  loggedIn: boolean;
  busy: boolean;
  busyACollection: boolean;
}
const initialState: AuthState = {
  profile: null,
  loggedIn: false,
  busy: false,
  busyACollection: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateProfile(authState, { payload }: PayloadAction<UserProfile | null>) {
      authState.profile = payload;
    },
    updateLoggedInState(authState, { payload }) {
      authState.loggedIn = payload;
    },
    updateBusyState(authState, { payload }) {
      authState.busy = payload;
    },
  },
});
export const { updateLoggedInState, updateProfile, updateBusyState } =
  slice.actions;

export const getAuthState = createSelector(
  (state: RootState) => state,
  (authState) => authState
);

export default slice.reducer;
