import { Link, RelativePathString } from "expo-router";
import { FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface Props {
  title: string;
  onPress?(): void;
  active?: boolean;
}

const AppLink: FC<Props> = ({ title, onPress, active = true }) => {
  return (
    <Pressable
      onPress={active ? onPress : null}
      style={{ opacity: active ? 1 : 0.4 }}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  title: {},
});

export default AppLink;
