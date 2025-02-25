import { RootState } from "@/utils/store";
import { FC, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import AuthNavigator from "./AuthNavigatioin";
import TabNavigator from "./TabNavigator";

interface Props {}

const AllNavigator: FC<Props> = (props) => {
  const { loggedIn, busy } = useSelector(
    (state: RootState) => (state as any).auth
  );

  useEffect(() => {
    console.log("AuthNavigator - loggedIn:", loggedIn);
    console.log("AuthNavigator - busy:", busy);
  }, [loggedIn, busy]);
  return true ? <TabNavigator /> : <AuthNavigator />;
};
const styles = StyleSheet.create({
  container: {},
});

export default AllNavigator;
