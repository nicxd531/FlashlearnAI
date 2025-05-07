import { FC, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { CollectionData, RecentlyPlayedData } from "@/@types/collection";
import { Image } from "react-native-elements";
import { flashcardPlaceholder } from "@/constants/Styles";
import colors from "@/constants/Colors";
import { useDispatch } from "react-redux";
import CollectionListLoadingUi from "@/components/library/components/CollectionListLoadingUi";
import EmptyRecords from "@/components/library/components/EmptyRecords";
import { handleCreateErrors } from "@/components/create/hooks/request";
import CollectionListItem from "@/components/library/components/CollectionListItem";
import AppModal from "@/components/reuseables/AppModal";
import CollectionModal from "@/components/library/CollectionModal";
import { useFetchPublicUploads } from "../hook/query";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PublicProfileTabParamsList } from "@/@types/navigation";
import OptionsModal from "./OptionsModal";
import {
  HandleOnFavoritePress,
  HandleOnPlaylistPress,
  updatePlaylist,
} from "../hook/request";
import { useQueryClient } from "react-query";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import PlaylistModal from "./PlaylistModal";
import { useFetchPlaylist } from "@/hooks/query";

type Props = Partial<
  NativeStackScreenProps<PublicProfileTabParamsList, "publicCollections">
> & {
  publicProfileId?: string;
};

const Collections: FC<Props> = (props) => {
  const { publicProfileId } = props;
  const [showOptions, setShowOptions] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [showPlayListForm, setShowPlayListForm] = useState(false);
  const [collectionId, setCollectionId] = useState<string>("");
  const [selectedCollection, setSelectedCollection] =
    useState<RecentlyPlayedData>();
  const { data, isLoading } = useFetchPublicUploads(
    publicProfileId ?? props.route?.params?.profileId ?? ""
  );
  const { data: data3, isLoading: loading3 } = useFetchPlaylist();
  const [modalVisible, setModalVisible] = useState(false);
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState<string>("");
  const closePlayerModal = () => {
    setModalVisible(false);
  };

  if (isLoading) return <CollectionListLoadingUi />;

  if (!data?.length) return <EmptyRecords title="There is no Collection! 😔" />;
  const dispatch = useDispatch();
  const handlePress = async (id: string) => {
    try {
      setUserId(id);
      setModalVisible(true);
    } catch (err) {
      handleCreateErrors(err);
    }
  };
  const onLongPress = (mainData: RecentlyPlayedData) => {
    setShowOptions(true);
    setSelectedCollection(mainData);
    setCollectionId(mainData.id);
  };
  return (
    <View style={styles.container}>
      {data?.map((item: CollectionData) => {
        return (
          <CollectionListItem
            key={item.id}
            collection={item as RecentlyPlayedData}
            onPress={() => handlePress(item?.id as string)}
            onLongPress={() => onLongPress(item as RecentlyPlayedData)}
          />
        );
      })}
      {data?.length % 2 !== 0 && <View style={{ width: "48%" }} />}
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
              {item.icon == "trash" || item.icon == "edit-3" ? (
                <Feather
                  name={item.icon as any}
                  size={24}
                  color={item.title == "Delete" ? "red" : "black"}
                />
              ) : (
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={24}
                  color="black"
                />
              )}
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
      <PlaylistModal
        list={data3 || []}
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
      <AppModal
        animation
        visible={modalVisible}
        onRequestClose={closePlayerModal}
      >
        {userId && <CollectionModal CollectionId={userId} />}
      </AppModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-start", // Changed to flex-start
    alignItems: "flex-start", // Add this line
    marginTop: 15,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  optionLabel: { fontSize: 16, marginLeft: 5 },
});

export default Collections;
