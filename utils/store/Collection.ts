import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { categoriesTypes } from "../Categories";
import { topCreatorsData } from "@/@types/collection";

interface CollectionState {
  busyACollection: boolean;
  busyAQuestion: boolean;
  createBusyState: boolean;
  collectionId?: string;
  createdCollectionId?: string;
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
  createdCollectionData?: {
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
  otherProfileData?: topCreatorsData;
}
const initialState: CollectionState = {
  busyACollection: false,
  createBusyState: false,
  busyAQuestion: false,
};

const slice = createSlice({
  name: "collectionState",
  initialState,
  reducers: {
    updateBusyStateCollection(collectionState, { payload }) {
      collectionState.busyACollection = payload;
    },
    updateCreateBusyState(collectionState, { payload }) {
      collectionState.createBusyState = payload;
    },
    updateBusyStateQuestion(collectionState, { payload }) {
      console.log({ payload });
      collectionState.busyAQuestion = payload;
    },
    updateCollectionId(collectionState, { payload }) {
      collectionState.collectionId = payload;
    },
    updateCreatedCollectionId(collectionState, { payload }) {
      collectionState.createdCollectionId = payload;
    },
    updateCollectionData(collectionState, { payload }) {
      collectionState.collectionData = payload;
    },
    updateCreatedCollectionData(collectionState, { payload }) {
      collectionState.createdCollectionData = payload;
    },
    updateOtherProfileData(collectionState, { payload }) {
      collectionState.otherProfileData = payload;
    },
  },
});
export const {
  updateBusyStateCollection,
  updateCollectionId,
  updateBusyStateQuestion,
  updateCollectionData,
  updateCreatedCollectionData,
  updateCreatedCollectionId,
  updateCreateBusyState,
  updateOtherProfileData,
} = slice.actions;

export const getCollectionState = createSelector(
  (state: RootState) => state,
  (collectionState) => collectionState
);

export default slice.reducer;
