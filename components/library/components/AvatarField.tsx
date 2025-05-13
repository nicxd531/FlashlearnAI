import { homeNavigatorStackParamListMini } from "@/@types/navigation";
import { getSource } from "@/components/api/request";
import colors from "@/constants/Colors";
import { avatarPlaceholder } from "@/constants/Styles";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { FC } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "react-native-elements";

interface Props {
  source?: string;
  id?: string;
}

const AvatarField: React.FC<Props> = (props) => {
  const navigation =
    useNavigation<NavigationProp<homeNavigatorStackParamListMini>>();
  const { source, id } = props;
  const handlePress = (id: string | undefined) => {
    navigation.navigate("HomePage", {
      screen: "ProfilePreviewPage",
      params: { userId: id }, // Pass any necessary parameters
    });
  };
  const avatarSize = 70;
  return (
    <TouchableOpacity onPress={() => handlePress(id)}>
      <Image
        style={styles.avatarImage}
        PlaceholderContent={<ActivityIndicator />}
        source={getSource(source, avatarPlaceholder)}
      />
    </TouchableOpacity>
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
