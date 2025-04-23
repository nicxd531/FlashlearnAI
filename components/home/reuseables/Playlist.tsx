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


type Props = Partial<NativeStackScreenProps<
  PublicProfileTabParamsList,
  "publicPlaylist"
>> & {
  publicProfileId?: string;
};
const Playlist: FC<Props> = (props) => {
  const {publicProfileId}=props
  const { data, isLoading } = useFetchPublicPlaylist(
    publicProfileId ?? props.route?.params?.profileId ?? ''
  );

  const [modalVisible, setModalVisible] = useState(false);
  if (isLoading) return <CollectionListLoadingUi />;
  return (
    <View style={styles.container}>
      <View style={{flex:1, flexDirection: "row", flexWrap: "wrap" ,justifyContent:"space-between",paddingHorizontal:10}}>

      {data?.map((playlist: any) => {
        return <PlaylistItem playlist={playlist} key={playlist.id} />;
      })}
      </View>
      <CollectionPreviewModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        data={data}
        />
        {!data.length &&<View style={{flex:1,width:"100%",backgroundColor:"blue"}}><EmptyRecords title="There is no Playlist! 😔" /></View> }
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
