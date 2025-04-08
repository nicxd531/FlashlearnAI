import {
  homeNavigatorStackParamList,
  homeNavigatorStackParamListMini,
  libraryNavigatorStackParamList,
} from "@/@types/navigation";
import { NavigationProp, useRoute } from "@react-navigation/native";
import { useFocusEffect, useNavigation } from "expo-router";
import { FC, useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useFetchSearchedCategories } from "../hooks/query";
import { ScrollView } from "react-native";
import { SearchBar } from "react-native-elements";
import { CollectionData } from "@/@types/collection";
import CollectionListItem from "../components/CollectionListItem";
import { handleCreateErrors } from "@/components/create/hooks/request";
import AppModal from "@/components/reuseables/AppModal";
import CollectionModal from "../CollectionModal";
import CollectionListLoadingUi from "../components/CollectionListLoadingUi";
import EmptyRecords from "../components/EmptyRecords";

interface Props {}

const CategoriesPreviewPage: FC<Props> = (props) => {
  const [search, setSearch] = useState<string>("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [collectionId, setCollectionId] = useState<string>("");
  const route = useRoute();
  const { category } = route.params as { category: string };
  console.log(category); // Type assertion
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
  console.log(data);
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
        {filteredCategories?.map((item: CollectionData) => {
          return (
            <CollectionListItem
              key={item.id}
              collection={item}
              onPress={() => handlePress(item._id)}
            />
          );
        })}
        <AppModal
          animation
          visible={modalVisible}
          onRequestClose={closePlayerModal}
        >
          {collectionId && <CollectionModal userId={collectionId} />}
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
  },
  containerScroll: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-start", // Changed to flex-start
    alignItems: "flex-start", // Add this line
    marginTop: 15,
  },
});

export default CategoriesPreviewPage;
