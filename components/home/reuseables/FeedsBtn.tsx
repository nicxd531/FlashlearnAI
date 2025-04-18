import { getClient } from "@/components/api/client";
import { handleError } from "@/components/api/request";
import { handleLikeCollection } from "@/hooks/query";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { FC, useState } from "react";
import { GestureResponderEvent } from "react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton, MD3Colors } from "react-native-paper";
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
  const { data } = useFetchHasUserLiked(collectionId);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedCollection, setSelectedCollection] =
    useState<RecentlyPlayedData>();
  const queryClient = useQueryClient();
  const likeMutation = useMutation({
    mutationFn: async (id) => toggleLike(id),
    onMutate: (id: string) => {
      queryClient.setQueryData<boolean>(
        ["fetchHasUserLiked", id],
        (oldData) => !oldData
      );
    },
  });
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
            onPress={() => console.log("Pressed")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <IconButton
            icon={() => (
              <MaterialCommunityIcons
                name={data ? "bookmark-remove" : "bookmark-plus-outline"}
                size={25}
                color="#00000"
              />
            )}
            iconColor={MD3Colors.error50}
            size={20}
            onPress={() => console.log("Pressed")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <IconButton
            icon={() => (
              <MaterialIcons name="playlist-add" size={25} color="#00000" />
            )}
            iconColor={"#0000"}
            size={20}
            onPress={() => console.log("Pressed")}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  actions: {},
});

export default FeedsBtn;
