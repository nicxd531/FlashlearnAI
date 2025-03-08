import { Tabs, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { BackHandler, Platform } from "react-native";

import { useColorScheme } from "@/hooks/useColorScheme";
import { TabBar } from "@/components/reuseables/TabBar";
import { getFromAsyncStorage, Keys } from "@/utils/asyncStorage";
import { handleError } from "@/components/api/request";
import {
  getAuthState,
  updateLoggedInState,
  updateProfile,
} from "@/utils/store/auth";
import { useDispatch, useSelector } from "react-redux";
import { getClient } from "@/components/api/client";
import { NavigationProp } from "@react-navigation/native";
import { AuthStackParamList } from "@/@types/navigation";
import { RootState } from "@/utils/store";
import { Toasts } from "@backpackapp-io/react-native-toast";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const { profile } = useSelector((state: RootState) => (state as any).auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const initialize = async () => {
      try {
        const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
        const client = await getClient();
        const { data } = await client.get("/auth/is-auth");
        dispatch(updateProfile(data.profile));
        // Simulate loading or initialization logic
        if (!token) {
          navigation.navigate<any>("(auth)"); // Navigate to the main screen or auth flow
        }
      } catch (e) {
        handleError(e);
      }
    };
    initialize();
  }, [navigation]);

  return (
    <>
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
      <Toasts
        overrideDarkMode={true}
        globalAnimationType="spring"
        globalAnimationConfig={{
          duration: 1000,
          flingPositionReturnDuration: 200,
          stiffness: 50,
        }}
      />
    </>
  );
}
