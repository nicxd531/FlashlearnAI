import { flashcardPlaceholder } from "@/constants/Styles";
import { MaterialIcons } from "@expo/vector-icons";
import { FC, useEffect } from "react";
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "react-native-elements";
import { ActivityIndicator, Chip, IconButton, Text } from "react-native-paper";

import tw from "twrnc";
import { CollectionData, Playlist } from "@/@types/collection";
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
import { useFetchSinglePlaylist } from "@/hooks/query";
import { useFetchCollectionData } from "../hooks/query";
import PlaylistImage from "./PlaylistImage";
import PlaylistCollection from "./PlaylistCollection";
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

interface Props {
  playlistId: string;
}
const data: any = [];
const PlaylistPreview: FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { playlistId } = props;
  const { data, isLoading } = useFetchSinglePlaylist(playlistId) as {
    data: Playlist | undefined;
    isLoading: boolean;
  };
  const navigation =
    useNavigation<NavigationProp<libraryNavigatorStackParamList>>();
  const createdAt = formatRelativeTime(data?.createdAt ?? "");
  const dummyData = new Array(4).fill("");
  const handlePlay = (data: CollectionData, id: string) => {
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
  const Header = (
    <>
      <PlaylistImage id={data?.main} />
      <View style={[styles.semiContainer, tw`ml-4`]}>
        <Text variant="titleLarge">List of collections </Text>
      </View>
    </>
  );
  const renderItem =({ item, index }: { item: CollectionData; index: number }) => (
<Swipeable
renderRightActions={(progress,dragX) => {
  //  
return<View style={{flex:1}}>
  <Text>Removing..</Text>
</View>
}}
>
  <PlaylistCollection
    index={index}
    handlePlay={handlePlay}
    item={item}
    key={index}/>
</Swipeable>
  )
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={Header}
        keyExtractor={(item, index) => index.toString()}
        data={data?.collection}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  semiContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    marginTop: 20,
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
    alignItems: "center",
    flexDirection: "row",
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

export default PlaylistPreview;
