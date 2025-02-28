import { FC } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface Props {}

const History: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, color: "black" }}>History </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default History;
