import { getClient } from "@/components/api/client";
import { handleLikeCollection } from "@/hooks/query";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { FC, useState } from "react";
import { GestureResponderEvent } from "react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton, MD3Colors } from "react-native-paper";
import tw from "twrnc";
interface Props {
  onOpen: (event: GestureResponderEvent) => void;
  collectionId: string;
  setLikes: (likes: number) => void;
  likes: number;
}

const FeedsBtn: FC<Props> = (props) => {
  const { onOpen, collectionId, likes, setLikes } = props;

  const [isLiked, setIsLiked] = useState(likes);
  const handleLikePress = async (collectionId: string) => {
    try {
      const client = await getClient();
      const { data } = await client.post(`/collection/${collectionId}/like`); // Call your API function
      console.log({ data });
      if (data) {
        setIsLiked(data.liked);
        setLikes(data.liked ? likes + 1 : likes - 1);
      }
    } catch (error) {
      console.error("Error liking collection:", error);
      // Handle error appropriately (e.g., show an alert)
    }
  };
  return (
    <View style={[tw`flex-row justify-between`, styles.container]}>
      <View style={[tw`flex-row`, styles.container]}>
        <TouchableOpacity>
          <IconButton
            icon={() => (
              <Ionicons
                onPress={() => handleLikePress(collectionId)}
                name={isLiked ? "heart" : "heart-outline"}
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
