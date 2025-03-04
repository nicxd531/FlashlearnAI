import { Tabs, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { BackHandler, Platform } from "react-native";

import { useColorScheme } from "@/hooks/useColorScheme";
import { TabBar } from "@/components/reuseables/TabBar";
import { getFromAsyncStorage, Keys } from "@/utils/asyncStorage";
import { handleError } from "@/components/api/request";
import { updateLoggedInState, updateProfile } from "@/utils/store/auth";
import { useDispatch } from "react-redux";
import { getClient } from "@/components/api/client";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const navigation = useNavigation();

  const dispatch = useDispatch();
  useEffect(() => {
    const initialize = async () => {
      try {
        const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
        const client = await getClient();
        const { data } = await client.get("/auth/is-auth");

        dispatch(updateProfile(data.profile));
        dispatch(updateLoggedInState(true));
        if (token && data) {
          navigation.navigate("(tabs)"); // Navigate to the main screen or auth flow
        }
        // Simulate loading or initialization logic
        if (!token) {
          const timeout = setTimeout(() => {
            navigation.navigate("(auth)"); // Navigate to the main screen or auth flow
          }, 2000); // 2 seconds delay

          return () => clearTimeout(timeout); // Cleanup timeout on unmount
        }
      } catch (e) {
        handleError(e);
      }
    };

    initialize();
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
