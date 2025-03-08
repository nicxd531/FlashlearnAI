import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import tw from "twrnc";
import BtnRNPIcon from "./BtnRNPIcon";

interface Props {
  question: string;
  setQuestion: (question: string) => void;
  answer: string;
  setAnswer: (answer: string) => void;
  addQaItem: () => void;
  busyAQuestion: boolean;
}

const AddQuestionInput: FC<Props> = (props) => {
  const { question, setQuestion, answer, setAnswer, addQaItem, busyAQuestion } =
    props;
  return (
    <View style={[tw`w-75`]}>
      <TextInput
        label="Question"
        value={question}
        onChangeText={(question) => setQuestion(question)}
        style={{ backgroundColor: "transparent" }}
      />
      <TextInput
        label="Answer"
        value={answer}
        onChangeText={(answer) => setAnswer(answer)}
        style={{
          backgroundColor: "transparent",
          textAlignVertical: "top",
        }}
        multiline
        textAlignVertical="top"
      />
      <View style={styles.addButton}>
        <BtnRNPIcon
          handleSubmit={addQaItem}
          busyACollection={busyAQuestion}
          title="Add"
          iconName="add"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  addButton: {
    marginTop: 12,
    width: "60%",
    marginHorizontal: "auto",
  },
});

export default AddQuestionInput;
