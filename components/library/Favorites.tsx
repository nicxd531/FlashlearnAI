import {
  CollectionData,
  Playlist,
  RecentlyPlayedData,
} from "@/@types/collection";
import { FC, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import CollectionListItem from "./components/CollectionListItem";
import CollectionListLoadingUi from "./components/CollectionListLoadingUi";
import { useFavorites, useFetchPlaylist } from "@/hooks/query";
import PlaylistModal from "../home/reuseables/PlaylistModal";
import PlaylistForm from "../home/reuseables/PlaylistForm";
import AppModal from "../reuseables/AppModal";
import CollectionModal from "./CollectionModal";
import {
  HandleOnFavoritePress,
  HandleOnPlaylistPress,
  handlePlaylistSubmit,
  updatePlaylist,
} from "../home/hook/request";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import OptionsModal from "../home/reuseables/OptionsModal";
import { useQueryClient } from "react-query";
import EmptyRecords from "./components/EmptyRecords";
import PaginatedList from "../reuseables/PaginatedList";

interface Props {}

const Favorites: FC<Props> = (props) => {
  const [showOptions, setShowOptions] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [showPlayListForm, setShowPlayListForm] = useState(false);
  const [collectionId, setCollectionId] = useState<string>();
  const [selectedCollection, setSelectedCollection] =
    useState<CollectionData>();
  const queryClient = useQueryClient();
  const { data, isLoading } = useFavorites();
  const { data: data2, isLoading: loading2 } = useFetchPlaylist();
  if (isLoading) return <CollectionListLoadingUi />;
  if (!data || data == undefined) return null;

  const closePlayerModal = () => {
    setModalVisible(false);
  };
  const onLongPress = (mainData: CollectionData) => {
    console.log("here there");
    setShowOptions(true);
    setSelectedCollection(mainData);
  };
  const handlePress = (userId: string) => {
    setModalVisible(true);
    setCollectionId(userId);
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <PaginatedList
      data={data}
      renderItem={({ item }: { item: CollectionData }) => {
        return (
          <CollectionListItem
            key={item.id}
            collection={item}
            onPress={handlePress}
            onLongPress={() => onLongPress(item)}
          />
        );
      }}
      ListEmptyComponent={() => (
        <EmptyRecords title="No favorites found! 😔" />
      )}
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
                  setSelectedCollection,
                  queryClient
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
    backgroundColor: "fff",
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  optionLabel: { fontSize: 16, marginLeft: 5 },
});

export default Favorites;
