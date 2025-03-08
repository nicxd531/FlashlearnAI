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

interface Props {}

const Collections: FC<Props> = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { data, isLoading } = useFetchUploadsByProfile();
  if (isLoading) return <CollectionListLoadingUi />;
  if (!data?.length) return <EmptyRecords title="There is no Collection! 😔" />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data?.map((item: CollectionData) => {
        return (
          <CollectionListItem
            key={item.id}
            collection={item}
            onPress={() => setModalVisible(true)}
          />
        );
      })}
      {data?.length % 2 !== 0 && <View style={{ width: "48%" }} />}

      <CollectionPreviewModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
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
