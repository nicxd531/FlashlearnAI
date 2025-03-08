import { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import FeedsBtn from "./FeedsBtn";
import { Text } from "react-native-paper";
import tw from "twrnc";
import { GestureResponderEvent } from "react-native";
import { formatLikes } from "@/components/api/request";

interface Props {
  name: string;
  collectionId: string;
  likes: number;
  description: string;
  onOpen: (event: GestureResponderEvent) => void;
}

const FeedDetails: FC<Props> = (props) => {
  const { name, likes, description, onOpen, collectionId } = props;
  const [newLikes, setNewLikes] = useState(likes);

  const formattedLikes = formatLikes(newLikes);
  return (
    <View style={styles.container}>
      <FeedsBtn
        collectionId={collectionId}
        onOpen={onOpen}
        likes={newLikes}
        setLikes={setNewLikes}
      />
      <View>
        <Text variant="titleMedium">
          {newLikes > 0 ? formattedLikes : 0}
          {""}
          {newLikes > 1 ? " likes" : " like"}
        </Text>
      </View>
      <View style={[tw`flex-row`]}>
        <Text variant="titleMedium">{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedDetails;
