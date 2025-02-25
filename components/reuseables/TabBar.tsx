import { View, Platform, StyleSheet, LayoutChangeEvent } from "react-native";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { Text, PlatformPressable } from "@react-navigation/elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import colors from "@/constants/Colors";
import { create } from "twrnc";
import TabBarButton from "./TabBarButton";
import { useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const [dimensions, setDimensions] = useState({ width: 100, height: 20 });
  const buttonWidth = dimensions.width / state.routes.length;
  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    });
  };
  const tabPositionX = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  return (
    <View onLayout={onTabbarLayout} style={styles.tabBar}>
      <Animated.View
        style={[
          {
            position: "absolute",
            backgroundColor: colors.PRIMARY,
            borderRadius: 30,
            marginHorizontal: 12,
            height: dimensions.height - 15,
            width: buttonWidth - 25,
          },
          animatedStyle,
        ]}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          typeof options.tabBarLabel === "string"
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index, {
            duration: 1500,
          });
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.key}
            route={route}
            isFocused={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
            label={label}
            options={options}
            color={isFocused ? "#673ab7" : "#222"}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  tabBar: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 120,
    paddingVertical: 15,
    borderRadius: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
});
