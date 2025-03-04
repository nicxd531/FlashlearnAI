import { getSource } from "@/components/api/request";
import colors from "@/constants/Colors";
import { avatarPlaceholder } from "@/constants/Styles";
import { FC } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Image } from "react-native-elements";

interface Props {
  source?: string;
}

const AvatarField: React.FC<Props> = (props) => {
  const { source } = props;
  console.log(source);
  const avatarSize = 70;
  return (
    <View style={{ width: "100%" }}>
      <Image
        style={styles.avatarImage}
        PlaceholderContent={<ActivityIndicator />}
        source={getSource(source, avatarPlaceholder)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  avatarImage: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    // backgroundColor: colors.SECONDARY,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 10,
    borderColor: colors.CONTRAST,
  },
});

export default AvatarField;
