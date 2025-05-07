import { getClient } from "@/components/api/client";
import { handleError } from "@/components/api/request";
import {
  handleLikeCollection,
  useFavorites,
  useFetchPlaylist,
  useIsFavorite,
} from "@/hooks/query";
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { FC, useState } from "react";
import { GestureResponderEvent, Pressable } from "react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton, MD3Colors, Text } from "react-native-paper";
import { useMutation, useQueryClient } from "react-query";
import tw from "twrnc";
import { useFetchHasUserLiked } from "../hook/query";
import { CollectionData, RecentlyPlayedData } from "@/@types/collection";
import { useDispatch } from "react-redux";
import {
  updateCollectionData,
  updateCollectionId,
} from "@/utils/store/Collection";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { libraryNavigatorStackParamList } from "@/@types/navigation";
import AppModal from "@/components/reuseables/AppModal";
import EmptyRecords from "@/components/library/components/EmptyRecords";
import OptionsModal from "./OptionsModal";
import {
  HandleOnFavoritePress,
  HandleOnPlaylistPress,
  updatePlaylist,
} from "../hook/request";
import PlaylistModal from "./PlaylistModal";
interface Props {
  onOpen: (event: GestureResponderEvent) => void;
  collectionId: string;
  setLikes: (likes: number) => void;
  likes: number;
  collectionData: CollectionData;
}

const FeedsBtn: FC<Props> = (props) => {
  const navigation =
    useNavigation<NavigationProp<libraryNavigatorStackParamList>>();
  const { onOpen, collectionId, likes, setLikes, collectionData } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [toggleComments, setToggleComments] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [showPlayListForm, setShowPlayListForm] = useState(false);
  const { data } = useFetchHasUserLiked(collectionId);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedCollection, setSelectedCollection] =
    useState<RecentlyPlayedData>();
  const queryClient = useQueryClient();
  const { data: data3, isLoading: loading3 } = useFetchPlaylist();
  const { data: data2, isLoading: isLoading2 } = useFavorites();
  const likeMutation = useMutation({
    mutationFn: async (id) => toggleLike(id),
    onMutate: (id: string) => {
      queryClient.setQueryData<boolean>(
        ["fetchHasUserLiked", id],
        (oldData) => !oldData
      );
    },
  });
  const { data: isFav, isLoading: isLoadingFav } = useIsFavorite(collectionId);
  const onPress = (mainData: RecentlyPlayedData) => {
    setShowOptions(true);
    setSelectedCollection(mainData);
  };
  const toggleLike = async (id: string) => {
    try {
      if (!id) return;
      const client = await getClient();
      const res = await client.post(`collection/${id}/like`);
      queryClient.invalidateQueries({ queryKey: ["fetchHasUserLiked", id] });
      queryClient.invalidateQueries({ queryKey: ["fetchLikes", id] });
    } catch (err) {
      handleError(err);
    }
  };
  const isFavMutation = useMutation({
    mutationFn: async (id) => toggleIsFav(id),
    onMutate: (id: string) => {
      queryClient.setQueryData<boolean>(
        ["isFavorites", id],
        (oldData) => !oldData
      );
    },
  });
  const toggleIsFav = async (id: string) => {
    try {
      if (!id) return;
      const client = await getClient();
      const res = await client.post("/favorite?collectionId=" + id);
      queryClient.invalidateQueries({ queryKey: ["isFavorites", id] });
    } catch (err) {
      handleError(err);
    }
  };
  const closePlayerModal = () => {
    setModalVisible(false);
  };
  const onLongPress = (mainData: RecentlyPlayedData) => {
    setShowOptions(true);
    setSelectedCollection(mainData);
  };
  const dispatch = useDispatch();
  const handlePlay = (data: CollectionData, id: string) => {
    console.log("here");
    dispatch(updateCollectionData(data));
    dispatch(updateCollectionId(id));
    navigation.navigate("collectionPreview");
  };
  const handlePress = async () => {
    setModalVisible(true);
  };
  return (
    <View style={[tw`flex-row justify-between`, styles.container]}>
      <View style={[tw`flex-row`, styles.container]}>
        <TouchableOpacity>
          <IconButton
            icon={() => (
              <Ionicons
                name={data ? "heart" : "heart-outline"}
                size={25}
                color="#00000"
              />
            )}
            iconColor={MD3Colors.error50}
            size={20}
            onPress={() => likeMutation.mutate(collectionId)}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <IconButton
            icon={() => (
              <Ionicons name="chatbubble-ellipses" size={25} color="#00000" />
            )}
            iconColor={MD3Colors.error50}
            size={20}
            onPress={() => handlePress()}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <IconButton
            icon={() => (
              <MaterialCommunityIcons
                name={isFav ? "bookmark-remove" : "bookmark-plus-outline"}
                size={25}
                color="#00000"
              />
            )}
            iconColor={MD3Colors.error50}
            size={20}
            onPress={() => isFavMutation.mutate(collectionId)}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <IconButton
            icon={() => (
              <MaterialIcons name="playlist-add" size={25} color="#00000" />
            )}
            iconColor={"#0000"}
            size={20}
            onPress={() => onPress(collectionData as RecentlyPlayedData)}
          />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => handlePlay(collectionData, collectionId)}
        >
          <IconButton
            onPress={() => handlePlay(collectionData, collectionId)}
            icon={() => (
              <MaterialIcons
                name="play-circle-outline"
                size={25}
                color="#00000"
              />
            )}
            iconColor={"#0000"}
            size={20}
          />
        </TouchableOpacity>
      </View>
      <AppModal
        animation
        visible={modalVisible}
        onRequestClose={closePlayerModal}
      >
        <View style={tw`flex-1 w-100 bg-red-100 h-100`}>
          <EmptyRecords title="comments coming Soon!!!" />
        </View>
      </AppModal>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  actions: {},
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  optionLabel: { fontSize: 16, marginLeft: 5 },
});

export default FeedsBtn;
