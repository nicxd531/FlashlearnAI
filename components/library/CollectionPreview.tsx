import { AntDesign } from "@expo/vector-icons";
import { FC, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import tw from "twrnc";
import ToggleBtn from "../reuseables/ToggleBtn";
import FullCardComp from "../reuseables/FullCardComp";
import EmptyRecords from "./components/EmptyRecords";
import { fetchCardsData, useFetchCollectionData } from "./hooks/query";
import CollectionPreviewDetails from "./components/CollectionPreviewDetails";
import PreviousCardsData from "./components/PreviousCardsData";
import Time from "./components/Time";
import historyState from "@/utils/store/zustand/useHistory";

interface Props { }

const CollectionPreview: FC<Props> = (props) => {
  const historyId = historyState((state) => state.historyId);
  const setCollectionId = historyState((state) => state.setCollectionId);



  const { collectionId } = useSelector(
    (state: {
      collection: {
        collectionId: string;
        history: string;
      };
    }) => state.collection
  );
  if (!collectionId) {
    setCollectionId(collectionId)
  }
  console.log("collectionId", collectionId);
  if (collectionId && historyId) {
    fetchCardsData(collectionId, historyId).then(({ data }) => {
      console.log("data", data);
    });
  }
  const { data: collectionData, isLoading } =
    useFetchCollectionData(collectionId);
  const [stackStyle, setStackStyle] = useState("default");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const calculateProgress = (
    currentCardIndex: number,
    totalCards: number
  ): number => {
    if (totalCards === 0) return 0; // Avoid division by zero
    return currentCardIndex / totalCards;
  };
  const progress = calculateProgress(
    currentIndex + 1,
    collectionData?.cards?.length ?? 0
  );

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.heading]}>
        <Text style={[tw`font-bold `]} variant="titleLarge">
          FlashCards
        </Text>
      </View>
      <View style={tw`flex-row flex-1 justify-between  items-center  p-10`}>

        <Time isActive />
        <ToggleBtn setStackStyle={setStackStyle} stackStyle={stackStyle} />
      </View>
      {(collectionData?.cards?.length ?? 0) > 0 ? (
        <FullCardComp
          stackStyle={stackStyle}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          data={
            Array.isArray(collectionData?.cards) ? collectionData.cards : []
          }
          progress={progress}
        />
      ) : (
        <EmptyRecords title={"no card available for display 😔"} />
      )}
      <Divider horizontalInset />
      {historyId !== "" && historyId && <PreviousCardsData />}
      {collectionData && (
        <CollectionPreviewDetails collectionData={collectionData} />

      )}
      <View style={{ marginBottom: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 350,
    minHeight: 500,
    backgroundColor: "#fff",
  },
  heading: {
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 40,
    flexDirection: "row",
  },
  counter: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default CollectionPreview;
