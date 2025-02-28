import colors from "@/constants/Colors";
import React, { useRef } from "react";
import { View, Text, Pressable, StyleSheet, Animated } from "react-native";

type PillToggleButtonProps = {
  activeScreen: "Explore" | "Discover";
  setActiveScreen: (screen: "Explore" | "Discover") => void;
};

const PillToggleButton: React.FC<PillToggleButtonProps> = ({
  activeScreen,
  setActiveScreen,
}) => {
  const animation = useRef(
    new Animated.Value(activeScreen === "Explore" ? 0 : 150)
  ).current;

  const handlePress = (screen: "Explore" | "Discover") => {
    setActiveScreen(screen);
    Animated.timing(animation, {
      toValue: screen === "Explore" ? 0 : 150,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.pillContainer}>
        <Animated.View style={[styles.activeIndicator, { left: animation }]} />
        <Pressable
          style={styles.buttonSection}
          onPress={() => handlePress("Explore")}
        >
          <Text
            style={[
              styles.text,
              activeScreen === "Explore" && styles.activeText,
            ]}
          >
            Explore
          </Text>
        </Pressable>
        <Pressable
          style={styles.buttonSection}
          onPress={() => handlePress("Discover")}
        >
          <Text
            style={[
              styles.text,
              activeScreen === "Discover" && styles.activeText,
            ]}
          >
            Discover
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pillContainer: {
    width: 300,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#e0e0e0",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  activeIndicator: {
    position: "absolute",
    height: "100%",
    width: 150,
    backgroundColor: colors.PRIMARY,
    borderRadius: 25,
  },
  buttonSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#000",
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default PillToggleButton;
