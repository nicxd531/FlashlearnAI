import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {}

const ManualCardsCreation: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text>ManualCardsCreation</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ManualCardsCreation;
