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

interface Props {}

const LibraryPage: FC<Props> = (props) => {
  const Tab = createMaterialTopTabNavigator();
  const [profile, setProfile] = useState();
  // const { profile } = useSelector(getAuthState);
  console.log({ profile });
  const dispatch = useDispatch();
  useEffect(() => {
    const initialize = async () => {
      try {
        const client = await getClient();
        const { data } = await client.get("/auth/is-auth");
        if (data) {
          setProfile(data.profile);
        }

        dispatch(updateProfile(data.profile));
      } catch (e) {
        handleError(e);
      }
    };

    initialize();
  }, []);

  return (
    <View style={styles.container}>
      <ProfileComponent profile={profile} />
      <StatusBar barStyle="dark-content" hidden={false} translucent={true} />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBarStyles,
          tabBarLabelStyle: styles.tabBarLabelStyles,
        }}
      >
        <Tab.Screen name="Collections" component={Collections} />
        <Tab.Screen name="Playlist" component={Playlist} />
        <Tab.Screen name="Favorites" component={Favorites} />
        <Tab.Screen name="History" component={History} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 40,
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
