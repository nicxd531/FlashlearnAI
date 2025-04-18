import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface Props {
  answer: { text: string; image: null }[];
  setAnswer: React.Dispatch<
    React.SetStateAction<{ text: string; image: null }[]>
  >;
}

const AddAnswers: FC<Props> = (props) => {
  const { answer, setAnswer } = props;

  return (
    <View style={styles.container}>
      <Text>Add Answers</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AddAnswers;
