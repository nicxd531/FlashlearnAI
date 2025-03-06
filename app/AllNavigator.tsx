import { RootState } from "@/utils/store";
import { FC, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import AuthNavigator from "./AuthNavigatioin";
import TabNavigator from "./TabNavigator";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "@/@types/navigation";

interface Props {}

const AllNavigator: FC<Props> = (props) => {
  const { loggedIn, busy } = useSelector(
    (state: RootState) => (state as any).auth
  );
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  useEffect(() => {
    console.log("AuthNavigator - loggedIn:", loggedIn);
    console.log("AuthNavigator - busy:", busy);
    if (loggedIn) {
      navigation.navigate<any>("(tabs)");
    }
  }, [loggedIn, busy]);
  return true ? <TabNavigator /> : <AuthNavigator />;
};
const styles = StyleSheet.create({
  container: {},
});

export default AllNavigator;
