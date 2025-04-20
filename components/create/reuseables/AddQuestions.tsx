import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import CardComponent from "./CardComponent";
import { ScrollView } from "react-native";

interface Props {
  question: { text: string; image: string | null }[];
  setQuestion: React.Dispatch<
    React.SetStateAction<{ text: string; image: string | null }[]>
  >;
}

const AddQuestions: FC<Props> = (props) => {
  const { question, setQuestion } = props;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {question?.map((_, index) => (
        <CardComponent
          data={question}
          setData={setQuestion}
          index={index}
          key={index}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    paddingBottom: 480,
  },
});

export default AddQuestions;
