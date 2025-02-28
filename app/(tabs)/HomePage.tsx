import DiscoverScreen from "@/components/home/DiscoverScreen";
import ExploreScreen from "@/components/home/ExploreScreen";
import TopCreators from "@/components/home/reuseables/TopCreators";
import PillToggleButton from "@/components/reuseables/PillToggleButton";
import TopAppBar from "@/components/reuseables/TopAppBar";
import { FC, useRef, useState } from "react";
import { GestureResponderEvent, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Modalize } from "react-native-modalize";

interface Props {}

const HomePage: FC<Props> = (props) => {
  const modalizeRef = useRef<Modalize>(null);
  const onOpen = (event: GestureResponderEvent) => {
    event.persist(); // Prevent React from reusing the event object
    modalizeRef.current?.open();
  };
  const [activeScreen, setActiveScreen] = useState<"Explore" | "Discover">(
    "Explore"
  );
  return (
    <SafeAreaView style={styles.container}>
      <TopAppBar />
      <ScrollView>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomePage;
