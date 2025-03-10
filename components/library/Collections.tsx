import {
  useFetchCollectionsByProfile,
  useFetchUploadsByProfile,
} from "@/hooks/query";
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
import { CollectionData } from "@/@types/collection";
import { Image } from "react-native-elements";
import { getSource } from "../api/request";
import { flashcardPlaceholder } from "@/constants/Styles";
import colors from "@/constants/Colors";
import CollectionListItem from "./components/CollectionListItem";
import CollectionListLoadingUi from "./components/CollectionListLoadingUi";
import EmptyRecords from "./components/EmptyRecords";
import { useDispatch,  } from "react-redux";
import { handleCreateErrors } from "../create/hooks/request";
import AppModal from "../reuseables/AppModal";
import CollectionModal from "./CollectionModal";

interface Props {}

const Collections: FC<Props> = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [userId, setUserId] = useState<string>("");
  const closePlayerModal = () => {
    setModalVisible(false);
  };
  const { data, isLoading } = useFetchUploadsByProfile();
  if (isLoading) return <CollectionListLoadingUi />;

  if (!data?.length) return <EmptyRecords title="There is no Collection! 😔" />;
  const dispatch = useDispatch();
  const handlePress = async (id: string) => {
    try {
      setUserId(id);
      setModalVisible(true);
    } catch (err) {
      handleCreateErrors(err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data?.map((item: CollectionData) => {
        return (
          <CollectionListItem
            key={item.id}
            collection={item}
            onPress={() => handlePress(item.id)}
          />
        );
      })}
      {data?.length % 2 !== 0 && <View style={{ width: "48%" }} />}
      <AppModal
        animation
        visible={modalVisible}
        onRequestClose={closePlayerModal}
      >
        {userId && <CollectionModal userId={userId} />}
      </AppModal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-start", // Changed to flex-start
    alignItems: "flex-start", // Add this line
    marginTop: 15,
  },
});

export default Collections;
