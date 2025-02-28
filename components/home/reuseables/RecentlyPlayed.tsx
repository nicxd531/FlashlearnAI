import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  GestureResponderEvent,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { Avatar, Card, IconButton, Title } from "react-native-paper";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import {
  fetchRecentlyPlayed,
  getSuggestedCollections,
} from "@/components/api/request";
import { backgroundImage, faceImage } from "@/constants/Styles";
import tw from "twrnc";
import { Image } from "react-native-elements";

const { width } = Dimensions.get("window");
interface Props {
  onOpen: (event: GestureResponderEvent) => void;
}

const RecentlyPlayed: React.FC<Props> = (props) => {
  const { onOpen } = props;
  const [error, setError] = useState<string | null>(null);
  const [recentlyPlayedData, setRecentlyPlayedData] = useState([]); // Replace with actual data
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestedCollections, setSuggestedCollections] = useState<any[]>([]);
  const renderItem = ({
    item,
  }: {
    item: {
      id: number;
      title: string;
      poster: string;
      owner: { avatar: string };
    };
  }) => (
    <Card key={item.id} style={styles.card} onPress={(event) => onOpen(event)}>
      <Image
        PlaceholderContent={<ActivityIndicator />}
        source={{ uri: item?.poster }}
        style={styles.poster}
      />
      <Card.Content>
        <Title
          style={[
            styles.title,
            tw``,
            { fontWeight: "bold", fontSize: 16, marginTop: 15 },
          ]}
        >
          {item.title}
        </Title>
      </Card.Content>
      <View style={styles.avatarContainer}>
        <Avatar.Image
          size={50}
          source={{
            uri: item?.owner?.avatar,
          }}
        />
      </View>
    </Card>
  );
  useEffect(() => {
    fetchRecentlyPlayed({ setRecentlyPlayedData, setError, setLoading });
    getSuggestedCollections({
      setSuggestedCollections,
      setError,
      setLoading,
    });
    console.log({ recentlyPlayedData, suggestedCollections });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>
          {recentlyPlayedData.length > 0
            ? "Recently Played"
            : "Suggessted Collection"}
        </Text>
      </View>
      <Carousel
        data={
          recentlyPlayedData.length > 0
            ? recentlyPlayedData
            : suggestedCollections
        }
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width * 0.6}
        inactiveSlideScale={0.9}
        inactiveSlideOpacity={1}
        loop={false}
        autoplay={false}
        containerCustomStyle={styles.carouselContainer}
        contentContainerCustomStyle={styles.carouselContentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 7,
  },
  textContainer: {
    marginBottom: 16,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    marginHorizontal: 2, // Add horizontal margin to create space between items
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
    width: 250, // Adjust card width to match item width
    position: "relative",
    height: 170,
  },
  poster: {
    width: "100%",
    height: 125,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  carouselContainer: {
    overflow: "visible", // Ensure the carousel items are visible
  },
  carouselContentContainer: {
    paddingHorizontal: 1, // Add padding to the content container
  },
  title: {},
  avatarContainer: {
    position: "absolute",
    top: 95, // Adjusted for smaller size
    left: "15%",
    transform: [{ translateX: -30 }], // Adjusted for smaller size
  },
});

export default RecentlyPlayed;
