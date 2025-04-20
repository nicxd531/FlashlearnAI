import { FC } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import CardComponent from "./CardComponent";

interface Props {
  answer: { text: string; image: string | null }[];
  setAnswer: React.Dispatch<
    React.SetStateAction<{ text: string; image: string | null }[]>
  >;
}

const AddAnswers: FC<Props> = (props) => {
  const { answer, setAnswer } = props;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {answer?.map((_, index) => (
        <CardComponent
          data={answer}
          setData={setAnswer}
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
export default AddAnswers;
