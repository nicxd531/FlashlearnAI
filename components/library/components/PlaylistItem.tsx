import { Playlist } from "@/@types/collection";
import { getSource } from "@/components/api/request";
import colors from "@/constants/Colors";
import { playlistPlaceholder } from "@/constants/Styles";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { FC } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Image } from "react-native-elements";

interface Props {
  playlist: Playlist;
  onPress?(): void;
}

const PlaylistItem: FC<Props> = (props) => {
  const { playlist, onPress } = props;
  const { id, itemsCount, title, visibility } = playlist;
  return (
    <Pressable onPress={onPress} style={styles.listItem} key={id}>
      <Image
        style={styles.poster}
        PlaceholderContent={<ActivityIndicator />}
        source={getSource("", playlistPlaceholder)}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.iconContainer}>
          <FontAwesome
            name={visibility === "public" ? "globe" : "lock"}
            size={20}
            color={colors.SECONDARY}
          />
          <Text style={styles.count}>
            {itemsCount} {itemsCount > 1 ? "collections" : "collection"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "fff",
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },

  titleContainer: {
    padding: 5,
  },
  poster: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 15,
  },
  title: {
    fontWeight: "700",
  },
  owner: {
    color: colors.SECONDARY,
    fontWeight: "700",
  },
  listItem: {
    flexDirection: "column",
    // backgroundColor: colors.INACTIVE_CONTRAST,
    marginBottom: 15,
    borderRadius: 5,
    width: "45%",
    padding: 10,
  },
  count: {
    color: colors.SECONDARY,
    fontWeight: "bold",
    marginLeft: 5,
  },
  iconContainer: {
    flexDirection: "row",
    paddingTop: 4,
    alignItems: "center",
  },
});

export default PlaylistItem;
