import { formatRelativeTime, getSource } from "@/components/api/request";
import { avatarPlaceholder } from "@/constants/Styles";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import tw from "twrnc";

interface Props {
  avatar: string;
  name: string;
  time: string;
}

const TopNavFeeds: FC<Props> = (props) => {
  const { avatar, name, time } = props;
  const relativeTime = formatRelativeTime(time);

  return (
    <View style={[styles.container, tw` w-full flex-row items-center  py-4`]}>
      <Avatar.Image
        style={[tw`mr-4`]}
        size={60}
        source={getSource(avatar, avatarPlaceholder)}
      />
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
