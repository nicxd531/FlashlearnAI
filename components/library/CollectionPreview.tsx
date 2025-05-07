import { AntDesign } from "@expo/vector-icons";
import { FC, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { useSelector } from "react-redux";
import tw from "twrnc";
import { formatRelativeTime } from "../api/request";
import colors from "@/constants/Colors";
import { CollectionData } from "@/@types/collection";
import ToggleBtn from "../reuseables/ToggleBtn";
import FullCardComp from "../reuseables/FullCardComp";
import EmptyRecords from "./components/EmptyRecords";
import CreateModal from "../reuseables/CreateModal";
import { updateCollectionData } from "@/utils/store/Collection";

interface Props {}

const CollectionPreview: FC<Props> = (props) => {
  const { collectionData, collectionId, busyAQuestion } = useSelector(
    (state: {
      collection: {
        collectionData: CollectionData;
        collectionId: string;
        busyAQuestion: boolean;
      };
    }) => state.collection
  );
  // console.log({ collectionData });
  const createdAt = formatRelativeTime(collectionData?.createdAt);
  const updatedAt = formatRelativeTime(collectionData?.updatedAt);
  const [stackStyle, setStackStyle] = useState("default");
  const [visible, setVisible] = useState(false);
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
      <ToggleBtn setStackStyle={setStackStyle} stackStyle={stackStyle} />
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
      {collectionData && (
        <View>
          <View style={tw`p-4 bg-white shadow-md rounded-md mb-4`}>
            <Text style={tw`text-xl font-bold capitalize`}>
              {collectionData?.title}
            </Text>
            <Text variant={"labelLarge"} style={tw`text-base text-gray-600`}>
              description: {collectionData?.description}
            </Text>
            <Text variant={"labelLarge"} style={tw`text-base text-gray-600`}>
              category: {collectionData?.category}
            </Text>
            <Text variant={"labelLarge"} style={tw`text-base text-gray-600`}>
              visibility: {collectionData?.visibility}
            </Text>
            <Text variant={"labelLarge"} style={tw`text-base text-gray-600`}>
              Number of Cards: {collectionData?.cards?.length}
            </Text>
            <Text variant={"labelLarge"} style={tw`text-base text-gray-600`}>
              Number of likes:{" "}
              {collectionData?.likes > 0 ? collectionData?.likes : 0}
            </Text>
            <Text variant={"labelLarge"} style={tw`text-base text-gray-600`}>
              Created Time: {createdAt}
            </Text>
            <Text variant={"labelLarge"} style={tw`text-base text-gray-600`}>
              updated Time: {updatedAt}
            </Text>
          </View>
        </View>
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
