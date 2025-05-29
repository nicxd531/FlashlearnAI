import { cards, CardsData } from "@/@types/collection";
import { getClient } from "../api/client";
import { handleError } from "../api/request";

export const sendProgressToBackend = async ( data:cards[], queryClient:any,index:number,cardsData:CardsData) => {

    try {
      const client = await getClient();
      const { data: data1 } = await client.post("/history", {
        cardsCollection:data[0].collectionId,
        progress: index,
        date: new Date(Date.now()),
        points: 0,
      });

      
      const { data: lastHistory } = await client.get(`/history/lastHistory/681f6be60b23ba3ac377bd58`)

const res ={
        historyId: lastHistory.historyId,
        collectionId:data[0].collectionId,
        cards:cardsData.cards ,
        correctCards:cardsData.correctCards,
        progress: cardsData.progress,
        owner:cardsData.owner,
      }
     
      const { data: data2 } = await client.patch("/cardData/", res)
   
      queryClient.invalidateQueries({
        queryKey: ["histories"],
      });
      queryClient.invalidateQueries({
        queryKey: ["recentlyPlayed"],
      });
    } catch (error) {
      handleError(error, "Failed to send progress to backend");
      console.error("❌ Error sending progress to backend:", error);
    }
  };