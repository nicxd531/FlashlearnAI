import { CollectionData } from "@/@types/collection";
import { getSource } from "@/components/api/request";
import CollectionPreviewModal from "@/components/reuseables/CollectionPreviewModal";
import colors from "@/constants/Colors";
import { flashcardPlaceholder } from "@/constants/Styles";
import { FC, useState } from "react";
import { ActivityIndicator } from "react-native";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Image } from "react-native-elements";

interface Props {
  collection: CollectionData;
  onPress?(): void;
}

const CollectionListItem: FC<Props> = (props) => {
  const { collection, onPress } = props;

  return (
    <Pressable onPress={onPress} style={styles.listItem} key={collection.id}>
      <Image
        style={styles.poster}
        PlaceholderContent={<ActivityIndicator />}
        source={getSource(collection.poster, flashcardPlaceholder)}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
          {collection.title}
        </Text>
        <Text style={styles.owner} ellipsizeMode="tail" numberOfLines={1}>
          {collection.owner.name}
        </Text>
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
  },
});

export default CollectionListItem;
