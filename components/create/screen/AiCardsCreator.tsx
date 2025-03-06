import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {}

const AiCardsCreator: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text>AiCardsCreator</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AiCardsCreator;
