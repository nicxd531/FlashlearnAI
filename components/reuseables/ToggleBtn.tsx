import colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Surface, ToggleButton } from "react-native-paper";
import tw from "twrnc";

interface Props {
  setStackStyle: (style: string) => void;
  stackStyle: string;
}

const ToggleBtn: FC<Props> = (props) => {
  const { setStackStyle, stackStyle } = props;
  return (
    <Surface
      style={tw`flex-row justify-between items-center w-25 p-2 rounded-lg m-auto mb-6 `}
    >
      <ToggleButton.Group
        onValueChange={(stackStyle) => setStackStyle(stackStyle)}
        value={stackStyle}
      >
        <ToggleButton
          icon={() => (
            <MaterialCommunityIcons
              name="view-carousel-outline"
              size={30}
              color={colors.PRIMARY}
              onPress={() => setStackStyle("default")}
            />
          )}
          value="left"
        />
        <ToggleButton
          icon={() => (
            <MaterialCommunityIcons
              name="cards"
              size={30}
              color={colors.PRIMARY}
              onPress={() => setStackStyle("stack")}
            />
          )}
          value="right"
        />
      </ToggleButton.Group>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ToggleBtn;
