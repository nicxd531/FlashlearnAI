import { CollectionData } from "@/@types/collection";
import { FC, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import CollectionListItem from "./components/CollectionListItem";
import CollectionPreviewModal from "../reuseables/CollectionPreviewModal";
import EmptyRecords from "./components/EmptyRecords";
import CollectionListLoadingUi from "./components/CollectionListLoadingUi";
import { useFavorites } from "@/hooks/query";

interface Props {}

const Favorites: FC<Props> = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { data, isLoading } = useFavorites();
  if (isLoading) return <CollectionListLoadingUi />;
  if (!data?.length)
    return <EmptyRecords title="There is no Favorite Collection! 😔" />;

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

      <CollectionPreviewModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "fff",
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
});

export default Favorites;
