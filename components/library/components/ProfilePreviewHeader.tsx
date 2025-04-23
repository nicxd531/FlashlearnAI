import { FC } from 'react';
import { ActivityIndicator, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import ProfileCollection from './PublicProfileNav';
import { formatFollowers, getSource, handleError } from '@/components/api/request';
import ReverificationLink from '@/components/home/reuseables/ReverificationLink';
import { MaterialIcons } from '@expo/vector-icons';
import { flashcardPlaceholder } from '@/constants/Styles';
import { Image } from 'react-native-elements';
import colors from '@/constants/Colors';
import { useMutation, useQueryClient } from 'react-query';
import { getClient } from '@/components/api/client';
import { useFetchIsFollowing } from '../hooks/query';

interface Props {
    data: any;
    userId:string
}

const ProfilePreviewHeader: FC<Props> = (props) => {
    const {data,userId}=props
    const queryClient = useQueryClient();
    const { data: isFollowing } = useFetchIsFollowing(userId);
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
    const followingMutation = useMutation({
        mutationFn: async (id) => toggleFollowing(id),
        onMutate: (id: string) => {
          queryClient.setQueryData<boolean>(
            ["is-following", id],
            (oldData) => !oldData
          );
        },
      });
  return <View style={styles.container}>
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
                    PlaceholderContent={<ActivityIndicator />}
                />
              </View>
            </ImageBackground>
            <View style={styles.profileInfoConatiner}>
              <Text style={styles.profileName}>{data?.name}</Text>
              <View style={styles.flexRow}>
                <Text style={styles.email}>{data?.email}</Text>
                {data?.verified ? (
                <MaterialIcons name="verified" size={15} color={colors.SECONDARY} />
              ) : (
                <ReverificationLink linkTitle="verify" activeAtFirst />
              )}
              </View>
    
              <View style={styles.flexRow}>
                <Text style={styles.profileActionLink}>
                  {formatFollowers(data?.followers)} Followers
                </Text>
                <Text style={styles.profileActionLink}>
                  {formatFollowers(data?.followings)} Followings
                </Text>
              </View>
              <Pressable
                onPress={() => followingMutation.mutate(userId)}
                style={[
                  {
                    padding: 10,
                    backgroundColor:isFollowing ?"#eee": colors.PRIMARY,
                    paddingHorizontal: 40,
                    borderRadius: 13,
                  },
                ]}
              >
                <Text style={{ color:isFollowing ?"black" :"white", }}>
                  {isFollowing ? "unfollow" : "follow"}
                </Text>
              </Pressable>
            </View>
            <ProfileCollection profileId={userId} />
  </View>;
};

const styles = StyleSheet.create({
  container: {},
  button: {
    // backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginVertical: 40,
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

export default ProfilePreviewHeader;