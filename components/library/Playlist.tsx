import { useFetchPlaylist } from "@/hooks/query";
import { FC, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import PlaylistItem from "./components/PlaylistItem";
import CollectionPreviewModal from "../reuseables/CollectionPreviewModal";
import EmptyRecords from "./components/EmptyRecords";

interface Props {}

const Playlist: FC<Props> = (props) => {
  const { data, isLoading } = useFetchPlaylist();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {!data?.length ? <EmptyRecords title="No playlist found!" /> : null}
        {data?.map((playlist: any) => {
          return <PlaylistItem playlist={playlist} key={playlist.id} />;
        })}
        <CollectionPreviewModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          data={data}
        />
      </ScrollView>
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
