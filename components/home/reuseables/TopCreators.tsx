import client, { getClient } from "@/components/api/client";
import { handleError } from "@/components/api/request";
import { backgroundImage, faceImage } from "@/constants/Styles";
import {
  fetchCollectionsByProfile,
  fetchTopCreators,
  useFetchTopCreators,
} from "@/hooks/query";
import { getFromAsyncStorage, Keys } from "@/utils/asyncStorage";
import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { Surface, Card, Avatar } from "react-native-paper";
import PulseAnimationContainer from "./PulseAnimationContainer";
import colors from "@/constants/Colors";
import { CollectionData, topCreatorsData } from "@/@types/collection";

type Creator = {
  id: string;
  name: string;
  avatar: string;
  backgroundCover: string;
};

const TopCreators: React.FC = () => {
  const { data, isLoading } = useFetchTopCreators();

  const renderItem = ({ item }: { item: topCreatorsData }) => (
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
  const dummyData = new Array(4).fill("");

  if (isLoading) {
    return (
      <PulseAnimationContainer>
        <View style={styles.container}>
          <View style={styles.dunmmyTitleView} />
          <View style={styles.dummyTopViewContainer}>
            {dummyData.map((_, index) => {
              return <View key={index} style={styles.dummyTopView} />;
            })}
          </View>
        </View>
      </PulseAnimationContainer>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Top Creators</Text>
      <FlatList
        data={data}
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
  dunmmyTitleView: {
    height: 20,
    width: 150,
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 16,
  },
  dummyTopView: {
    height: 150,
    width: 112.5,
    backgroundColor: "white",
    marginRight: 10,
    borderRadius: 16,
  },
  dummyTopViewContainer: {
    flexDirection: "row",
  },
});

export default TopCreators;
