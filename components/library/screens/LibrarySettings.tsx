import { FC } from "react";
import { Pressable, SafeAreaView, Text } from "react-native";
import { StyleSheet, View } from "react-native";
import AppHeader from "../components/AppHeader";
import colors from "@/constants/Colors";
import AvatarField from "../components/AvatarField";
import { TextInput } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import AppButton from "@/components/ui/AppButton";
import { getClient } from "@/components/api/client";
import { handleError } from "@/components/api/request";
import {
  getFromAsyncStorage,
  Keys,
  removeFromAsyncStorage,
} from "@/utils/asyncStorage";
import { toast } from "@backpackapp-io/react-native-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthState,
  updateBusyState,
  updateProfile,
} from "@/utils/store/auth";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "@/@types/navigation";

interface Props {}

const LibrarySettings: FC<Props> = (props) => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const dispatch = useDispatch();
  const handleLogOut = async (fromAll?: boolean) => {
    const { profile } = useSelector(getAuthState);
    console.log(profile);
    dispatch(updateBusyState(true));
    try {
      const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
      const endpoint = `/auth/log-out${fromAll ? "?fromAll=yes" : ""}`;
      console.log({ endpoint });
      const client = await getClient();
      const { data } = await client.post(endpoint);
      await removeFromAsyncStorage(Keys.AUTH_TOKEN);
      dispatch(updateProfile(null));
      toast("logout success", { icon: "🎉🎊" });
      if (!token) {
        navigation.navigate<any>("(auth)"); // Navigate to the main screen or auth flow
      }
    } catch (e) {
      handleError(e);
      console.log({ e });
    }
    dispatch(updateBusyState(false));
  };
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Settings" />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Profile Settings</Text>
      </View>
      <View style={styles.settingOptionsContainer}>
        <View style={styles.avatarContainer}>
          <AvatarField />
          <Pressable style={styles.paddingLeft}>
            <Text style={styles.linkText}>Update Profile Image</Text>
          </Pressable>
        </View>
        <TextInput style={styles.nameInput} value="jhon" />
        <View style={styles.eamilContainer}>
          <Text style={styles.email}>john@gmail.com</Text>
          <MaterialIcons name="verified" size={15} color={colors.SECONDARY} />
        </View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Logout</Text>
      </View>
      <View>
        <Pressable onPress={() => handleLogOut(true)} style={styles.logoutBtn}>
          <AntDesign name="logout" size={20} />
          <Text style={styles.logoutBtnTitle}>Logout From All</Text>
        </Pressable>
        <Pressable onPress={() => handleLogOut()} style={styles.logoutBtn}>
          <AntDesign name="logout" size={20} />
          <Text style={styles.logoutBtnTitle}>Logout</Text>
        </Pressable>
      </View>
      <View style={styles.marginTop}>
        <AppButton
          title="update"
          // customStyles={{ borderRadius: 7, height: 60 }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    // padding: 10,
  },
  titleContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.SECONDARY,
    marginTop: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: colors.SECONDARY,
  },
  settingOptionsContainer: {
    marginTop: 15,
    paddingLeft: 15,
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  linkText: {
    color: colors.SECONDARY,
    fontStyle: "italic",
  },
  paddingLeft: {
    paddingLeft: 50,
  },
  nameInput: {
    // color: colors.CONTRAST,
    fontWeight: "bold",
    fontSize: 14,
    padding: 10,
    borderWidth: 2,
    // borderColor: colors.CONTRAST,
    borderRadius: 7,
    marginTop: 15,
  },
  eamilContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  email: {
    marginRight: 10,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  logoutBtnTitle: {
    fontSize: 16,
    marginLeft: 5,
  },
  marginTop: {
    marginTop: 50,
  },
});

export default LibrarySettings;
