import { AuthStackParamList } from "@/@types/navigation";
import colors from "@/constants/Colors";
import { getFromAsyncStorage, Keys } from "@/utils/asyncStorage";
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

interface Props {}

const Index: FC<Props> = (props) => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  useEffect(() => {
    const initialize = async () => {
      const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
      console.log(token);
      if (token) {
        navigation.navigate("(tabs)"); // Navigate to the main screen or auth flow
      }
      // Simulate loading or initialization logic
      if (!token) {
        const timeout = setTimeout(() => {
          navigation.navigate("(auth)"); // Navigate to the main screen or auth flow
        }, 2000); // 2 seconds delay

        return () => clearTimeout(timeout); // Cleanup timeout on unmount
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
