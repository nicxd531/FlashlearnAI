import useStore from "@/utils/store/useStore";
import { NavigationProp, useRoute } from "@react-navigation/native";
import { FC, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useFetchUserPublicProfile } from "../hooks/query";
import { libraryNavigatorStackParamList } from "@/@types/navigation";
import { useNavigation } from "expo-router";
import AppHeader from "../components/AppHeader";

interface Props {}
interface Count {
  count: number;
  increase(): void;
  decrease(): void;
}
const ProfilePreviewPage: FC<Props> = (props) => {
  const navigation =
    useNavigation<NavigationProp<libraryNavigatorStackParamList>>();
  const route = useRoute();
  const { userId } = route.params as { userId: string }; // Type assertion
  const { data, isLoading } = useFetchUserPublicProfile(userId);
  // console.log({ data });
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Library",
      headerBackVisible: true,
      headerBackTitleVisible: true, // Make sure back title is visible
      headerBackTitle: "Library", // Set the back button title
      headerBackPress: () => {
        navigation.navigate("libraryMain");
      },
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <AppHeader title="Profile" />
      <Text>Profile Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginVertical: 40,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default ProfilePreviewPage;
