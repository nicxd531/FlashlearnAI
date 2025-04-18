import { useFetchPlaylist } from "@/hooks/query";
import { FC, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import PlaylistItem from "./components/PlaylistItem";
import CollectionPreviewModal from "../reuseables/CollectionPreviewModal";
import EmptyRecords from "./components/EmptyRecords";
import PaginatedList from "../reuseables/PaginatedList";

interface Props {}

const Playlist: FC<Props> = (props) => {
  const { data, isLoading } = useFetchPlaylist();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <PaginatedList
        data={data}
        renderItem={({ item }: { item: any }) => {
          return (
            <PlaylistItem
              onPress={() =>
                Alert.alert(
                  "Show modal",
                  "Are you sure you want to delete this item?",
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"), // Make sure this is a valid function
                      style: "cancel",
                    },
                    {
                      text: "Delete",
                      onPress: () => console.log("Delete Pressed"), // Make sure this is a valid function
                      style: "destructive",
                    },
                  ],
                  { cancelable: false }
                )
              }
              playlist={item}
              key={item.id}
              //  onLongPress={handleOnLongPress(item)}
            />
          );
        }}
        ListEmptyComponent={() => (
          <EmptyRecords title="No playlist found! 😔" />
        )}
      />
      <CollectionPreviewModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        data={data}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
    // marginTop: 10,
  },
});

export default Playlist;
