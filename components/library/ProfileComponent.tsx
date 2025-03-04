import { getAuthState, UserProfile } from "@/utils/store/auth";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import AvatarField from "./components/AvatarField";
import { useSelector } from "react-redux";

interface Props {
  profile?: UserProfile | null;
}

const ProfileComponent: FC<Props> = ({ profile }) => {
  if (!profile) return null;
  return (
    <View style={styles.container}>
      <AvatarField source={profile?.avatar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: "100%",
  },
});

export default ProfileComponent;
