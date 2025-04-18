import { CollectionData, RecentlyPlayedData } from "@/@types/collection";
import colors from "@/constants/Colors";
import { useFetchPlaylist, useFetchRecommendedCollection } from "@/hooks/query";
import { FC, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Image } from "react-native-elements";
import GridView from "./GridView";
import PulseAnimationContainer from "./PulseAnimationContainer";
import AppModal from "@/components/reuseables/AppModal";
import CollectionModal from "@/components/library/CollectionModal";
import PlaylistForm from "./PlaylistForm";
import {
  HandleOnFavoritePress,
  HandleOnPlaylistPress,
  handlePlaylistSubmit,
  updatePlaylist,
} from "../hook/request";
import OptionsModal from "./OptionsModal";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PlaylistModal from "./PlaylistModal";

interface Props {}

const RecommendedCollection: FC<Props> = (props) => {
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
  const { data, isLoading } = useFetchRecommendedCollection();
  const { data: data2, isLoading: isLoading2 } = useFetchPlaylist();
  const onLongPress = (mainData: RecentlyPlayedData) => {
    setShowOptions(true);
    setSelectedCollection(mainData);
  };
  const onPress = (userId: string) => {
    setModalVisible(true);
    setCollectionId(userId);
  };

  const getPoster = (poster?: { url: string; publicId: string }) => {
    return poster?.url
      ? { uri: poster.url }
      : require("../../../assets/images/placeholder.png");
  };
  const dummyData = new Array(6).fill("");
  if (isLoading) {
    return (
      <PulseAnimationContainer>
        <View style={styles.containerLoader}>
          <View style={styles.dunmmyTitleView} />

          <GridView
            col={3}
            data={dummyData}
            renderItem={(item: CollectionData) => {
              return <View style={styles.dummyTopView} />;
            }}
          />
        </View>
      </PulseAnimationContainer>
    );
  }

  return (
    <View style={styles.container}>
      {/* {!data && <ErrorMessage message="Failed to fetch" />} */}
      <Text style={styles.title}>Recommended Collection</Text>
      <GridView
        col={3}
        data={data || []}
        renderItem={(item: CollectionData) => {
          return (
            <Pressable
              onPress={() => onPress(item.id)}
              onLongPress={() => onLongPress(item)}
            >
              <Image
                PlaceholderContent={<ActivityIndicator />}
                source={getPoster(item?.poster)}
                style={styles.poster}
              />
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.collectionTitle}
              >
                {item.title}
              </Text>
            </Pressable>
          );
        }}
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
        list={data2 || []}
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
    padding: 10,
    marginBottom: 150,
  },
  title: {
    // color: colors.INACTIVE_CONTRAST,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  collectionTitle: { fontWeight: "500", fontSize: 16, marginTop: 5 },
  poster: { width: "100%", aspectRatio: 1, borderRadius: 7 },
  dunmmyTitleView: {
    height: 20,
    width: 150,
    backgroundColor: "#d2cfd9",
    marginBottom: 10,
    borderRadius: 16,
  },
  dummyTopView: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#d2cfd9",
    borderRadius: 7,
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
  containerLoader: {
    flex: 1,
    padding: 16,
    marginTop: 2,
  },
});

export default RecommendedCollection;
