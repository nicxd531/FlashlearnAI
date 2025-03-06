import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {}

const CardsPreview: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text>CardsPreview</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CardsPreview;
