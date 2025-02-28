import { Tabs, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { BackHandler, Platform } from "react-native";

import { useColorScheme } from "@/hooks/useColorScheme";
import { TabBar } from "@/components/reuseables/TabBar";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        BackHandler.exitApp(); // Close app if on Home
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Cleanup
  }, [navigation]);

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        animation: "shift",
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="HomePage"
        options={{ title: "Home", headerShown: false }}
      />
      <Tabs.Screen
        name="CreatePage"
        options={{ title: "Create", headerShown: false }}
      />
      <Tabs.Screen
        name="LibraryPage"
        options={{ title: "Library", headerShown: false }}
      />
    </Tabs>
  );
}
