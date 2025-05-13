import { HistoryT } from "@/@types/collection";
import { create } from "zustand";

interface AnotherState {
  collectionId: string;
  historyId: string;
  historyData: HistoryT;
  setCollectionId: (collectionId: string) => void; // Sets collectionId to the provided string
  setHistoryId: (historyId: string) => void; // Sets historyId to the provided string
  setHistoryData: (historyData: HistoryT) => void; // Sets historyId to the provided string
}

const historyState = create<AnotherState>((set) => ({
  collectionId: "",
  historyId: "",
  historyData: {} as HistoryT,
  setCollectionId: (collectionId: string) => set({ collectionId }), // Sets collectionId to the provided string
  setHistoryId: (historyId: string) => set({ historyId }), // Sets historyId to the provided string
  setHistoryData: (historyData: HistoryT) => set({ historyData }), // Sets historyId to the provided string
}));

export default historyState;
