import colors from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FC } from "react";
import { Text } from "react-native";
import { Pressable, StyleSheet, View } from "react-native";

interface Props {
  title: string;
}

const AppHeader: FC<Props> = ({ title }) => {
  const { goBack, canGoBack } = useNavigation();
  if (!canGoBack()) return null;
  return (
    <View style={styles.container}>
      <Pressable onPress={goBack}>
        <AntDesign name="arrowleft" size={24} />
      </Pressable>
      <Text style={styles.title}> {title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    height: 45,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
  },
});

export default AppHeader;
