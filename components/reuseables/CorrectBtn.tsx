import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import { Pressable } from "react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  id: string;
  collectionId: string;
}
interface handleSelectionT {
  collectionId: string;
  id: string;
  type: "correct" | "wrong";
}

type handleSelection = (id: string, type: "correct" | "wrong") => void;
const CorrectBtn: FC<Props> = (props) => {
  const { id, collectionId } = props;
  const handleSelection: handleSelection = (id, type) => {
    if (type == "correct") {
      console.log("correct", id, collectionId);
    }
    if (type == "wrong") {
      console.log("wrong", id, collectionId);
    }
  };
  return (
    <View style={styles.container}>
      {/* X Button */}
      <TouchableOpacity
        onPress={() => handleSelection(id, "wrong")}
        style={[styles.button, styles.redButton]}
      >
        <Ionicons name="close" size={20} color="white" />
      </TouchableOpacity>

      {/* Check Button */}
      <TouchableOpacity
        onPress={() => handleSelection(id, "correct")}
        style={[styles.button, styles.greenButton]}
      >
        <Ionicons name="checkmark" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Align buttons in a row
    gap: 10, // Space between buttons
    alignItems: "center",
    padding: 3,
  },
  button: {
    width: 40, // Circle size
    height: 40, // Circle size
    borderRadius: 20, // Perfect circle
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Shadow effect (Android)
    shadowColor: "#000", // Shadow effect (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  redButton: {
    backgroundColor: "rgba(255, 0, 0, 0.7)", // Semi-transparent red
  },
  greenButton: {
    backgroundColor: "rgba(0, 128, 0, 0.7)", // Semi-transparent green
  },
});

export default CorrectBtn;
