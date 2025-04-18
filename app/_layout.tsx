import store, { RootState } from "@/utils/store";
import { Toasts } from "@backpackapp-io/react-native-toast";
import { Stack } from "expo-router";
import "react-native-reanimated";
import { Provider, useSelector } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AllNavigator from "./AllNavigator";
import { QueryClient, QueryClientProvider } from "react-query";

export default function RootLayout() {
  const queryClient = new QueryClient();
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "fff" }}>
      <Toasts
        overrideDarkMode={true}
        globalAnimationType="spring"
        globalAnimationConfig={{
          duration: 3000,
          flingPositionReturnDuration: 200,
          stiffness: 50,
        }}
      />
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AllNavigator />
        </QueryClientProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
