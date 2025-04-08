import { RootState } from "@/utils/store";
import { Stack } from "expo-router";
import { FC, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

interface Props {}

const TabNavigator: FC<Props> = (props) => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
});

export default TabNavigator;
