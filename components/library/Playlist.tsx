import { useFetchPlaylist } from "@/hooks/query";
import { FC, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import PlaylistItem from "./components/PlaylistItem";
import CollectionPreviewModal from "../reuseables/CollectionPreviewModal";

interface Props {}

const Playlist: FC<Props> = (props) => {
  const { data, isLoading } = useFetchPlaylist();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.map((playlist: any) => {
        return <PlaylistItem playlist={playlist} key={playlist.id} />;
      })}
      <CollectionPreviewModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "fff",
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
});

export default Playlist;
