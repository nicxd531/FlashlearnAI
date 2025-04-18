import { getAuthState, UserProfile } from "@/utils/store/auth";
import { FC } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import AvatarField from "./components/AvatarField";
import { useSelector } from "react-redux";
import colors from "@/constants/Colors";
import { AntDesign, MaterialIcons, Octicons } from "@expo/vector-icons";
import { Text } from "react-native";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import {
  AuthStackParamList,
  libraryNavigatorStackParamList,
} from "@/@types/navigation";
import { formatFollowers } from "../api/request";
import { useFetchLogInUser } from "./hooks/query";

interface Props {}
const ProfileComponent: FC<Props> = (props) => {
  const { data: profile } = useFetchLogInUser();

  const { navigate } =
    useNavigation<NavigationProp<libraryNavigatorStackParamList>>();
  if (!profile) return null;
  return (
    <View style={styles.container}>
      <AvatarField source={profile.avatar} />

      <View style={styles.profileInfoConatiner}>
        <Text style={styles.profileName}>{profile.name}</Text>
        <View style={styles.flexRow}>
          <Text style={styles.email}>{profile.email}</Text>

          {profile?.verified ? (
            <MaterialIcons name="verified" size={15} color={colors.SECONDARY} />
          ) : (
            <Octicons name="unverified" size={15} color={colors.SECONDARY} />
          )}
        </View>

        <View style={styles.flexRow}>
          <Text style={styles.profileActionLink}>
            {formatFollowers(profile.followers)} Followers
          </Text>
          <Text style={styles.profileActionLink}>
            {formatFollowers(profile.followings)} Followings
          </Text>
        </View>
      </View>

      <Pressable
        onPress={() => navigate("librarySettings")}
        style={styles.settingsBtn}
      >
        <AntDesign name="setting" size={22} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  profileInfoConatiner: {
    paddingLeft: 10,
  },
  profileName: {
    // color: colors.CONTRAST,
    fontSize: 18,
    fontWeight: "700",
  },
  email: {
    // color: colors.CONTRAST,
    marginRight: 5,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileActionLink: {
    // backgroundColor: colors.SECONDARY,
    // color: colors.PRIMARY,
    paddingHorizontal: 4,
    paddingVertical: 2,
    margin: 5,
  },
  settingsBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileComponent;
