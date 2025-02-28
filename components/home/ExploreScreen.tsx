import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { GestureResponderEvent } from "react-native";
import Advert from "./reuseables/Advert";
import RecentlyPlayed from "./reuseables/RecentlyPlayed";

import Categories from "./reuseables/Categories";
import Favorites from "./reuseables/Favorites";
interface Props {
  onOpen: (event: GestureResponderEvent) => void;
}
const ExploreScreen: FC<Props> = (props) => {
  const { onOpen } = props;
  return (
    <View style={styles.container}>
      <Advert />
      <RecentlyPlayed onOpen={onOpen} />
      <Favorites />
      <Categories />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
});

export default ExploreScreen;
