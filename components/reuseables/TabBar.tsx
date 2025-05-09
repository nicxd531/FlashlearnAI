import React, { useState } from "react";
import {
  View,
  StyleSheet,
  LayoutChangeEvent,
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import colors from "@/constants/Colors";
import TabBarButton from "./TabBarButton";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  Extrapolate,
  Easing,
} from "react-native-reanimated";
import useTabBarStore from "@/utils/store/zustand/useTabBarStore";
 // Import the Zustand store

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

  const scrollY = useTabBarStore((state) => state.scrollY); // Get scrollY from Zustand

  const tabBarHeight = 80; // Adjust to your tab bar height
  const tabBarAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY,
      [-1, tabBarHeight],
      [0, tabBarHeight * 2],
      { extrapolateRight: Extrapolate.CLAMP }
    );
    return {
      transform: [{ translateY: translateY }],
    };
  });

  return (
    <Animated.View
      onLayout={onTabbarLayout}
      style={[styles.tabBar, tabBarAnimatedStyle]}
    >
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
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "grey",
  },
  tabBar: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.99)",
    marginHorizontal: 85,
    paddingVertical: 15,
    borderRadius: 35,
    shadowColor: "#000", // Black shadow for visibility
    shadowOffset: { width: 0, height: 4 }, // Spread downward
    elevation: 5, // Shadow for Android
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
});