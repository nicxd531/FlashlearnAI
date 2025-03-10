import {
  CollectionData,
  Playlist,
  RecentlyPlayedData,
} from "@/@types/collection";
import { FC, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  GestureResponderEvent,
} from "react-native";
import CollectionListItem from "./components/CollectionListItem";
import CollectionPreviewModal from "../reuseables/CollectionPreviewModal";
import EmptyRecords from "./components/EmptyRecords";
import CollectionListLoadingUi from "./components/CollectionListLoadingUi";
import { useFavorites } from "@/hooks/query";
import PlaylistModal from "../home/reuseables/PlaylistModal";
import PlaylistForm from "../home/reuseables/PlaylistForm";
import { getClient } from "../api/client";
import { handleError } from "../api/request";
import { toast } from "@backpackapp-io/react-native-toast";
import AppModal from "../reuseables/AppModal";
import CollectionModal from "./CollectionModal";
import { handlePlaylistSubmit, updatePlaylist } from "../home/hook/request";

interface Props {}

const Favorites: FC<Props> = (props) => {
  const [showOptions, setShowOptions] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [showPlayListForm, setShowPlayListForm] = useState(false);
  const [collectionId, setCollectionId] = useState<string>();
  const [selectedCollection, setSelectedCollection] =
    useState<CollectionData>();
  const { data, isLoading } = useFavorites();
  if (isLoading) return <CollectionListLoadingUi />;
  if (!data || data == undefined)
    return <EmptyRecords title="There is no Favorite Collection! 😔" />;

  const closePlayerModal = () => {
    setModalVisible(false);
  };
  const onLongPress = (mainData: CollectionData) => {
    setShowOptions(true);
    setSelectedCollection(mainData);
  };
  const handlePress = (userId: string) => {
    setModalVisible(true);
    setCollectionId(userId);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data?.map((item: CollectionData) => {
        return (
          <CollectionListItem
            key={item.id}
            collection={item}
            onPress={handlePress}
            onLongPress={() => onLongPress(item)}
          />
        );
      })}

      <PlaylistModal
        list={data || []}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "fff",
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
});

export default Favorites;
