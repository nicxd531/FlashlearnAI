import { FC } from "react";
import {
  FlatList,
  FlatListProps,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PulseAnimationContainer from "../home/reuseables/PulseAnimationContainer";

interface Props<T> {
  data: FlatListProps<T>["data"];
  renderItem: FlatListProps<T>["renderItem"];
  ListEmptyComponent?: FlatListProps<T>["ListEmptyComponent"];
  isFetching?: boolean;
  refreshing?: boolean;
  hasMore?: boolean;
  onRefresh?: () => void;
  OnEndReached?: FlatListProps<T>["onEndReached"];
}

const Footer = (props: { visible?: boolean }) => {
  if (!props.visible) return null;
  return (
    <PulseAnimationContainer>
      <Text style={{ textAlign: "center", padding: 5 }}>Please wait...</Text>
    </PulseAnimationContainer>
  );
};
const PaginatedList = <T extends any>(props: Props<T>) => {
  const {
    data,
    renderItem,
    ListEmptyComponent,
    isFetching,
    refreshing = false,
    onRefresh,
    OnEndReached,
    hasMore,
  } = props;
  return (
    <FlatList
      onEndReached={(info) => {
        if (!hasMore || isFetching) return;
        OnEndReached && OnEndReached(info);
      }}
      ListFooterComponent={<Footer visible={isFetching} />}
      data={data}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={styles.container}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
};
const styles = StyleSheet.create({
  container: {},
});

export default PaginatedList;
