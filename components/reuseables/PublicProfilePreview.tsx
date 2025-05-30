import { getAuthState, UserProfile } from "@/utils/store/auth";
import { FC } from "react";
import { Pressable, StyleSheet, View } from "react-native";

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
import { formatFollowers, handleError } from "../api/request";
import AvatarField from "../library/components/AvatarField";
import { owner } from "@/@types/collection";
import { getClient } from "../api/client";
import { useFetchIsFollowing } from "../library/hooks/query";
import { useMutation, useQueryClient } from "react-query";


interface Props {
    profile?: owner
}
const PublicProfilePreview: FC<Props> = (props) => {
    const { profile } = props;
    const queryClient = useQueryClient();
    const { data: isFollowing } = useFetchIsFollowing(profile?._id ?? "");
    const toggleFollowing = async (id: string) => {
        try {
            if (!id) return;
            const client = await getClient();
            await client.post("/profile/update-follower/" + id);
            queryClient.invalidateQueries({ queryKey: ["UserPublicProfile"] });
            queryClient.invalidateQueries({ queryKey: ["useFetchLogInUser"] });
            queryClient.invalidateQueries({ queryKey: ["fetchCollectionData"] });
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

    if (!profile) return null;
    return (
        <View style={{ width: "100%", paddingVertical: 10, backgroundColor: " #eee", justifyContent: "center", alignItems: "center" }}>
            <View style={styles.container}>
                <AvatarField source={profile?.avatar?.url} id={profile?._id} />

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
                            {formatFollowers(profile.followers.length)} Followers
                        </Text>
                        <Text style={styles.profileActionLink}>
                            {formatFollowers(profile.followings.length)} Followings
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10 }}>

                <Pressable
                    onPress={() => followingMutation.mutate(profile?._id ?? "")}
                    style={[
                        {
                            padding: 10,
                            backgroundColor: isFollowing ? "#eee" : colors.PRIMARY,
                            paddingHorizontal: 40,
                            borderRadius: 13,
                        },
                    ]}
                >
                    <Text style={{ color: isFollowing ? "black" : "white", }}>
                        {isFollowing ? "unfollow" : "follow"}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        // backgroundColor: "red",
        width: "100%",
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

export default PublicProfilePreview;
