import { flashcardPlaceholder } from "@/constants/Styles";
import { MaterialIcons } from "@expo/vector-icons";
import { FC } from "react";
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "react-native-elements";
import { ActivityIndicator, Chip, IconButton, Text } from "react-native-paper";

import tw from "twrnc";
import { CollectionData } from "@/@types/collection";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import {
  AuthStackParamList,
  libraryNavigatorStackParamList,
} from "@/@types/navigation";

import { useDispatch } from "react-redux";
import {
  updateCollectionData,
  updateCollectionId,
} from "@/utils/store/Collection";
import PulseAnimationContainer from "@/components/home/reuseables/PulseAnimationContainer";
import EmptyRecords from "./EmptyRecords";
import { formatRelativeTime } from "@/components/api/request";
import { useFetchPlaylistPreview } from "../hooks/query";
import PlaylistLoading from "./PlaylistLoading";
interface Props {
  playlistId: string;
}
const data: any = [];
const PlaylistPreview: FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { playlistId } = props;
  const { data, isLoading } = useFetchPlaylistPreview(playlistId);
  console.log("playlist data", playlistId);
  console.log("data", data);
  const navigation =
    useNavigation<NavigationProp<libraryNavigatorStackParamList>>();
  // const createdAt = formatRelativeTime(data?.createdAt ?? "");
  const dummyData = new Array(6).fill("");
  const handlePlay = (data: CollectionData, id: string) => {
    dispatch(updateCollectionData(data));
    dispatch(updateCollectionId(id));
    navigation.navigate("collectionPreview");
  };
  if (isLoading) return <PlaylistLoading dummyData={dummyData} />;

  if (!data || data == undefined)
    return <EmptyRecords title={"Collection Not Found!"} />;
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
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
  dummyTitleView3: {
    height: 30,
    width: 30,
    backgroundColor: "#ccc",
    marginBottom: 10,
    borderRadius: 30,
  },
  dummyTopView: {
    height: 30,
    width: 380,
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

export default PlaylistPreview;
