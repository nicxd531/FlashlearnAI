import DiscoverScreen from "@/components/home/DiscoverScreen";
import ExploreScreen from "@/components/home/ExploreScreen";
import TopCreators from "@/components/home/reuseables/TopCreators";
import PillToggleButton from "@/components/reuseables/PillToggleButton";
import TopAppBar from "@/components/reuseables/TopAppBar";
import { FC, useEffect, useRef, useState } from "react";
import {
  BackHandler,
  GestureResponderEvent,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Modalize } from "react-native-modalize";
import FeedsModal from "@/components/home/reuseables/FeedsModal";
import { Toasts } from "@backpackapp-io/react-native-toast";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import { AuthStackParamList } from "@/@types/navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeMain from "@/components/library/screens/HomeMain";
import ProfilePreviewPage from "@/components/library/screens/ProfilePreviewPage";
import CategoriesPreviewPage from "@/components/library/screens/CategoriesPreviewPage";
import CollectionPreview from "@/components/library/CollectionPreview";

interface Props {}
const Stack = createNativeStackNavigator();
const HomePage: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Stack.Navigator
        initialRouteName="HomeMain"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="HomeMain" component={HomeMain} />
        <Stack.Screen name="collectionPreview" component={CollectionPreview} />
        <Stack.Screen
          name="ProfilePreviewPage"
          component={ProfilePreviewPage}
        />
        <Stack.Screen
          name="CategoriesPreviewPage"
          component={CategoriesPreviewPage}
        />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomePage;
