import React from "react";
import { TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";

import { Text } from "react-native-paper";
import colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface BtnRNPIconProps {
  handleSubmit: () => void;
  busy: boolean;
  title?: string;
  iconName?: keyof typeof MaterialCommunityIcons.glyphMap;
}

const Btn: React.FC<BtnRNPIconProps> = ({
  handleSubmit,
  busy,
  title,
  iconName,
}) => {
  return (
    <TouchableOpacity
      disabled={busy}
      onPress={handleSubmit}
      style={[styles.container, styles.pillButton]}
    >
      {!busy ? (
        <>
          <Text variant="headlineLarge" style={styles.title}>
            {title ? title : "Submit"}
          </Text>
          {iconName && (
            <MaterialCommunityIcons
              name={iconName}
              size={20}
              color={"white"}
              style={styles.icon}
            />
          )}
        </>
      ) : (
        <ActivityIndicator size="small" color={colors.SECONDARY} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "30%",
    height: 40,
    backgroundColor: colors.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row", // Add flexDirection to align icon and text
  },
  pillButton: {
    borderRadius: 25,
  },
  title: {
    color: "white",
    fontSize: 15,
    marginRight: 4, // Add margin to separate text from icon
  },
  icon: {
    marginRight: 8, // Add margin to separate icon from text
  },
});

export default Btn;
