import React, { FC, useState, useEffect } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import CardsSlider from "../../reuseables/CardsSlider";
import { Surface, Text, ToggleButton } from "react-native-paper";
import tw from "twrnc";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "@/constants/Colors";
import * as Progress from "react-native-progress";
import { toast, Toasts } from "@backpackapp-io/react-native-toast";
import { RootState } from "@/utils/store";
import { useSelector } from "react-redux";
import client from "@/components/api/client";
import axios from "axios";
import { getFromAsyncStorage, Keys } from "@/utils/asyncStorage";
import CreateModal from "@/components/reuseables/CreateModal";
import ToggleBtn from "@/components/reuseables/ToggleBtn";
import FullCardComp from "@/components/reuseables/FullCardComp";
import EmptyRecords from "@/components/library/components/EmptyRecords";
import CardsPreviewList from "../reuseables/CardsPreviewList";
import { formatRelativeTime } from "@/components/api/request";

interface Props {}

const CardsPreview: FC<Props> = (props) => {
  const { createdCollectionId, busyAQuestion, createdCollectionData } =
    useSelector(
      (state: {
        collection: {
          createdCollectionId: string;
          busyAQuestion: boolean;
          createdCollectionData: any;
        };
      }) => state.collection
    );
  const createdAt = formatRelativeTime(createdCollectionData.createdAt);
  const updatedAt = formatRelativeTime(createdCollectionData.updatedAt);
  const [stackStyle, setStackStyle] = React.useState("default");
  const [visible, setVisible] = React.useState(false);
  console.log({ createdCollectionData });
  const onClose = () => {};
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
    createdCollectionData?.cards?.length
  );
  // console.log(collectionData.cards.length);
  return (
    <ScrollView style={styles.container}>
      <View style={[styles.heading]}>
        <Text style={[tw`font-bold `]} variant="titleLarge">
          Add cards
        </Text>
        <TouchableOpacity
          style={{
            borderRadius: 50,
            backgroundColor: colors.PRIMARY,
            padding: 3,
            marginLeft: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setVisible(true);
          }}
        >
          <AntDesign name="plus" color={"#fff"} size={20} />
        </TouchableOpacity>
      </View>
      <CreateModal
        visible={visible}
        onClose={() => setVisible(false)}
        message={" Add Cards panel"}
      />
      <ToggleBtn setStackStyle={setStackStyle} stackStyle={stackStyle} />
      {(createdCollectionData?.cards?.length ?? 0) > 0 ? (
        <FullCardComp
          stackStyle={stackStyle}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          data={
            Array.isArray(createdCollectionData?.cards)
              ? createdCollectionData.cards
              : []
          }
          progress={progress}
        />
      ) : (
        <EmptyRecords title={"no card available for display 😔"} />
      )}
      {(createdCollectionData?.cards?.length ?? 0) > 0 && (
        <View>
          <View style={tw`p-4 bg-white shadow-md rounded-md mb-4`}>
            <Text style={tw`text-xl font-bold`}>
              {createdCollectionData?.title}
            </Text>
            <Text variant={"bodyLarge"} style={tw`text-base text-gray-600`}>
              description: {createdCollectionData?.description}
            </Text>
            <Text variant={"bodyLarge"} style={tw`text-base text-gray-600`}>
              category: {createdCollectionData?.category}
            </Text>
            <Text variant={"bodyLarge"} style={tw`text-base text-gray-600`}>
              visibility: {createdCollectionData?.visibility}
            </Text>
            <Text variant={"bodyLarge"} style={tw`text-base text-gray-600`}>
              Number of Cards: {createdCollectionData?.cards.length}
            </Text>
            <Text variant={"bodyLarge"} style={tw`text-base text-gray-600`}>
              Number of likes: {createdCollectionData?.likes.length}
            </Text>
            <Text variant={"bodyLarge"} style={tw`text-base text-gray-600`}>
              Created Time: {createdAt}
            </Text>
            <Text variant={"bodyLarge"} style={tw`text-base text-gray-600`}>
              updated Time: {updatedAt}
            </Text>
          </View>
        </View>
      )}
      <CardsPreviewList cards={createdCollectionData.cards} />
      <View style={{ marginBottom: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    minWidth: 350,
    minHeight: 500,
  },
  heading: {
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
    flexDirection: "row",
  },
  counter: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default CardsPreview;
