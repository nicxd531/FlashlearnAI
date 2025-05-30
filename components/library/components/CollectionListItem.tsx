import { CollectionData, RecentlyPlayedData } from "@/@types/collection";
import { getSource } from "@/components/api/request";
import CollectionPreviewModal from "@/components/reuseables/CollectionPreviewModal";
import colors from "@/constants/Colors";
import { flashcardPlaceholder } from "@/constants/Styles";
import { FC, useState } from "react";
import { ActivityIndicator } from "react-native";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Image } from "react-native-elements";

interface Props {
  collection: RecentlyPlayedData;
  onPress(id: string): void;
  onLongPress?(collection: RecentlyPlayedData): void;
}

const CollectionListItem: FC<Props> = (props) => {
  const { collection, onPress, onLongPress } = props;
  const poster =
    typeof collection?.poster === "string"
      ? collection?.poster
      : collection?.poster?.url;

  return (
    <Pressable
      onPress={() => onPress(collection.id)}
      onLongPress={onLongPress ? () => onLongPress(collection) : undefined}
      style={styles.listItem}
      key={collection.id}
    >
      <Image
        style={styles.poster}
        PlaceholderContent={<ActivityIndicator />}
        source={getSource(poster, flashcardPlaceholder)}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
          {collection.title}
        </Text>
        <Text style={styles.owner} ellipsizeMode="tail" numberOfLines={1}>
          {collection.owner?.name}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: "#fff",
    marginBottom: 15,
    borderRadius: 5,
    width: "45%",
    marginLeft: 15,
  },
});

export default CollectionListItem;
