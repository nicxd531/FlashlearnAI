import client from "@/components/api/client";
import { backgroundImage, faceImage } from "@/constants/Styles";
import { getFromAsyncStorage, Keys } from "@/utils/asyncStorage";
import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { Surface, Card, Avatar } from "react-native-paper";

type Creator = {
  id: string;
  name: string;
  avatar: string;
  backgroundCover: string;
};

const TopCreators: React.FC = () => {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const getTopCreators = async () => {
    try {
      const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
      if (!token) {
        throw new Error("User is not authenticated. Token is missing.");
      }
      // formData.forEach((value, key) => {
      //   console.log(`${key}: ${value}`);
      // });

      const res = await client.get("/auth/top-creators", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setCreators(res.data.topCreators);
      // console.log({ creators });
    } catch (err) {
      setError("Failed to fetch top creators. Please try again later.");
      console.error("Error fetching top creators:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTopCreators();
  }, []);
  const renderItem = ({ item }: { item: Creator }) => (
    <Surface style={styles.surface}>
      <Card style={styles.card}>
        <Card.Cover
          style={styles.backgroundOverlay}
          source={{
            uri: item.backgroundCover,
          }}
        />
        <View style={styles.avatarContainer}>
          <Avatar.Image
            size={60}
            source={{
              uri: item.avatar,
            }}
          />
        </View>
        <Card.Content style={{ marginTop: 10 }}>
          <Text style={styles.name}>{item.name}</Text>
        </Card.Content>
      </Card>
    </Surface>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Top Creators</Text>
      <FlatList
        data={creators}
        renderItem={renderItem}
        horizontal
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    marginBottom: 16,
    fontSize: 24,
    fontWeight: "bold",
  },
  surface: {
    marginBottom: 10,
    marginRight: 10,
    elevation: 4, // Add elevation to match Card's shadow
    borderRadius: 8, // Match the Card's border radius if needed
    overflow: "hidden", // Ensure content does not overflow
  },
  card: {
    position: "relative",
    width: 112.5, // 25% smaller than 150
    height: 150, // Set a fixed height to match the content
    borderRadius: 8, // Match the Surface's border radius if needed
  },
  backgroundOverlay: {
    height: 75, // 25% smaller than 100
    borderBottomLeftRadius: 0, // Remove bottom left border radius
    borderBottomRightRadius: 0, // Remove bottom right border radius
  },
  avatarContainer: {
    position: "absolute",
    top: 30, // Adjusted for smaller size
    left: "50%",
    transform: [{ translateX: -30 }], // Adjusted for smaller size
  },
  name: {
    marginTop: 12, // Adjusted for smaller size
    fontSize: 13.5, // 25% smaller than 18
    textAlign: "center",
  },
});

export default TopCreators;
