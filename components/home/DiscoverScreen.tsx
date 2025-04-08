import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
// import Feeds from "../Feeds";
import { GestureResponderEvent } from "react-native";
import Feeds from "./reuseables/Feeds";
import { useFetchFeeds } from "@/hooks/query";

interface Props {
  onOpen: (event: GestureResponderEvent) => void;
}
const DiscoverScreen: React.FC<Props> = (props) => {
  const { onOpen } = props;
  const renderItem = ({ item }: { item: (typeof data)[0] }) => (
    <Feeds
      onOpen={onOpen}
      image={item.poster}
      avatar={item.owner.avatar}
      name={item.owner.name}
      info={item.description}
      time={item.createdAt}
      likes={item.likes}
      bookmarks={item.bookmarks}
      collectionId={item.id}
    />
  );
  const { data, isLoading } = useFetchFeeds();

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
  },
  listContent: {
    padding: 16,
  },
});

export default DiscoverScreen;
