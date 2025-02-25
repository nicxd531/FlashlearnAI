import { FC, ReactNode, useEffect } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import colors from "@/constants/Colors";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface Props {
  children: ReactNode;
  heading?: string;
  subHeading?: string;
}
const { height } = Dimensions.get("window");

const AuthFormContainer: FC<Props> = ({ children, heading, subHeading }) => {
  const translateY = useSharedValue(height); // Start off-screen

  // Animated style that uses the translateY shared value
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  let emoji;
  switch (heading) {
    case "Please, Log In.":
      emoji = (
        <View style={styles.headerContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.subHeading}>{subHeading}</Text>
            <View>
              <Text style={styles.emoji}>👌</Text>
            </View>
          </View>
          <Text style={styles.heading}>{heading}</Text>
        </View>
      );
      break;
    case "Let's Get Started":
      emoji = (
        <View style={styles.headerContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.subHeading}>{heading}</Text>
            <Text style={styles.emoji}>📸</Text>
          </View>
          <Text style={styles.heading}>{subHeading}</Text>
        </View>
      );
      break;
    case "Forget Password!":
      emoji = (
        <View style={[styles.headerContainer, { marginTop: 50 }]}>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={[styles.heading, { width: "100%", fontSize: 38 }]}>
              {heading}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View>
              <Text style={styles.subHeading}>{subHeading}</Text>
            </View>
            <Text style={styles.emoji}>😔</Text>
          </View>
        </View>
      );
      break;
    default:
      emoji = (
        <View>
          <Text>{""}</Text>
        </View>
      );
  }
  useEffect(() => {
    // Animate the view to slide in from the bottom
    translateY.value = withTiming(height * 0.3, { duration: 500 }); // Cover 80% of the screen height
  }, [translateY]);
  return (
    <Animated.View style={[styles.container]}>
      {emoji}
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    width: "80%",
    flex: 1,
  },
  headerContainer: {
    width: "100%",
    marginBottom: 20,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
  },
  heading: {
    color: "white",
    fontSize: 45,
    fontWeight: "bold",
    paddingVertical: 5,
  },
  subHeading: { color: colors.CONTRAST, fontSize: 18, marginBottom: 10 },
  image: {
    width: 100,
    height: 100,
  },
  roundedView: {
    width: 75, // Width of the rounded view
    height: 75, // Height of the rounded view
    backgroundColor: "#d3d3d3", // Whitish-grey background color
    borderRadius: 75, // Half of width/height to make it fully rounded
    justifyContent: "center", // Center the emoji vertically
    alignItems: "center", // Center the emoji horizontally
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  emoji: {
    fontSize: 20, // Size of the emoji
  },
  text: {
    fontSize: 14,
    color: "#555",
    fontWeight: "600",
  },
});

export default AuthFormContainer;
