import colors from "@/constants/Colors";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  title: string;
}

const EmptyRecords: FC<Props> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    minHeight: 400,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#ccc",
  },
});

export default EmptyRecords;
