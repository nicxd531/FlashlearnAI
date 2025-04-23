import React from "react";
import { TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon library

import { Text } from "react-native-paper";
import colors from "@/constants/Colors";

interface BtnRNPIconProps {
  handleSubmit: () => void;
  busyACollection: boolean;
  title?: string;
  iconName?: string; // Add iconName prop
}

const BtnRNPIcon: React.FC<BtnRNPIconProps> = ({
  handleSubmit,
  busyACollection,
  title,
  iconName,
}) => {
  
  return (
    <TouchableOpacity
      disabled={busyACollection}
      onPress={handleSubmit}
      style={[styles.container, styles.pillButton]}
    >
      {!busyACollection ? (
        <>
          {iconName && (
            <Icon
              name={iconName}
              size={20}
              color={"white"}
              style={styles.icon}
            />
          )}
          <Text variant="headlineLarge" style={styles.title}>
            {title ? title : "Submit"}
          </Text>
        </>
      ) : (
        <ActivityIndicator size="small" color={colors.SECONDARY} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
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
    fontSize: 20,
    marginLeft: 8, // Add margin to separate text from icon
  },
  icon: {
    marginRight: 8, // Add margin to separate icon from text
  },
});

export default BtnRNPIcon;
