import { FC, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CollectionPreviewModal from "../reuseables/CollectionPreviewModal";
import { CollectionData, RecentlyPlayedData } from "@/@types/collection";
import { Image } from "react-native-elements";
import { getSource, handleError } from "../api/request";
import { flashcardPlaceholder } from "@/constants/Styles";
import colors from "@/constants/Colors";
import CollectionListItem from "./components/CollectionListItem";
import CollectionListLoadingUi from "./components/CollectionListLoadingUi";
import EmptyRecords from "./components/EmptyRecords";
import { useDispatch } from "react-redux";
import { handleCreateErrors } from "../create/hooks/request";
import AppModal from "../reuseables/AppModal";
import CollectionModal from "./CollectionModal";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import OptionsModal from "../home/reuseables/OptionsModal";
import { HandleOnPlaylistPress } from "../home/hook/request";
import {
  useFetchDeleteCollection,
  useFetchUploadsByProfile,
} from "./hooks/query";
import { useQueryClient } from "react-query";
import { getClient } from "../api/client";
import PaginatedList from "../reuseables/PaginatedList";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import { createNavigatorStackParamList } from "@/@types/navigation";
import {
  updateCreatedCollectionData,
  updateCreatedCollectionId,
} from "@/utils/store/Collection";
import { toast } from "@backpackapp-io/react-native-toast";

interface Props {}

const Collections: FC<Props> = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [collectionId, setCollectionId] = useState<string>("");
  const [selectedCollection, setSelectedCollection] =
    useState<RecentlyPlayedData>();
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<any>>();
  const queryClient = useQueryClient();
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const closePlayerModal = () => {
    setModalVisible(false);
  };
  const { data, isLoading } = useFetchUploadsByProfile();
  if (isLoading) return <CollectionListLoadingUi />;

  const handlePress = async (id: string) => {
    try {
      setCollectionId(id);
      setModalVisible(true);
    } catch (err) {
      handleCreateErrors(err);
    }
  };
  const onLongPress = (mainData: RecentlyPlayedData) => {
    setShowOptions(true);
    setSelectedCollection(mainData);
    setCollectionId(mainData.id);
  };
  const handleDelete = async () => {
    const client = await getClient();
    try {
      const { data } = await client.delete(`/collection/${collectionId}`);
      queryClient.invalidateQueries({ queryKey: ["uploads-by-profile"] });
      toast.success("Collection deleted successfully!");
      setShowOptions(false);
    } catch (err) {
      handleCreateErrors(err);
    }
  };
  const handleEdit = (id: string) => {
    dispatch(updateCreatedCollectionId(id));
    dispatch(updateCreatedCollectionData(selectedCollection));
    navigation.navigate("CreatePage");
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <PaginatedList
        data={data}
        renderItem={({ item }: { item: RecentlyPlayedData }) => {
          return (
            <CollectionListItem
              key={item.id}
              collection={item}
              onPress={() => handlePress(item.id)}
              onLongPress={() => onLongPress(item)}
            />
          );
        }}
        ListEmptyComponent={() => (
          <EmptyRecords title="There is no Collection! 😔" />
        )}
        numColumns={true}
      />

      {data?.length % 2 !== 0 && <View style={{ width: "48%" }} />}

      <OptionsModal
        visible={showOptions}
        onRequestClose={() => setShowOptions(false)}
        options={[
          {
            title: "Delete",
            icon: "trash",
            onPress: handleDelete,
          },
          {
            title: "Edit",
            icon: "edit-3",
            onPress: () => handleEdit(collectionId),
          },
        ]}
        renderItem={(item) => {
          return (
            <Pressable onPress={item.onPress} style={styles.optionContainer}>
              <Feather
                name={item.icon as any}
                size={24}
                color={item.title == "Delete" ? "red" : "black"}
              />
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
      <AppModal
        animation
        visible={modalVisible}
        onRequestClose={closePlayerModal}
      >
        {collectionId && <CollectionModal CollectionId={collectionId} />}
      </AppModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  optionLabel: { fontSize: 16, marginLeft: 5 },
});

export default Collections;
