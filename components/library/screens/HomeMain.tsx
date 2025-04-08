import { AuthStackParamList } from "@/@types/navigation";
import DiscoverScreen from "@/components/home/DiscoverScreen";
import ExploreScreen from "@/components/home/ExploreScreen";
import TopCreators from "@/components/home/reuseables/TopCreators";
import PillToggleButton from "@/components/reuseables/PillToggleButton";
import TopAppBar from "@/components/reuseables/TopAppBar";
import { Toasts } from "@backpackapp-io/react-native-toast";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { FC, useEffect, useRef, useState } from "react";
import { BackHandler, GestureResponderEvent, ScrollView } from "react-native";
import { StyleSheet, View } from "react-native";
import { Modalize } from "react-native-modalize";

interface Props {}

const HomeMain: FC<Props> = (props) => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const modalizeRef = useRef<Modalize>(null);
  const onOpen = (event: GestureResponderEvent) => {
    modalizeRef.current?.open();
  };
  const [activeScreen, setActiveScreen] = useState<"Explore" | "Discover">(
    "Explore"
  );

  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        BackHandler.exitApp(); // Close app if on Home
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Cleanup
  });
  return (
    <View style={styles.container}>
      <Toasts
        overrideDarkMode={true}
        globalAnimationType="spring"
        globalAnimationConfig={{
          duration: 3000,
          flingPositionReturnDuration: 200,
          stiffness: 50,
        }}
      />
      <ScrollView>
        <TopAppBar />
        <TopCreators />
        <PillToggleButton
          activeScreen={activeScreen}
          setActiveScreen={setActiveScreen}
        />
        {activeScreen === "Explore" ? (
          <ExploreScreen onOpen={onOpen} />
        ) : (
          <DiscoverScreen onOpen={onOpen} />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default HomeMain;
