import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { FC } from "react";
import { GestureResponderEvent } from "react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton, MD3Colors } from "react-native-paper";
import tw from "twrnc";
interface Props {
  onOpen: (event: GestureResponderEvent) => void;
}

const FeedsBtn: FC<Props> = (props) => {
  const { onOpen } = props;
  return (
    <View style={[tw`flex-row justify-between`, styles.container]}>
      <View style={[tw`flex-row`, styles.container]}>
        <TouchableOpacity>
          <IconButton
            icon={() => (
              <Ionicons name="heart-outline" size={25} color="#00000" />
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
