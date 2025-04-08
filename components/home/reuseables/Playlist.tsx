import PlaylistItem from "@/components/library/components/PlaylistItem";
import CollectionPreviewModal from "@/components/reuseables/CollectionPreviewModal";
import { useFetchPlaylist } from "@/hooks/query";
import { FC, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useFetchPublicPlaylist } from "../hook/query";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PublicProfileTabParamsList } from "@/@types/navigation";

type Props = NativeStackScreenProps<
  PublicProfileTabParamsList,
  "publicPlaylist"
>;
const Playlist: FC<Props> = (props) => {
  const { data, isLoading } = useFetchPublicPlaylist(
    props.route.params.profileId
  );

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data?.map((playlist: any) => {
        return <PlaylistItem playlist={playlist} key={playlist.id} />;
      })}
      <CollectionPreviewModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        data={data}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "fff",
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
});

export default Playlist;
