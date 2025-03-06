import { AuthStackParamList } from "@/@types/navigation";
import client, { getClient } from "@/components/api/client";
import { handleError } from "@/components/api/request";
import colors from "@/constants/Colors";
import { getFromAsyncStorage, Keys } from "@/utils/asyncStorage";
import {
  getAuthState,
  updateLoggedInState,
  updateProfile,
} from "@/utils/store/auth";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { FC, useEffect } from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

interface Props {}

const Index: FC<Props> = (props) => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const dispatch = useDispatch();
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
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" hidden={true} translucent={true} />
      <Image
        style={[styles.image]}
        source={require("../assets/images/IntroPage.jpg")}
      />
      <View style={styles.iconContainer}>
        <Image
          style={{ width: 150, height: 150 }}
          source={require("../assets/images/appicon.png")}
        />
        <View>
          <Text style={styles.subText}>Welcome to FlashLearn</Text>
          <ActivityIndicator size="large" color={colors.PRIMARY} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  subText: {
    fontSize: 23,
    color: "#333",
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default Index;
