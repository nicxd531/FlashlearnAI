import colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { FC } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { string } from "yup";

interface Props {
  title: string;
  onPress?(): void;
  busy?: boolean;
}

const AppButton: FC<Props> = ({ onPress, title, busy }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, defaultStyles.pillButton]}
    >
      {!busy ? (
        <Text style={styles.title}>{title}</Text>
      ) : (
        <ActivityIndicator size="large" color={colors.SECONDARY} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 45,
    backgroundColor: colors.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    shadowColor: "#000", // Shadow for depth
    shadowOffset: { width: 0, height: 5 }, // Position of shadow
    shadowOpacity: 0.3, // Shadow transparency
    shadowRadius: 8, // Blurriness of shadow
    elevation: 10, // Shadow on Android
  },
  title: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default AppButton;
