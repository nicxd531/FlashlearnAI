import {
  homeNavigatorStackParamList,
  homeNavigatorStackParamListMini,
  libraryNavigatorStackParamList,
} from "@/@types/navigation";
import { NavigationProp, useRoute } from "@react-navigation/native";
import { useFocusEffect, useNavigation } from "expo-router";
import { FC, useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useFetchSearchedCategories } from "../hooks/query";
import { ScrollView } from "react-native";
import { SearchBar } from "react-native-elements";
import { CollectionData, RecentlyPlayedData } from "@/@types/collection";
import CollectionListItem from "../components/CollectionListItem";
import { handleCreateErrors } from "@/components/create/hooks/request";
import AppModal from "@/components/reuseables/AppModal";
import CollectionModal from "../CollectionModal";
import CollectionListLoadingUi from "../components/CollectionListLoadingUi";
import EmptyRecords from "../components/EmptyRecords";
import OptionsModal from "@/components/home/reuseables/OptionsModal";
import {
  HandleOnFavoritePress,
  HandleOnPlaylistPress,
  updatePlaylist,
} from "@/components/home/hook/request";
import { useQueryClient } from "react-query";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "react-native-paper";
import { useFetchPlaylist } from "@/hooks/query";
import PlaylistModal from "@/components/home/reuseables/PlaylistModal";

interface Props {}

const CategoriesPreviewPage: FC<Props> = (props) => {
  const [search, setSearch] = useState<string>("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [collectionId, setCollectionId] = useState<string>("");
  const [showOptions, setShowOptions] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [showPlayListForm, setShowPlayListForm] = useState(false);
  const [selectedCollection, setSelectedCollection] =
    useState<RecentlyPlayedData>();
  const queryClient = useQueryClient();
  const { data: data3, isLoading: loading3 } = useFetchPlaylist();
  const route = useRoute();
  const { category } = route.params as { category: string };
  // Type assertion
  const updateSearch: (text: string) => void = (text) => {
    setSearch(text);
  };
  const closePlayerModal = () => {
    setModalVisible(false);
  };
  const navigation =
    useNavigation<NavigationProp<homeNavigatorStackParamList>>();

  if (!category) navigation.navigate("HomeMain");
  const { data, isLoading, refetch } = useFetchSearchedCategories(category);

  // Filter categories dynamically whenever searchText changes
  const handlePress = async (id: string) => {
    try {
      setCollectionId(id);
      setModalVisible(true);
    } catch (err) {
      handleCreateErrors(err);
    }
  };
  useEffect(() => {
    if (category && data) {
      const filteredData = data.filter((item: CollectionData) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCategories(filteredData);
    }
  }, [search, category, data]);

  if (isLoading)
    return (
      <View style={styles.container}>
        <SearchBar
          platform="default" // Specify the platform
          placeholder="Search"
          onChangeText={(text: string) => console.log("text")}
          value={search}
          containerStyle={{
            backgroundColor: "transparent",
            borderColor: "transparent",
            marginTop: 20,
          }}
          round={true}
          lightTheme={true}
          showLoading={false}
        />
        <CollectionListLoadingUi />;
      </View>
    );
  if (!data || data.length === 0)
    return <EmptyRecords title=" no collections found! 😔" />;
  const onLongPress = (mainData: RecentlyPlayedData) => {
    setShowOptions(true);
    setSelectedCollection(mainData);
    setCollectionId(mainData?._id as any);
  };
  return (
    <View style={styles.container}>
      <SearchBar
        platform="default" // Specify the platform
        placeholder="Search"
        onChangeText={(text: string) => setSearch(text)}
        value={search}
        containerStyle={{
          backgroundColor: "transparent",
          borderColor: "transparent",
          marginTop: 20,
        }}
        round={true}
        lightTheme={true}
        showLoading={false}
      />
      <ScrollView contentContainerStyle={styles.containerScroll}>
        {filteredCategories?.map((item: CollectionData, index) => {
          return (
            <CollectionListItem
              key={item._id + index}
              collection={item as any}
              onPress={() => handlePress(item._id)}
              onLongPress={() => onLongPress(item)}
            />
          );
        })}
        <OptionsModal
          visible={showOptions}
          onRequestClose={() => setShowOptions(false)}
          options={[
            {
              title: "Add to playlist",
              icon: "playlist-music",
              onPress: () =>
                HandleOnPlaylistPress(setShowOptions, setShowPlaylistModal),
            },
            {
              title: "Add to favorite",
              icon: "cards-heart",
              onPress: () =>
                HandleOnFavoritePress(
                  selectedCollection,
                  setShowOptions,
                  setSelectedCollection,
                  queryClient,
                  collectionId
                ),
            },
          ]}
          renderItem={(item) => {
            return (
              <Pressable onPress={item.onPress} style={styles.optionContainer}>
                {item.icon == "trash" || item.icon == "edit-3" ? (
                  <Feather
                    name={item.icon as any}
                    size={24}
                    color={item.title == "Delete" ? "red" : "black"}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name={item.icon as any}
                    size={24}
                    color="black"
                  />
                )}
                <Text
                  style={[
                    styles.optionLabel,
                    { color: item.title == "Delete" ? "red" : "black" },
                  ]}
                >
                  {item.title}
                </Text>
              </Pressable>
            );
          }}
        />
        <PlaylistModal
          list={data3 || []}
          onCreateNewPress={() => {
            setShowPlaylistModal(false);
            setShowPlayListForm(true);
          }}
          visible={showPlaylistModal}
          onRequestClose={() => setShowPlaylistModal(false)}
          onPlaylistPress={(item) =>
            updatePlaylist(
              item,
              selectedCollection,
              setShowPlayListForm,
              setShowPlaylistModal,
              setShowOptions,
              setSelectedCollection,
              collectionId
            )
          }
        />
        <AppModal
          animation
          visible={modalVisible}
          onRequestClose={closePlayerModal}
        >
          {collectionId && <CollectionModal CollectionId={collectionId} />}
        </AppModal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingVertical: 30,
    backgroundColor: "#fff",
  },
  containerScroll: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-start", // Changed to flex-start
    alignItems: "flex-start", // Add this line
    marginTop: 15,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  optionLabel: { fontSize: 16, marginLeft: 5 },
});

export default CategoriesPreviewPage;
