import React from "react";
import { TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";

import { Text } from "react-native-paper";
import colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import tw from "twrnc";
import { string } from "yup";

interface BtnRNPIconProps {
  handleSubmit: () => void;
  busy: boolean;
  title?: string;
  iconName?: keyof typeof MaterialCommunityIcons.glyphMap;
  text?: any;
  btn?: any;
}

const Btn: React.FC<BtnRNPIconProps> = ({
  handleSubmit,
  busy,
  title,
  iconName,
  text,
  btn
}) => {
  return (
    <TouchableOpacity
      disabled={busy}
      onPress={handleSubmit}
      style={[btn, styles.container, styles.pillButton,]}
    >
      {!busy ? (
        <>
          <Text variant="headlineLarge" style={[text, styles.title]}>
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
