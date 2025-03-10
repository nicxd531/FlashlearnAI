import { FC, useEffect, useState } from "react";
import { StatusBar, Text } from "react-native";
import { StyleSheet, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Collections from "@/components/library/Collections";
import Playlist from "@/components/library/Playlist";
import Favorites from "@/components/library/Favorites";
import History from "@/components/library/History";
import colors from "@/constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthState,
  updateLoggedInState,
  updateProfile,
} from "@/utils/store/auth";
import ProfileComponent from "@/components/library/ProfileComponent";
import { getFromAsyncStorage, Keys } from "@/utils/asyncStorage";
import { getClient } from "@/components/api/client";
import { handleError } from "@/components/api/request";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LibraryMain from "@/components/library/screens/LibraryMain";
import LibrarySettings from "@/components/library/screens/LibrarySettings";
import CollectionPreview from "@/components/library/CollectionPreview";
import ProfilePreviewPage from "@/components/library/screens/ProfilePreviewPage";
import { NavigationProp, useIsFocused } from "@react-navigation/native";
import { useNavigation } from "expo-router";

interface Props {}
const Stack = createNativeStackNavigator();
const LibraryPage: FC<Props> = (props) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation<NavigationProp<any>>();

  // useEffect(() => {
  //   if (isFocused) {
  //     navigation.navigate("LibraryPage", {
  //       screen: "libraryMain", // Pass any necessary parameters
  //     });
  //   }
  // }, [isFocused, navigation]);
  return (
    <View style={styles.container}>
      <Stack.Navigator
        initialRouteName="libraryMain"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="libraryMain" component={LibraryMain} />
        <Stack.Screen name="librarySettings" component={LibrarySettings} />
        <Stack.Screen name="collectionPreview" component={CollectionPreview} />
        <Stack.Screen
          name="ProfilePreviewPage"
          component={ProfilePreviewPage}
        />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,

    backgroundColor: "#fff",
  },
  tabBarStyles: {
    backgroundColor: "transparent",
    elevation: 0,
    shadowRadius: 0,
    shadowColor: "transparent",
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    // opacity: 0,
  },
  tabBarLabelStyles: {
    // color: colors.CONTRAST,
    fontSize: 12,
  },
});

export default LibraryPage;
