import { FC, useEffect, useState } from "react";
import { Pressable, SafeAreaView, Text } from "react-native";
import { StyleSheet, View } from "react-native";
import AppHeader from "../components/AppHeader";
import colors from "@/constants/Colors";
import AvatarField from "../components/AvatarField";
import { TextInput } from "react-native";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
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
  updateLoggedInState,
  updateProfile,
} from "@/utils/store/auth";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "@/@types/navigation";
import { Alert } from "react-native";
import { useQueryClient } from "react-query";
import { RootState } from "@/utils/store";
import deepEqual from "deep-equal";
import * as ImagePicker from "expo-image-picker";
import ReverificationLink from "@/components/home/reuseables/ReverificationLink";

interface Props {}
interface ProfileInfo {
  name: string;
  avatar?: string;
}

const LibrarySettings: FC<Props> = (props) => {
  const { profile } = useSelector((state: RootState) => (state as any).auth);
  const [userInfo, setUserInfo] = useState<ProfileInfo>({ name: "" });
  const [busy, setBusy] = useState(false);
  const [image, setImage] = useState();
  const isSame = deepEqual(userInfo, {
    name: profile?.name,
    avatar: profile?.avatar,
  });

  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const handleLogOut = async (fromAll?: boolean) => {
    dispatch(updateBusyState(true));
    try {
      const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
      const endpoint = `/auth/log-out${fromAll ? "?fromAll=yes" : ""}`;
      const client = await getClient();
      const { data } = await client.post(endpoint);
      await removeFromAsyncStorage(Keys.AUTH_TOKEN);

      dispatch(updateLoggedInState(false));
      dispatch(updateProfile(null));
      toast("logout success", { icon: "🎉🎊" });
      navigation.navigate<any>("(auth)");
    } catch (e) {
      handleError(e);
    }
    dispatch(updateBusyState(false));
  };
  const clearHistory = async () => {
    try {
      const client = await getClient();
      await client.delete("/history?all=yes");
      toast.success("History Cleared", { icon: "✔️" });
      queryClient.invalidateQueries({ queryKey: ["histories"] });
    } catch (err) {
      toast.error("failed to clear history !", { icon: "⚠️" });
      handleError(err);
    }
  };

  const handleOnHistoryClear = () => {
    Alert.alert(
      "Are you sure?",
      "This action will clear out all the history!",
      [
        {
          text: "Clear",
          style: "destructive",
          onPress() {
            clearHistory();
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };
  const handleSubmit = async () => {
    setBusy(true);
    try {
      if (!userInfo.name.trim())
        return toast.error("profile name is required!", { icon: "⚠️" });
      const formData = new FormData();
      formData.append("name", userInfo.name);
      if (userInfo?.avatar) {
        formData.append("avatar", {
          uri: userInfo?.avatar,
          name: "avatar.jpg",
          type: "image/jpeg",
        });
      }
      const client = await getClient({ "content-type": "multipart/form-data" });
      const { data } = await client.post("/auth/update-profile", formData);
      dispatch(updateProfile(data.profile));
      toast.success("Profile Updated", { icon: "✔️" });
    } catch (error) {
      handleError(error);
    }
    setBusy(false);
  };
  const saveImage = (image: any) => {
    try {
      setImage(image);
      setUserInfo({ ...userInfo, avatar: image });
      console.log(userInfo, image);
    } catch (error) {
      throw error;
    }
  };

  const handleImageSelect = async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        await saveImage(result.assets[0].uri);
        // setUserInfo({ ...userInfo, avatar: result.assets[0].uri });
      }
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    if (profile) setUserInfo({ name: profile.name, avatar: profile.avatar });
  }, [profile]);

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Settings" />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Profile Settings</Text>
      </View>
      <View style={styles.settingOptionsContainer}>
        <View style={styles.avatarContainer}>
          <AvatarField source={image ? image : userInfo?.avatar} />
          <Pressable
            onPress={() => handleImageSelect()}
            style={styles.paddingLeft}
          >
            <Text style={styles.linkText}>Update Profile Image</Text>
          </Pressable>
        </View>
        <TextInput
          style={styles.nameInput}
          value={userInfo.name}
          onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
        />
        <View style={styles.eamilContainer}>
          <Text style={styles.email}>{profile.email}</Text>
          {profile.verified ? (
            <MaterialIcons name="verified" size={15} color={colors.SECONDARY} />
          ) : (
            <ReverificationLink linkTitle="verify" activeAtFirst />
          )}
        </View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>History</Text>
      </View>
      <View>
        <Pressable
          onPress={() => handleOnHistoryClear()}
          style={styles.btnContainer}
        >
          <MaterialCommunityIcons name="broom" size={20} />
          <Text style={styles.containerTitle}>Clear All</Text>
        </Pressable>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Logout</Text>
      </View>
      <View>
        <Pressable
          onPress={() => handleLogOut(true)}
          style={styles.btnContainer}
        >
          <AntDesign name="logout" size={20} />
          <Text style={styles.containerTitle}>Logout From All</Text>
        </Pressable>
        <Pressable onPress={() => handleLogOut()} style={styles.btnContainer}>
          <AntDesign name="logout" size={20} />
          <Text style={styles.containerTitle}>Logout</Text>
        </Pressable>
      </View>
      {!isSame ? (
        <View style={styles.marginTop}>
          <AppButton
            title="update"
            onPress={handleSubmit}
            busy={busy}
            // customStyles={{ borderRadius: 7, height: 60 }}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
    padding: 10,
    backgroundColor: "#fff",
    flex: 1,
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
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  containerTitle: {
    fontSize: 16,
    marginLeft: 5,
  },
  marginTop: {
    marginTop: 50,
  },
});

export default LibrarySettings;
