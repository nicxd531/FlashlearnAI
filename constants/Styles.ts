import { ImageSourcePropType, StyleSheet } from "react-native";
import colors from "./Colors";

export const flashcardPlaceholder: ImageSourcePropType = require("../assets/images/FlashcardsPlaceholder.jpg");
export const playlistPlaceholder: ImageSourcePropType = require("../assets/images/PlaylistPlaceholder.jpg");
export const avatarPlaceholder: ImageSourcePropType = require("../assets/images/avatarPlaceholder.png");
export const backgroundImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDz59tyNgjQqEfRRHwkawbQgXp3FBfTHx9Kw&s";
export const faceImage =
  "data:image/jpeg;base64,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";
export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
    padding: 16,
  },
  header: {
    fontSize: 40,
    fontWeight: "700",
  },
  pillButton: {
    padding: 10,
    height: 60,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000", // Shadow for depth
    shadowOffset: { width: 0, height: 5 }, // Position of shadow
    shadowOpacity: 0.3, // Shadow transparency
    shadowRadius: 8, // Blurriness of shadow
    elevation: 10, // Shadow on Android
  },
  textLink: {
    color: colors.PRIMARY,
    fontSize: 18,
    fontWeight: "500",
  },
  descriptionText: {
    fontSize: 18,
    marginTop: 20,
    color: colors.GRAY,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
  pillButtonSmall: {
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextSmall: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 20,
    marginBottom: 10,
  },
  block: {
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 16,
    gap: 20,
  },
});
