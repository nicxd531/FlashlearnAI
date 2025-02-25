import { FC } from "react";
import { Text } from "react-native";
import { StyleSheet, View } from "react-native";

interface Props {}

const LibraryPage: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text>create</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LibraryPage;
