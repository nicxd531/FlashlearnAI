import { useFetchPlaylist } from "@/hooks/query";
import { FC, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import PlaylistItem from "./components/PlaylistItem";
import CollectionPreviewModal from "../reuseables/CollectionPreviewModal";
import EmptyRecords from "./components/EmptyRecords";
import PaginatedList from "../reuseables/PaginatedList";
import PlaylistPreviewModal from "./components/PlaylistPreview";
import AppModal from "../reuseables/AppModal";
import CollectionModal from "./CollectionModal";
import PlaylistPreview from "./components/PlaylistPreview";
import { Feather } from "@expo/vector-icons";
import OptionsModal from "../home/reuseables/OptionsModal";
import { useQueryClient } from "react-query";
import { getClient } from "../api/client";
import { handleCreateErrors } from "../create/hooks/request";
import { toast } from "@backpackapp-io/react-native-toast";
import { Playlist as playlistT } from "@/@types/collection";

interface Props {}

const Playlist: FC<Props> = (props) => {
  const { data, isLoading } = useFetchPlaylist();
  const [modalVisible, setModalVisible] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [playlistId, setPlaylistId] = useState<string>("");
   const onLongPress = (mainData: playlistT) => {
      setShowOptions(true);
      setPlaylistId(mainData.id);
    };
  const closePlayerModal = () => {
    setModalVisible(false);
  };
  const queryClient = useQueryClient();
  const handleDelete = async () => {
      const client = await getClient();
      try {
        // const { data } = await client.delete(`/collection/${playlistId}`);
        // queryClient.invalidateQueries({ queryKey: ["uploads-by-profile"] });
        setShowOptions(false);
        toast.success("Playlist deleted successfully!");
      } catch (err) {
        handleCreateErrors(err);
      }
    };
     const handleEdit = (id: string) => {
       
      };
  return (
    <View style={{ backgroundColor: "#fff", flex: 1, }}>
      <PaginatedList
        data={data}
        renderItem={({ item }: { item: any }) => {
          return (
            <PlaylistItem
            onLongPress={() => onLongPress(item)}
              onPress={() => {
                setPlaylistId(item.id);
                setModalVisible(true);
              }}
              playlist={item}
              key={item.id}
              //  onLongPress={handleOnLongPress(item)}
            />
          );
        }}
        ListEmptyComponent={() => (
          <EmptyRecords title="No playlist found! 😔" />
        )}
        numColumns={true}
      />
      {data?.length % 2 !== 0 && <View style={{ width: "48%" }} />}
      <OptionsModal
        visible={showOptions}
        onRequestClose={() => setShowOptions(false)}
        options={[
          {
            title: "Delete",
            icon: "trash",
            onPress: handleDelete,
          },
          {
            title: "Edit",
            icon: "edit-3",
            onPress: () => handleEdit(playlistId),
          },
        ]}
        renderItem={(item) => {
          return (
            <Pressable onPress={item.onPress} style={styles.optionContainer}>
              <Feather
                name={item.icon as any}
                size={24}
                color={item.title == "Delete" ? "red" : "black"}
              />
              <Text
                style={[
                  styles.optionLabel,
                  { color: item.title == "Delete" ? "red" : "black" },
                ]}
              >
                {item.title}
              </Text>
            </Pressable>
          );
        }}
      />
      <AppModal
        animation
        visible={modalVisible}
        onRequestClose={closePlayerModal}
      >
        {playlistId && <PlaylistPreview playlistId={playlistId} />}
      </AppModal>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  optionLabel: { fontSize: 16, marginLeft: 5 },
});

export default Playlist;
