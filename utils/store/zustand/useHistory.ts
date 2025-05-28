import { HistoryT } from "@/@types/collection";
import { create } from "zustand";

interface AnotherState {
  collectionId: string;
  historyId: string;
  historyData: HistoryT;
  durationInSeconds: number; // Duration in seconds
  points: number; // Duration in seconds
  progress: number; // Duration in seconds
  correctCards: String[]; // Duration in seconds
  owner: String; // Duration in seconds
  setCollectionId: (collectionId: string) => void; // Sets collectionId to the provided string
  setHistoryId: (historyId: string) => void; // Sets historyId to the provided string
  setHistoryData: (historyData: HistoryT) => void; // Sets historyId to the provided string
  setDurationInSeconds: (durationInSeconds: number) => void; // Sets historyId to the provided string
  setPoints: (points: number) => void; // Sets historyId to the provided string
  setProgress: (progress: number) => void; // Sets historyId to the provided string
  setCorrectCards: (cards: string[]) => void; // Sets historyId to the provided string
  setOwner: (owner: string) => void; // Sets historyId to the provided string
}

const historyState = create<AnotherState>((set) => ({
  collectionId: "",
  historyId: "",
  historyData: {} as HistoryT,
  durationInSeconds: 0, // Initialize durationInSeconds to 0
  points: 0, // Initialize durationInSeconds to 0
  progress: 0, // Initialize durationInSeconds to 0
  correctCards: [], // Initialize durationInSeconds to 0
  owner : "", // Initialize durationInSeconds to 0
  setCollectionId: (collectionId: string) => set({ collectionId }), // Sets collectionId to the provided string
  setHistoryId: (historyId: string) => set({ historyId }), // Sets historyId to the provided string
  setHistoryData: (historyData: HistoryT) => set({ historyData }), // Sets historyId to the provided string
  setDurationInSeconds: (durationInSeconds: number) => set({ durationInSeconds }), // Sets historyId to the provided string
  setPoints: (points: number) => set({ points }), // Sets historyId to the provided string
  setProgress: (progress: number) => set({ progress }), // Sets historyId to the provided string
  setCorrectCards: (correctCards: string[]) => set({ correctCards }), // Sets historyId to the provided string
  setOwner: (owner: string) => set({ owner }), // Sets historyId to the provided string
}));

export default historyState;
