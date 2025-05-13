import { CollectionData } from "@/@types/collection";
import { FC, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CollectionListItem from "./components/CollectionListItem";
import CollectionListLoadingUi from "./components/CollectionListLoadingUi";
import { useFavorites, useFetchPlaylist } from "@/hooks/query";
import PlaylistModal from "../home/reuseables/PlaylistModal";
import PlaylistForm from "../home/reuseables/PlaylistForm";
import AppModal from "../reuseables/AppModal";
import CollectionModal from "./CollectionModal";
import {
  HandleOnPlaylistPress,
  HandleOnRemoveFav,
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
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
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
    setShowOptions(true);
    setSelectedCollection(mainData);
  };
  const handlePress = (id: string) => {
    setModalVisible(true);
    setCollectionId(id);
  };
  let pageNo;
  const handleOnRefresh = () => {
    pageNo = 0;
    setHasMore(true);
    queryClient.invalidateQueries({
      queryKey: ["favorites"],
    });
  };
 

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <PaginatedList
        data={data}
        renderItem={({ item }: { item: CollectionData }) => {
          return (
            <CollectionListItem
              key={item.id}
              collection={item as any}
              onPress={handlePress}
              onLongPress={() => onLongPress(item)}
            />
          );
        }}
        ListEmptyComponent={() => (
          <EmptyRecords title="No favorites found! 😔" />
        )}
        onRefresh={handleOnRefresh}
        numColumns={true}
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
            title: "remove from favorite",
            icon: "close",
            onPress: () =>
              HandleOnRemoveFav(
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
        {collectionId && <CollectionModal CollectionId={collectionId} />}
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
