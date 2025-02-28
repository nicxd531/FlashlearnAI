import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DiscoverScreen from "./screens/DiscoverScreen";
import ExploreScreen from "./screens/ExploreScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
