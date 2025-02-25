import colors from "@/constants/Colors";
import { FC } from "react";
import { StyleSheet, TextInput, View, TextInputProps } from "react-native";
import tw from "twrnc";

interface Props extends TextInputProps {}

const AppInput: FC<Props> = (props) => {
  return (
    <TextInput
      {...props}
      placeholderTextColor={"grey"}
      style={[
        styles.input,
        props.style,
        tw`w-full p-3  text-gray-700  rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500`,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  input: {
    borderWidth: 2,
    borderColor: "white",
    height: 50,
    borderRadius: 50,
    color: "white",
    padding: 10,
    backgroundColor: "white",
  },
});

export default AppInput;
