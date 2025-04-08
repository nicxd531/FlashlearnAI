import useStore from "@/utils/store/useStore";
import { NavigationProp, useRoute } from "@react-navigation/native";
import { FC, useEffect } from "react";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFetchIsFollowing, useFetchUserPublicProfile } from "../hooks/query";
import { libraryNavigatorStackParamList } from "@/@types/navigation";
import { useNavigation } from "expo-router";
import AppHeader from "../components/AppHeader";
import { Image } from "react-native-elements";
import {
  formatFollowers,
  getSource,
  handleError,
} from "@/components/api/request";
import {
  backgroundImage,
  defaultStyles,
  flashcardPlaceholder,
} from "@/constants/Styles";
import { ActivityIndicator } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "@/constants/Colors";
import ProfileCollection from "../components/ProfileCollection";
import PulseAnimationContainer from "@/components/home/reuseables/PulseAnimationContainer";
import { getClient } from "@/components/api/client";
import { useMutation, useQueryClient } from "react-query";

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
  const { data: isFollowing } = useFetchIsFollowing(userId);
  const { data, isLoading } = useFetchUserPublicProfile(userId);
  const queryClient = useQueryClient();
  const followingMutation = useMutation({
    mutationFn: async (id) => toggleFollowing(id),
    onMutate: (id: string) => {
      queryClient.setQueryData<boolean>(
        ["is-following", id],
        (oldData) => !oldData
      );
    },
  });
  const toggleFollowing = async (id: string) => {
    try {
      if (!id) return;
      const client = await getClient();
      await client.post("/profile/update-follower/" + id);
      queryClient.invalidateQueries({ queryKey: ["UserPublicProfile"] });
      queryClient.invalidateQueries({ queryKey: ["useFetchLogInUser"] });
    } catch (err) {
      handleError(err);
    }
  };
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
  if (isLoading) {
    return (
      <PulseAnimationContainer>
        <View style={{ marginTop: 50, alignItems: "center", flex: 1 }}>
          <View style={styles.dummyTitleView} />
        </View>
        <View style={{ width: 70, height: 500 }} />
        <View style={{ width: 70, height: 30 }} />
        <View style={{ width: 70, height: 30 }} />
        <View style={{ width: 70, height: 30 }} />
      </PulseAnimationContainer>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" hidden={false} translucent={true} />
      <AppHeader title="Profile" />
      <ScrollView // Allows nested scrolling
        nestedScrollEnabled={true} // Allows nested scrolling
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, padding: 10 }}
      >
        <ImageBackground
          style={styles.profileImages}
          source={getSource(data?.backgroundCover, flashcardPlaceholder)}
          imageStyle={{ borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
        >
          {!data && (
            <ActivityIndicator
              size="large"
              color="#0000ff"
              style={{ position: "absolute" }}
            />
          )}
          <View style={styles.profilePhoto}>
            <Image
              style={{ width: "100%", aspectRatio: 1 }}
              source={getSource(data?.avatar, flashcardPlaceholder)}
            />
          </View>
        </ImageBackground>
        <View style={styles.profileInfoConatiner}>
          <Text style={styles.profileName}>{data.name}</Text>
          <View style={styles.flexRow}>
            <Text style={styles.email}>{data.email}</Text>
            <MaterialIcons name="verified" size={15} color={colors.SECONDARY} />
          </View>

          <View style={styles.flexRow}>
            <Text style={styles.profileActionLink}>
              {formatFollowers(data.followers)} Followers
            </Text>
            <Text style={styles.profileActionLink}>
              {formatFollowers(data.followings)} Followings
            </Text>
          </View>
          <Pressable
            onPress={() => followingMutation.mutate(userId)}
            style={[
              {
                padding: 10,
                backgroundColor: colors.PRIMARY,
                paddingHorizontal: 40,
                borderRadius: 13,
              },
            ]}
          >
            <Text style={{ color: "white" }}>
              {isFollowing ? "unfollow" : "follow"}
            </Text>
          </Pressable>
        </View>
        <ProfileCollection profileId={userId} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // backgroundColor: "blue",
  },
  button: {
    // backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginVertical: 40,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  profileImages: {
    width: 390,
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 10,
  },
  profilePhoto: {
    // backgroundColor: "blue",
    height: 100,
    width: 100,
    borderRadius: 50,
    top: 100,
    borderWidth: 5,
    borderColor: "white",
    overflow: "hidden",
  },
  profileInfoConatiner: {
    paddingLeft: 10,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
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

  dummyTitleView: {
    height: 200,
    width: "100%",
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 16,
  },
  dummyTopView: {
    height: 150,
    width: 250,
    backgroundColor: "white",
    marginRight: 10,
    borderRadius: 16,
  },
  dummyTopViewContainer: {
    flexDirection: "row",
  },
});

export default ProfilePreviewPage;
