import store, { RootState } from "@/utils/store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, useEffect } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import SignUp from "./SignUp";
import Login from "./Login";
import LostPassword from "./LostPassword";
import Verification from "./Verification";
import Index from "./Index";
import { Toasts } from "@backpackapp-io/react-native-toast";
import { useSelector } from "react-redux";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import { AuthStackParamList } from "@/@types/navigation";

interface Props {}

const AuthPage: FC<Props> = (props) => {
  const { loggedIn, busy } = useSelector(
    (state: RootState) => (state as any).auth
  );
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const Stack = createNativeStackNavigator();
  useEffect(() => {
    if (loggedIn) {
      navigation.navigate<any>("(tabs)");
    }
  }, [loggedIn, busy]);
  return (
    <>
      <StatusBar barStyle="light-content" hidden={false} translucent={true} />
      <Stack.Navigator
        initialRouteName="index"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="index" component={Index} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="LostPassword" component={LostPassword} />
      </Stack.Navigator>
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
};

const styles = StyleSheet.create({
  container: {},
});

export default AuthPage;
