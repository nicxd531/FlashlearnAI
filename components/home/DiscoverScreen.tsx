import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
// import Feeds from "../Feeds";
import { GestureResponderEvent } from "react-native";
import Feeds from "./reuseables/Feeds";
import { useFetchFeeds } from "@/hooks/query";
import PaginatedList from "../reuseables/PaginatedList";
import EmptyRecords from "../library/components/EmptyRecords";
import { useQueryClient } from "react-query";

interface Props {
  onOpen: (event: GestureResponderEvent) => void;
}
const DiscoverScreen: React.FC<Props> = (props) => {
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  let pageNo = 0;
  const { onOpen } = props;
  const queryClient = useQueryClient();
  const handleOnRefresh = () => {
    pageNo = 0;
    setHasMore(true);
    queryClient.invalidateQueries({
      queryKey: ["feeds"],
    });
  };
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
      CollectionData={item}
    />
  );
  const { data, isLoading, isFetching } = useFetchFeeds();

  return (
    <View style={styles.container}>
      <PaginatedList
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={() => <EmptyRecords title="Feeds not found!!" />}
        isFetching={isFetchingMore}
        refreshing={isFetching}
        onRefresh={handleOnRefresh}
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
