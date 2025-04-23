import useStore from "@/utils/store/useStore";
import { NavigationProp, useRoute } from "@react-navigation/native";
import { FC, useEffect, useState } from "react";
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
import ProfileCollection from "../components/PublicProfileNav";
import PulseAnimationContainer from "@/components/home/reuseables/PulseAnimationContainer";
import { getClient } from "@/components/api/client";
import { useMutation, useQueryClient } from "react-query";
import ReverificationLink from "@/components/home/reuseables/ReverificationLink";
import PaginatedList from "@/components/reuseables/PaginatedList";
import EmptyRecords from "../components/EmptyRecords";
import ProfilePreviewLoadingUI from "../components/ProfilePreviewLoadingUI";
import ProfilePreviewHeader from "../components/ProfilePreviewHeader";
import publicProfile from "@/utils/store/zustand/publicProfiles";
import Collections from "@/components/home/reuseables/Collections";
import Playlist from "@/components/home/reuseables/Playlist";

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
   const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
  const { data: isFollowing } = useFetchIsFollowing(userId);
  const { data, isLoading,isFetching } = useFetchUserPublicProfile(userId);
  const queryClient = useQueryClient();
  const nav = publicProfile((state) => state.nav);

  let pageNo
  const handleOnRefresh = () => {
    pageNo = 0;
    setHasMore(true);
    queryClient.invalidateQueries({
      queryKey: ["UserPublicProfile"],
    });
    queryClient.invalidateQueries({
      queryKey: ["publicPlaylist"],
    });
    queryClient.invalidateQueries({
      queryKey: ["publicCollection"],
    });
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
  if (isLoading) <ProfilePreviewLoadingUI/>
 
const renderItem = ({ item }: { item: (typeof data)[0] }) => {
  return  nav? <Collections publicProfileId={item}/>:<Playlist publicProfileId={item}/>
}

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" hidden={false} translucent={true} />
      <AppHeader title="Profile" />
        <PaginatedList
        data={[userId]}
        renderItem={renderItem}
        ListEmptyComponent={() => <EmptyRecords title="Feeds not found!!" />}
        isFetching={isFetchingMore}
        refreshing={isFetching}
        onRefresh={handleOnRefresh}
        ListHeaderComponent={<ProfilePreviewHeader data={data} userId={userId}/>}
        />
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1, padding: 10 ,
    backgroundColor:"#fff",
    paddingTop: 40

  }
});

export default ProfilePreviewPage;
