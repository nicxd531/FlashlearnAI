import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  GestureResponderEvent,
  Pressable,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { Avatar, Card, IconButton, Title } from "react-native-paper";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { backgroundImage, faceImage } from "@/constants/Styles";
import tw from "twrnc";
import { Image } from "react-native-elements";
import PulseAnimationContainer from "./PulseAnimationContainer";
import {
  useFetchPlaylist,
  useFetchRecentlyPlayed,
  useFetchTopCreators,
  useSuggestedCollections,
} from "@/hooks/query";
import {
  CollectionData,
  Playlist,
  RecentlyPlayedData,
  topCreatorsData,
} from "@/@types/collection";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getClient } from "@/components/api/client";
import { handleError } from "@/components/api/request";
import PlaylistModal from "./PlaylistModal";
import PlaylistForm from "./PlaylistForm";
import OptionsModal from "./OptionsModal";
import { toast } from "@backpackapp-io/react-native-toast";
import CollectionPreviewModal from "@/components/reuseables/CollectionPreviewModal";
import AppModal from "@/components/reuseables/AppModal";
import CollectionModal from "@/components/library/CollectionModal";
import {
  HandleOnFavoritePress,
  HandleOnPlaylistPress,
  handlePlaylistSubmit,
  updatePlaylist,
} from "../hook/request";

const { width } = Dimensions.get("window");
interface Props {
  onOpen: (event: GestureResponderEvent) => void;
}

const RecentlyPlayed: React.FC<Props> = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [collectionId, setCollectionId] = useState<string>("");
  const closePlayerModal = () => {
    setModalVisible(false);
  };
  const [showOptions, setShowOptions] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [showPlayListForm, setShowPlayListForm] = useState(false);
  const [selectedCollection, setSelectedCollection] =
    useState<RecentlyPlayedData>();
  const { onOpen } = props;
  const { data = [], isLoading: loading1 } = useFetchRecentlyPlayed();
  const { data: data3, isLoading } = useFetchPlaylist();
  const { data: data2, isLoading: loading2 } = useSuggestedCollections();
  const mainData = data.length > 0 ? data : data2;
  const onLongPress = (mainData: RecentlyPlayedData) => {
    setShowOptions(true);
    setSelectedCollection(mainData);
  };
  const onPress = (userId: string) => {
    setModalVisible(true);
    setCollectionId(userId);
  };

  const renderItem = ({
    item,
  }: {
    item: {
      id: string;
      title: string;
      poster: string;
      owner: { avatar: string };
    };
  }) => (
    <Card
      onLongPress={() => onLongPress(item)}
      key={item.id}
      style={styles.card}
      onPress={() => onPress(item.id)}
    >
      <Image
        PlaceholderContent={<ActivityIndicator />}
        source={{ uri: item?.poster }}
        style={styles.poster}
      />
      <Card.Content>
        <Title
          style={[
            styles.title,
            tw``,
            { fontWeight: "bold", fontSize: 16, marginTop: 15 },
          ]}
        >
          {item.title}
        </Title>
      </Card.Content>
      <View style={styles.avatarContainer}>
        <Avatar.Image
          size={50}
          source={{
            uri: item?.owner?.avatar,
          }}
        />
      </View>
    </Card>
  );

  const dummyData = new Array(4).fill("");
  if (loading1 || loading2) {
    return (
      <PulseAnimationContainer>
        <View style={styles.container}>
          <View style={styles.dummyTitleView} />
          <View style={styles.dummyTopViewContainer}>
            {dummyData.map((_, index) => {
              return <View key={index} style={styles.dummyTopView} />;
            })}
          </View>
        </View>
      </PulseAnimationContainer>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>
          {data.length > 0 ? "Recently Played" : "Suggested Collection"}
        </Text>
      </View>
      <Carousel
        data={mainData}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width * 0.6}
        inactiveSlideScale={0.9}
        inactiveSlideOpacity={1}
        loop={false}
        autoplay={false}
        containerCustomStyle={styles.carouselContainer}
        contentContainerCustomStyle={styles.carouselContentContainer}
      />
      <OptionsModal
        visible={showOptions}
        onRequestClose={() => setShowOptions(false)}
        options={[
          {
            title: "Add to playlist",
            icon: "playlist-music",
            onPress: () =>
              HandleOnPlaylistPress(setShowOptions, setShowPlaylistModal),
          },
          {
            title: "Add to favorite",
            icon: "cards-heart",
            onPress: () =>
              HandleOnFavoritePress(
                selectedCollection,
                setShowOptions,
                setSelectedCollection
              ),
          },
        ]}
        renderItem={(item) => {
          return (
            <Pressable onPress={item.onPress} style={styles.optionContainer}>
              <MaterialCommunityIcons
                name={item.icon as any}
                size={24}
                color="black"
              />
              <Text style={styles.optionLabel}>{item.title}</Text>
            </Pressable>
          );
        }}
      />
      <PlaylistModal
        list={data3 || []}
        onCreateNewPress={() => {
          setShowPlaylistModal(false);
          setShowPlayListForm(true);
        }}
        visible={showPlaylistModal}
        onRequestClose={() => setShowPlaylistModal(false)}
        onPlaylistPress={(item) =>
          updatePlaylist(
            item,
            selectedCollection,
            setShowPlayListForm,
            setShowPlaylistModal,
            setShowOptions,
            setSelectedCollection
          )
        }
      />

      <PlaylistForm
        visible={showPlayListForm}
        onRequestClose={() => {
          setShowPlayListForm(false);
        }}
        onSubmit={(value) => {
          handlePlaylistSubmit(
            value,
            selectedCollection,
            setShowPlayListForm,
            setShowPlaylistModal,
            setShowOptions,
            setSelectedCollection
          );
        }}
      />
      <AppModal
        animation
        visible={modalVisible}
        onRequestClose={closePlayerModal}
      >
        {collectionId && <CollectionModal userId={collectionId} />}
      </AppModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 7,
  },
  textContainer: {
    marginBottom: 16,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    marginHorizontal: 2, // Add horizontal margin to create space between items
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
    width: 250, // Adjust card width to match item width
    position: "relative",
    height: 170,
  },
  poster: {
    width: "100%",
    height: 125,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  carouselContainer: {
    overflow: "visible", // Ensure the carousel items are visible
  },
  carouselContentContainer: {
    paddingHorizontal: 1, // Add padding to the content container
  },
  title: {},
  avatarContainer: {
    position: "absolute",
    top: 95, // Adjusted for smaller size
    left: "15%",
    transform: [{ translateX: -30 }], // Adjusted for smaller size
  },
  dummyTitleView: {
    height: 30,
    width: 150,
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 16,
  },
  dummyTopView: {
    height: 150,
    width: 250,
    backgroundColor: "white",
    marginRight: 10,
    borderRadius: 16,
  },
  dummyTopViewContainer: {
    flexDirection: "row",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  optionLabel: { fontSize: 16, marginLeft: 5 },
});

export default RecentlyPlayed;
