import TopAppBar from "@/components/reuseables/TopAppBar";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {}

const CreatePage: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <TopAppBar />
      <Text>create</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CreatePage;
