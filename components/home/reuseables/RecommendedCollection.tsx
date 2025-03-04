import { CollectionData } from "@/@types/collection";
import colors from "@/constants/Colors";
import { useFetchRecommendedCollection } from "@/hooks/query";
import { FC } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Image } from "react-native-elements";
import GridView from "./GridView";
import PulseAnimationContainer from "./PulseAnimationContainer";

interface Props {}

const RecommendedCollection: FC<Props> = (props) => {
  const { data, isLoading } = useFetchRecommendedCollection();
  const onLongPress = (i: CollectionData) => {
    console.log("Long Pressed", i);
  };
  const onPress = (item: CollectionData) => {
    console.log(" Pressed", item);
  };

  const getPoster = (poster?: string) => {
    return poster
      ? { uri: poster }
      : require("../../../assets/images/placeholder.png");
  };
  const dummyData = new Array(6).fill("");
  if (isLoading) {
    return (
      <PulseAnimationContainer>
        <View style={styles.container}>
          <View style={styles.dunmmyTitleView} />

          <GridView
            col={3}
            data={dummyData}
            renderItem={(item: CollectionData) => {
              return <View style={styles.dummyTopView} />;
            }}
          />
        </View>
      </PulseAnimationContainer>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended Collection</Text>
      <GridView
        col={3}
        data={data || []}
        renderItem={(item: CollectionData) => {
          return (
            <Pressable
              onPress={() => onPress(item)}
              onLongPress={() => onLongPress(item)}
            >
              <Image
                PlaceholderContent={<ActivityIndicator />}
                source={getPoster(item.poster)}
                style={styles.poster}
              />
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.collectionTitle}
              >
                {item.title}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 150,
  },
  title: {
    // color: colors.INACTIVE_CONTRAST,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  collectionTitle: { fontWeight: "500", fontSize: 16, marginTop: 5 },
  poster: { width: "100%", aspectRatio: 1, borderRadius: 7 },
  dunmmyTitleView: {
    height: 20,
    width: 150,
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 16,
  },
  dummyTopView: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "white",
    borderRadius: 7,
  },
  dummyTopViewContainer: {
    flexDirection: "row",
  },
});

export default RecommendedCollection;
