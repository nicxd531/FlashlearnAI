import { FC, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  fetchHistories,
  useFetchCollectionData,
  useFetchHistories,
} from "./hooks/query";
import CollectionListLoadingUi from "./components/CollectionListLoadingUi";
import EmptyRecords from "./components/EmptyRecords";
import { ScrollView } from "react-native";
import colors from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { getClient } from "../api/client";
import { useMutation, useQueryClient } from "react-query";
import { HistoryT, historyCollection } from "@/@types/collection";
import { useNavigation } from "expo-router";
import { fetchFavorites } from "@/hooks/query";
import PulseAnimationContainer from "../home/reuseables/PulseAnimationContainer";
import PaginatedList from "../reuseables/PaginatedList";
import historyState from "@/utils/store/zustand/useHistory";
import { useDispatch } from "react-redux";
import {
  updateCollectionData,
  updateCollectionId,
} from "@/utils/store/Collection";
import { libraryNavigatorStackParamList } from "@/@types/navigation";
import { NavigationProp } from "@react-navigation/native";


interface Props { }

const History: FC<Props> = (props) => {
  const { data, isLoading, isFetching } = useFetchHistories();
  const setCollectionId = historyState((state) => state.setCollectionId);
  const setHistoryId = historyState((state) => state.setHistoryId);
  const historyId = historyState((state) => state.historyId);
  const collectionId = historyState((state) => state.collectionId);

  const [selectedHistories, setSelectedHistories] = useState<string[]>([]);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const navigation =
    useNavigation<NavigationProp<libraryNavigatorStackParamList>>();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const removeMutate = useMutation({
    mutationFn: async (histories) => removeHistories(histories),
    onMutate: (histories: string[]) => {
      queryClient.setQueryData<HistoryT[]>(["histories"], (oldData) => {
        let newData: HistoryT[] = [];
        if (!oldData) return newData;
        for (let data of oldData) {
          const filteredData = data.cardsCollection.filter(
            (item) => !histories.includes(item.id)
          );
          if (filteredData.length) {
            newData.push({ date: data.date, cardsCollection: filteredData });
          }
        }
        return newData;
      });
    },
  });

  const removeHistories = async (histories: string[]) => {
    const client = await getClient();
    client.delete("/history?histories=" + JSON.stringify(histories));
    queryClient.invalidateQueries({
      queryKey: ["histories"],
    });
    queryClient.invalidateQueries({
      queryKey: ["recentlyPlayed"],
    });
  };
  const handleSingleHistoryRemove = async (history: historyCollection) => {
    removeMutate.mutate([history.id]);
    queryClient.invalidateQueries({
      queryKey: ["histories"],
    });
    queryClient.invalidateQueries({
      queryKey: ["recentlyPlayed"],
    });
  };
  const handleOnLongPress = async (history: historyCollection) => {
    setSelectedHistories([history.id]);
  };
  const handleOnPress = async (history: historyCollection) => {
    if (selectedHistories.length == 0) {
      setHistoryId(history.id);
      setCollectionId(history.cardsCollectionId);
      console.log("history", historyId);

      if (!isLoading) {
        dispatch(updateCollectionId(history.cardsCollectionId));
        navigation.navigate("collectionPreview");
      }
      return;
    }
    setSelectedHistories((old) => {
      if (old.includes(history.id)) {
        return old.filter((item) => item !== history.id);
      }
      return [...old, history.id];
    });
  };
  const handleMultipleHistoryRemove = async () => {
    setSelectedHistories([]);
    removeMutate.mutate([...selectedHistories]);
  };

  const unSelectHistories = () => {
    setSelectedHistories([]);
  };
  const handleOnRefresh = () => {
    pageNo = 0;
    setHasMore(true);
    queryClient.invalidateQueries({
      queryKey: ["histories"],
    });
    queryClient.invalidateQueries({
      queryKey: ["recentlyPlayed"],
    });
  };
  let pageNo = 0;

  const HandleOnEndReached = async () => {
    if (!data || !hasMore || isFetching) return;

    setIsFetchingMore(true);
    pageNo += 1;
    const res = await fetchHistories(pageNo);
    if (!res || !res.length) {
      setHasMore(false);
    }
    const newData = [...data, ...res];
    const finalData: HistoryT[] = [];
    const mergedData = newData.reduce((acc, curr) => {
      const foundObj = acc.find((item) => item.date === curr.date);
      if (foundObj) {
        foundObj.cardsCollection = foundObj.cardsCollection.concat(
          curr.cardsCollection
        );
      } else {
        acc.push(curr);
      }
      return acc;
    }, finalData);
    queryClient.setQueriesData(["histories"], mergedData);
    setIsFetchingMore(false);
  };
  useEffect(() => {
    navigation.addListener("blur", unSelectHistories);
    return () => {
      navigation.removeListener("blur", unSelectHistories);
    };
  }, [navigation, unSelectHistories]);
  if (isLoading) return <CollectionListLoadingUi />;
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      {selectedHistories.length ? (
        <Pressable
          onPress={handleMultipleHistoryRemove}
          style={styles.removeBtn}
        >
          <Text style={styles.removeBtnText}>Remove</Text>
        </Pressable>
      ) : null}
      <PaginatedList
        data={data}
        renderItem={({ item }) => {
          return (
            <View key={item.date}>
              <Text style={styles.date}>{item.date}</Text>
              <View style={styles.listContainer}>
                {item.cardsCollection.map((collection, index) => {

                  return (
                    <Pressable
                      onLongPress={() => handleOnLongPress(collection)}
                      onPress={() => handleOnPress(collection)}
                      key={collection.id + index}
                      style={[
                        styles.history,
                        {
                          backgroundColor: selectedHistories.includes(
                            collection.id
                          )
                            ? "grey"
                            : colors.INACTIVE_CONTRAST,
                        },
                      ]}
                    >
                      <Text style={styles.historyTitle}>
                        {collection.title}
                      </Text>
                      <Pressable
                        onPress={() => handleSingleHistoryRemove(collection)}
                      >
                        <AntDesign name="close" />
                      </Pressable>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          );
        }}
        ListEmptyComponent={() => <EmptyRecords title="No history found!" />}
        isFetching={isFetchingMore}
        refreshing={isFetching}
        onRefresh={handleOnRefresh}
        OnEndReached={HandleOnEndReached}
        hasMore={hasMore}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  date: {
    color: colors.SECONDARY,
  },
  historyTitle: {
    paddingHorizontal: 5,
    fontWeight: "700",
    flex: 1,
  },
  history: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.INACTIVE_CONTRAST,
    padding: 10,
    borderRadius: 7,
    marginBottom: 10,
  },
  listContainer: {
    marginTop: 10,
    paddingLeft: 10,
  },
  removeBtn: {
    padding: 10,
    alignSelf: "flex-end",
  },
  removeBtnText: {
    // color: colors.CONTRAST,
  },
});

export default History;
