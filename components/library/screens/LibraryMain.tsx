import { FC, useEffect, useState } from "react";
import { StatusBar, Text } from "react-native";
import { StyleSheet, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Collections from "@/components/library/Collections";
import Playlist from "@/components/library/Playlist";
import Favorites from "@/components/library/Favorites";
import HistoryT from "@/components/library/History";
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
import { RootState } from "@/utils/store";

interface Props {}

const LibraryMain: FC<Props> = (props) => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" hidden={false} translucent={true} />
      <ProfileComponent />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBarStyles,
          tabBarLabelStyle: styles.tabBarLabelStyles,
        }}
      >
        <Tab.Screen name="Collections" component={Collections} />
        <Tab.Screen name="Playlist" component={Playlist} />
        <Tab.Screen name="Favorites" component={Favorites} />
        <Tab.Screen name="History" component={HistoryT} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  tabBarStyles: {
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

export default LibraryMain;
