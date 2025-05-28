import { CardsData } from "@/@types/collection";
import { getClient } from "../api/client";

export const sendProgressToBackend = async ( data:CardsData, queryClient:any) => {
    
    try {
      const client = await getClient();
      const { data: data1 } = await client.post("/history", {
        cardsCollection:data.collectionId,
        progress: data.progress,
        date: new Date(Date.now()),
        points: 0,
      });

      const { data: data2 } = await client.post("/cardData/", {
        historyId: data.historyId,
        collectionId:data.collectionId,
        cards:data.cards ,
        correctCards:data,
        progress: data.progress,
        owner:data.owner,
      })
      queryClient.invalidateQueries({
        queryKey: ["histories"],
      });
      queryClient.invalidateQueries({
        queryKey: ["recentlyPlayed"],
      });
    } catch (error) {
      console.error("❌ Network error:", error);
    }
  };