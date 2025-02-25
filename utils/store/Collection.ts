import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { categoriesTypes } from "../Categories";

interface CollectionState {
  busyACollection: boolean;
  busyAQuestion: boolean;
  collectionId?: string;
  collectionData?: {
    _id: string;
    title: string;
    description?: string;
    owner: string;
    poster?: {
      url: string;
      publicId: string;
    };
    likes: string[];
    bookmarks: string[];
    category: categoriesTypes;
    cards: string[];
    correctCards: string[];
    visibility: "private" | "public"; // This defines the accepted values for TypeScript
    createdAt: Date;
  };
}
const initialState: CollectionState = {
  busyACollection: false,
  busyAQuestion: false,
};

const slice = createSlice({
  name: "collectionState",
  initialState,
  reducers: {
    updateBusyStateCollection(collectionState, { payload }) {
      collectionState.busyACollection = payload;
    },
    updateBusyStateQuestion(collectionState, { payload }) {
      collectionState.busyAQuestion = payload;
    },
    updateCollectionId(collectionState, { payload }) {
      collectionState.collectionId = payload;
    },
    updateCollectionData(collectionState, { payload }) {
      collectionState.collectionData = payload;
    },
  },
});
export const {
  updateBusyStateCollection,
  updateCollectionId,
  updateBusyStateQuestion,
  updateCollectionData,
} = slice.actions;

export const getCollectionState = createSelector(
  (state: RootState) => state,
  (collectionState) => collectionState
);

export default slice.reducer;
