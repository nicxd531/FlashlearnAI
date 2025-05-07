import PlaylistItem from "@/components/library/components/PlaylistItem";
import CollectionPreviewModal from "@/components/reuseables/CollectionPreviewModal";
import { useFetchPlaylist } from "@/hooks/query";
import { FC, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useFetchPublicPlaylist } from "../hook/query";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PublicProfileTabParamsList } from "@/@types/navigation";
import CollectionListLoadingUi from "@/components/library/components/CollectionListLoadingUi";
import EmptyRecords from "@/components/library/components/EmptyRecords";
import AppModal from "@/components/reuseables/AppModal";
import PlaylistPreview from "@/components/library/components/PlaylistPreview";
import { Playlist as playlistT } from "@/@types/collection";

type Props = Partial<
  NativeStackScreenProps<PublicProfileTabParamsList, "publicPlaylist">
> & {
  publicProfileId?: string;
};
const Playlist: FC<Props> = (props) => {
  const { publicProfileId } = props;
  const { data, isLoading } = useFetchPublicPlaylist(
    publicProfileId ?? props.route?.params?.profileId ?? ""
  );

  const [playlistId, setPlaylistId] = useState<string>("");
  const [showOptions, setShowOptions] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const closePlayerModal = () => {
    setModalVisible(false);
  };
  const onLongPress = (mainData: playlistT) => {
    setPlaylistId(mainData.id);
    console.log(playlistId);
    setShowOptions(true);
  };
  if (isLoading) return <CollectionListLoadingUi />;
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          paddingHorizontal: 10,
        }}
      >
        {data?.map((playlist: any) => {
          return (
            <PlaylistItem
              onPress={() => {
                setPlaylistId(playlist.id);
                setModalVisible(true);
              }}
              onLongPress={() => onLongPress(playlist)}
              playlist={playlist}
              key={playlist.id}
            />
          );
        })}
      </View>
      {!data.length && (
        <View style={{ flex: 1, width: "100%", backgroundColor: "blue" }}>
          <EmptyRecords title="There is no Playlist! 😔" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 15,
    width: "100%",
  },
});

export default Playlist;
