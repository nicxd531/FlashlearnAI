import { FC, useEffect, useState } from "react";
import {
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFetchHistories } from "./hooks/query";
import CollectionListLoadingUi from "./components/CollectionListLoadingUi";
import EmptyRecords from "./components/EmptyRecords";
import { ScrollView } from "react-native";
import colors from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { getClient } from "../api/client";
import { useMutation, useQueryClient } from "react-query";
import { HistoryT, historyCollection } from "@/@types/collection";
import { useNavigation } from "expo-router";

interface Props {}

const History: FC<Props> = (props) => {
  const { data, isLoading, isFetching } = useFetchHistories();
  const [selectedHistories, setSelectedHistories] = useState<string[]>([]);

  const navigation = useNavigation();
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
    queryClient.invalidateQueries({
      queryKey: ["histories"],
    });
    queryClient.invalidateQueries({
      queryKey: ["recentlyPlayed"],
    });
  };
  useEffect(() => {
    navigation.addListener("blur", unSelectHistories);
    return () => {
      navigation.removeListener("blur", unSelectHistories);
    };
  }, []);
  if (isLoading) return <CollectionListLoadingUi />;

  const noData = !data?.length;
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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={handleOnRefresh} />
        }
        style={styles.container}
      >
        {noData ? <EmptyRecords title="There is no history!" /> : null}
        {data?.map((item: HistoryT, index) => {
          return (
            <View key={item.date + index}>
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
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  date: {
    color: colors.SECONDARY,
  },
  historyTitle: {
    // color: colors.CONTRAST,
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
