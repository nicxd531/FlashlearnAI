import React, { FC, useRef } from "react";
import { GestureResponderEvent, ImageSourcePropType } from "react-native";
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import {
  Avatar,
  Button,
  IconButton,
  MD3Colors,
  Text,
  TouchableRipple,
} from "react-native-paper";
import FeedsBtn from "./FeedsBtn";
import tw from "twrnc";
import TopNavFeeds from "./TopNavFeeds";
const { width } = Dimensions.get("window");
import { ActivityIndicator } from "react-native";
import { Image } from "react-native-elements";
import FeedDetails from "./FeedDetails";
import { backgroundImage, flashcardPlaceholder } from "@/constants/Styles";
import { getSource } from "@/components/api/request";
import { CollectionData } from "@/@types/collection";

const Feeds: FC<{
  image: string;
  avatar: string;
  name: string;
  info: string;
  collectionId: string;
  time: string;
  bookmarks: number;
  likes: number;
  onOpen: (event: GestureResponderEvent) => void;
  CollectionData: CollectionData;
 
}> = ({
  image,
  avatar,
  name,
  info,
  time,
  onOpen,
  bookmarks,
  likes,
  collectionId,
  CollectionData,

}) => {
 
  return (
    <View
      style={[
        tw`mb-5 flex-column justify-between  p-4`,
        {
          borderRadius: 30,
          overflow: "hidden",
          height: 450,
          backgroundColor: "rgba(224, 224, 224, 0.7)", // Set the background color with opacity
        },
      ]}
    >
      <TopNavFeeds avatar={avatar} name={name} time={time} userId={CollectionData?.owner?.id}/>
      <View style={styles.item}>
        <Image
          style={{ width: 350, height: 200, borderRadius: 8 }}
          source={getSource(image, flashcardPlaceholder)}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>

      <FeedDetails
        onOpen={onOpen}
        name={name}
        likes={likes}
        description={info}
        collectionId={collectionId}
        collectionData={CollectionData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  feedItem: {
    width: width * 0.9, // Adjust width as needed
    height: 500, // Adjust height as needed
    marginVertical: 10,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#f9f9f9",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  actions: {
    top: 100,
    right: 0,
    justifyContent: "space-around",
    position: "absolute",
    backgroundColor: "grey",
    borderRadius: 20,
  },
  actionButton: {
    marginHorizontal: 5,
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Feeds;
