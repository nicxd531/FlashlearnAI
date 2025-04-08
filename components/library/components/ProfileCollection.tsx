import { CollectionData } from "@/@types/collection";
import { PublicProfileTabParamsList } from "@/@types/navigation";
import Collections from "@/components/home/reuseables/Collections";
import Playlist from "@/components/home/reuseables/Playlist";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FC } from "react";
import { StatusBar, StyleSheet, View } from "react-native";

interface Props {
  profileId: string;
}

const ProfileCollection: FC<Props> = (props) => {
  const { profileId } = props;
  const Tab = createMaterialTopTabNavigator<PublicProfileTabParamsList>();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" hidden={false} translucent={true} />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBarStyles,
          tabBarLabelStyle: styles.tabBarLabelStyles,
        }}
      >
        <Tab.Screen
          options={{ tabBarLabel: "Collections" }}
          name="publicCollections"
          component={Collections}
          initialParams={{ profileId }}
        />
        <Tab.Screen
          options={{ tabBarLabel: "Playlist" }}
          name="publicPlaylist"
          component={Playlist}
          initialParams={{ profileId }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    paddingTop: 40,
    // backgroundColor: "red",
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

export default ProfileCollection;
