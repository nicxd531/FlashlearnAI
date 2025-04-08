import { getClient } from "@/components/api/client";
import { handleError } from "@/components/api/request";
import { handleLikeCollection } from "@/hooks/query";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { FC, useState } from "react";
import { GestureResponderEvent } from "react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton, MD3Colors } from "react-native-paper";
import { useMutation, useQueryClient } from "react-query";
import tw from "twrnc";
import { useFetchHasUserLiked } from "../hook/query";
interface Props {
  onOpen: (event: GestureResponderEvent) => void;
  collectionId: string;
  setLikes: (likes: number) => void;
  likes: number;
}

const FeedsBtn: FC<Props> = (props) => {
  const { onOpen, collectionId, likes, setLikes } = props;
  const { data } = useFetchHasUserLiked(collectionId);

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
      console.log(res.data);
      queryClient.invalidateQueries({ queryKey: ["fetchHasUserLiked",id] });
      queryClient.invalidateQueries({ queryKey: ["fetchLikes",id] });
    } catch (err) {
      handleError(err);
    }
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
              <Ionicons name="library-outline" size={25} color="#00000" />
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
        <TouchableOpacity>
          <IconButton
            icon={() => (
              <MaterialIcons
                name="play-circle-outline"
                size={25}
                color="#00000"
              />
            )}
            iconColor={"#0000"}
            size={20}
            onPress={(event) => onOpen(event)}
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
