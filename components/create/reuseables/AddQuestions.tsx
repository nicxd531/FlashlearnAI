import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface Props {
  question: { text: string; image: null }[];
  setQuestion: React.Dispatch<
    React.SetStateAction<{ text: string; image: null }[]>
  >;
}

const AddQuestions: FC<Props> = (props) => {
  const { question, setQuestion } = props;

  return (
    <View style={styles.container}>
      <Text>Add Questions</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AddQuestions;
