import { FC } from "react";
import { StatusBar, Text } from "react-native";
import { StyleSheet, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Collections from "@/components/library/Collections";
import Playlist from "@/components/library/Playlist";
import Favorites from "@/components/library/Favorites";
import History from "@/components/library/History";
import colors from "@/constants/Colors";

interface Props {}

const LibraryPage: FC<Props> = (props) => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <View style={styles.container}>
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
    paddingTop: 20,
  },
  tabBarStyles: {
    // backgroundColor: "transparent",
    elevation: 0,
    shadowRadius: 0,
    // shadowColor: "transparent",
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
