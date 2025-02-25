import { FC, useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text, PlatformPressable } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface Props {
  key: string;
  route: { key: string; name: string; params?: object };
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  label: string;
  options: { tabBarAccessibilityLabel?: string; tabBarButtonTestID?: string };
  color?: string;
}

const TabBarButton: FC<Props> = ({
  key,
  route,
  isFocused,
  onPress,
  onLongPress,
  label,
  options,
  color,
}) => {
  const icon: {
    [key in "LibraryPage" | "CreatePage"]: (props: any) => JSX.Element;
  } = {
    // Home: (props: any) => <Feather name="home" size={24} color="black" />,
    LibraryPage: (props: any) => (
      <Feather name="book-open" size={24} color={props.color} />
    ),
    // Profile: (props: any) => <Feather name="user" size={24} color="black" />,
    CreatePage: (props: any) => (
      <Feather name="plus" size={24} color={props.color} />
    ),
  };

  const scale = useSharedValue(0);
  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 350 }
    );
  }, [scale, isFocused]);
  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);
    return { opacity };
  });
  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
    const top = interpolate(scale.value, [0, 1], [0, 9]);
    return { transform: [{ scale: scaleValue }], top };
  });
  return (
    <Pressable
      key={route.key}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabBarItem}
    >
      <Animated.View style={animatedIconStyle}>
        {icon[route?.name as "LibraryPage" | "CreatePage"]({
          color: isFocused ? "#fff" : "#222",
        })}
      </Animated.View>
      <Animated.Text
        style={[
          { color: isFocused ? "#673ab7" : "#222", fontSize: 12 },
          animatedTextStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {},
  tabBarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    borderRadius: 35,
  },
});

export default TabBarButton;
