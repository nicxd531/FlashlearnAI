import store, { RootState } from "@/utils/store";
import { Toasts } from "@backpackapp-io/react-native-toast";
import { Stack } from "expo-router";
import "react-native-reanimated";
import { Provider, useSelector } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AuthNavigator from "./AuthNavigatioin";
import AllNavigator from "./AllNavigator";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <Toasts
          overrideDarkMode={true}
          globalAnimationType="spring"
          globalAnimationConfig={{
            duration: 1000,
            flingPositionReturnDuration: 200,
            stiffness: 50,
          }}
        />
        <AllNavigator />
      </Provider>
    </GestureHandlerRootView>
  );
}
