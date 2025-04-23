import { homeNavigatorStackParamListMini } from "@/@types/navigation";
import { formatRelativeTime, getSource } from "@/components/api/request";
import { avatarPlaceholder } from "@/constants/Styles";
import { updateOtherProfileData } from "@/utils/store/Collection";

import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { FC } from "react";
import { Button } from "react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import tw from "twrnc";

interface Props {
  avatar: string;
  name: string;
  time: string;
  userId:string | undefined
}

const TopNavFeeds: FC<Props> = (props) => {
  const { avatar, name, time,userId } = props;
  const relativeTime = formatRelativeTime(time);
   

  const navigation =
      useNavigation<NavigationProp<homeNavigatorStackParamListMini>>();
  const handlePress = (id: string| undefined) => {
      navigation.navigate("HomePage", {
        screen: "ProfilePreviewPage",
        params: { userId: id }, // Pass any necessary parameters
      });
    };

  return (
    <View style={[styles.container, tw` w-full flex-row items-center  py-4`]}>
    <TouchableOpacity 
    onPress={() => handlePress(userId)}
    >

      <Avatar.Image
      
        style={[tw`mr-4`]}
        size={60}
        source={getSource(avatar, avatarPlaceholder)}
      />
    </TouchableOpacity>
      <View>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          variant="titleMedium"
          style={styles.userName}
        >
          {name}
        </Text>
        <Text variant="titleMedium" style={styles.time}>
          {relativeTime}
        </Text>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  userName: {
    color: "#00000",
    fontSize: 16,
    fontWeight: "bold",
  },
  time: {
    color: "#00000",
    fontSize: 12,
  },
});

export default TopNavFeeds;
