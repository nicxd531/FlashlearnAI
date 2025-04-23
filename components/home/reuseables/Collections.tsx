
import { FC, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { CollectionData } from "@/@types/collection";
import { Image } from "react-native-elements";
import { flashcardPlaceholder } from "@/constants/Styles";
import colors from "@/constants/Colors";
import { useDispatch } from "react-redux";
import CollectionListLoadingUi from "@/components/library/components/CollectionListLoadingUi";
import EmptyRecords from "@/components/library/components/EmptyRecords";
import { handleCreateErrors } from "@/components/create/hooks/request";
import CollectionListItem from "@/components/library/components/CollectionListItem";
import AppModal from "@/components/reuseables/AppModal";
import CollectionModal from "@/components/library/CollectionModal";
import { useFetchPublicUploads } from "../hook/query";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PublicProfileTabParamsList } from "@/@types/navigation";

type Props = Partial<NativeStackScreenProps<
  PublicProfileTabParamsList,
  "publicCollections"
>> & {
  publicProfileId?: string;
};


const Collections: FC<Props> = (props) => {
  const {publicProfileId}=props
  const { data, isLoading } = useFetchPublicUploads(
    publicProfileId ?? props.route?.params?.profileId ?? ''
  );

  const [modalVisible, setModalVisible] = useState(false);

  const [userId, setUserId] = useState<string>("");
  const closePlayerModal = () => {
    setModalVisible(false);
  };

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
    <View style={styles.container}>
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
        {userId && <CollectionModal CollectionId={userId} />}
      </AppModal>
    </View>
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
