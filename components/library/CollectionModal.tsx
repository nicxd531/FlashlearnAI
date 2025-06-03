import { flashcardPlaceholder } from "@/constants/Styles";
import { MaterialIcons } from "@expo/vector-icons";
import { FC, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "react-native-elements";
import { ActivityIndicator, Chip, IconButton, Text } from "react-native-paper";
import { formatRelativeTime, getSource } from "../api/request";
import tw from "twrnc";
import { CollectionData } from "@/@types/collection";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import {
  AuthStackParamList,
  libraryNavigatorStackParamList,
} from "@/@types/navigation";
import { useFetchCollectionData } from "./hooks/query";
import PulseAnimationContainer from "../home/reuseables/PulseAnimationContainer";
import EmptyRecords from "./components/EmptyRecords";
import { useDispatch } from "react-redux";
import {
  updateCollectionData,
  updateCollectionId,
} from "@/utils/store/Collection";
import { useQueryClient } from "react-query";
import historyState from "@/utils/store/zustand/useHistory";
import { getClient } from "../api/client";
interface Props {
  CollectionId: string;
}

const CollectionModal: FC<Props> = (props) => {
  const { CollectionId } = props;

  const setCollectionId = historyState((state) => state.setCollectionId);
  setCollectionId(CollectionId);
  const { data, isLoading, refetch } = useFetchCollectionData(CollectionId);
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NavigationProp<libraryNavigatorStackParamList>>();
  const createdAt = formatRelativeTime(data?.createdAt ?? "");
  const dummyData = new Array(4).fill("");
  const handlePlay = async (data: CollectionData, id: string) => {
    dispatch(updateCollectionData(data));
    dispatch(updateCollectionId(id));
    navigation.navigate("collectionPreview");
  };

  if (isLoading)
    return (
      <PulseAnimationContainer>
        <View style={styles.container}>
          <View style={styles.dummyImage} />
          <View style={{ width: "100%", padding: 10 }}>
            <View style={styles.dummyTitleView} />
            <View style={styles.dummyTitleView2} />
            <View style={styles.dummyTopViewContainer}>
              {dummyData.map((_, index) => {
                return <View key={index} style={styles.dummyTopView} />;
              })}
            </View>
          </View>
        </View>
      </PulseAnimationContainer>
    );
  if (!data || data == undefined)
    return <EmptyRecords title={"Collection Not Found!"} />;
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{
          width: 390,
          height: 250,
          borderRadius: 15,
          justifyContent: "center",
          alignItems: "center",
        }}
        source={
          data?.poster ? { uri: data?.poster?.url } : flashcardPlaceholder
        }
        imageStyle={{ borderRadius: 15 }}
      >
        {!data && (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={{ position: "absolute" }}
          />
        )}
      </ImageBackground>
      <View style={styles.semiContainer}>
        <Text style={[tw`font-bold mt-4`]} variant="headlineLarge">
          {data?.title ?? "Untitled"}
        </Text>
        <View style={[tw`justify-between flex-row mt-2 `]}>
          <Chip style={tw`self-start`} textStyle={styles.chipContent}>
            {data?.category}
          </Chip>
          <TouchableOpacity onPress={() => handlePlay(data, data.id)}>
            <IconButton
              icon={() => (
                <MaterialIcons
                  name="play-circle-outline"
                  size={35}
                  color="#00000"
                />
              )}
              iconColor={"#0000"}
              size={20}
            />
          </TouchableOpacity>
        </View>
        <Text>{createdAt}</Text>
        <Text style={[tw`mt-4`]}>{data?.description}</Text>
        <View style={[tw`  flex-row mt-4`]}>
          <Text style={[tw`font-bold  mr-7`]} variant="titleMedium">
            Number of Cards:
          </Text>
          <Text variant="titleMedium">{data?.cards?.length}</Text>
        </View>
        <View style={[tw`  flex-row mt-4`]}>
          <Text style={[tw`font-bold  mr-7`]} variant="titleMedium">
            Author:
          </Text>
          <Text variant="titleMedium">{data?.owner?.name ?? "Unknown"}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 5,
  },
  semiContainer: {
    width: "100%",
    padding: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  pullBar: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 2.5,
    alignSelf: "center",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
  },
  chipContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  dummyTitleView: {
    height: 30,
    width: 150,
    backgroundColor: "#ccc",
    marginBottom: 10,
    borderRadius: 16,
  },
  dummyTopView: {
    height: 30,
    width: 350,
    backgroundColor: "#ccc",
    marginRight: 10,
    borderRadius: 16,
    marginTop: 10,
  },
  dummyTopViewContainer: {
    flexDirection: "column",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  optionLabel: { fontSize: 16, marginLeft: 5 },
  dummyImage: {
    width: 390,
    height: 250,
    borderRadius: 15,
    backgroundColor: "#ccc",
    marginTop: 30,
  },
  dummyTitleView2: {
    height: 30,
    width: 75,
    backgroundColor: "#ccc",
    marginBottom: 10,
    borderRadius: 16,
  },
});

export default CollectionModal;
