import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import collectionReducer from "./Collection";

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  collection: collectionReducer,
});
const store: ReturnType<typeof configureStore> = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
