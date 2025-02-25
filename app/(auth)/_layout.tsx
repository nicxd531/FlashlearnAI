import store from "@/utils/store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import SignUp from "./SignUp";
import Login from "./Login";
import LostPassword from "./LostPassword";
import Verification from "./Verification";
import Index from "./Index";

interface Props {}

const AuthPage: FC<Props> = (props) => {
  const Stack = createNativeStackNavigator();

  return (
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
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AuthPage;
