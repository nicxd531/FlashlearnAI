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
      points: cardsData.points
      });

      
      const { data: lastHistory } = await client.get(`/history/lastHistory/${data[0].collectionId}`)
console.log("durationInSeconds", cardsData.durationInSeconds)
const res ={
        historyId: lastHistory.historyId,
        collectionId:data[0].collectionId,
        cards:cardsData.cards ,
        correctCards:cardsData.correctCards,
        progress: cardsData.progress,
        owner:cardsData.owner,
        durationInSeconds: cardsData.durationInSeconds,
        points: cardsData.points,
      }
     
      const { data: data2 } = await client.patch("/cardData/", res)
     console.log(data2)
   
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




 export  const calculatePerformance = (
  correctCardsLength: number,
  cardsLength: number,
  timeUsed: number,
  totalAvailableTime: number,
  points: number,
  totalPossiblePoints: number
): number => {
  // Calculate the percentage of correct cards
  const correctCardsPercentage = (correctCardsLength / cardsLength) * 100;

  // Calculate the percentage of time used
  const timeUsedPercentage = (timeUsed / totalAvailableTime) * 100;

  // Calculate the percentage of points gained
  const pointsPercentage = (points / totalPossiblePoints) * 100;

  // Calculate an overall performance score by averaging the individual percentages
  const overallPerformance =
    (correctCardsPercentage + (100 - timeUsedPercentage) + pointsPercentage) /
    3;
if(correctCardsLength === 0 && cardsLength === 0) return 0;
if(correctCardsLength === 0)return 0 // Avoid division by zero
  return overallPerformance;
};