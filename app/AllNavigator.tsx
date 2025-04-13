import { RootState } from "@/utils/store";
import { FC, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AuthNavigator from "./AuthNavigatioin";
import TabNavigator from "./TabNavigator";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "@/@types/navigation";
import { getFromAsyncStorage, Keys } from "@/utils/asyncStorage";
import { updateLoggedInState } from "@/utils/store/auth";

import { handleError } from "@/components/api/request";
import { Slot } from "expo-router";

interface Props {}

const AllNavigator: FC<Props> = (props) => {
  const { loggedIn, busy } = useSelector(
    (state: RootState) => (state as any).auth
  );
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  useEffect(() => {
    const initialize = async () => {
      try {
        const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
        if (!token) {
          navigation.navigate<any>("(auth)"); // Navigate to the main screen or auth flow
        }
        if (token) {
          dispatch(updateLoggedInState(true));
          navigation.navigate<any>("(tabs)"); // Navigate to the main screen or auth flow
        }
      } catch (e) {
        handleError(e);
      }
    };

    initialize();
  });

  return <Slot />;

};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default AllNavigator;
