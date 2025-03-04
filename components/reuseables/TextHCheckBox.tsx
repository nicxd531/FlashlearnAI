import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Checkbox, Text } from "react-native-paper";
import tw from "twrnc";

interface Props {
  checked: boolean;
  setChecked: (p: boolean) => void;
}

const TextHCheckBox: FC<Props> = (props) => {
  const { checked, setChecked } = props;
  return (
    <View style={[tw`flex-row justify-between  items-center w-50 ml-4`]}>
      <Text>Make collection public</Text>
      <Checkbox
        status={checked ? "checked" : "unchecked"}
        onPress={() => {
          setChecked(!checked);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default TextHCheckBox;
