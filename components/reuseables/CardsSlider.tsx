import React, { FC, useEffect, useState } from "react";
import {
  View,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import FlipCard from "react-native-flip-card";
import { Text, Button } from "react-native-paper";
import Carousel from "react-native-snap-carousel";
import tw from "twrnc";
import TypeWriter from "react-native-typewriter";
import { getClient } from "../api/client";
import { useQueryClient } from "react-query";
import CorrectBtn from "./CorrectBtn";

interface Props {
  stackStyle: string;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  data: {
    question: string;
    answer: string;
    _id: string;
    collectionId: string;
  }[];
}
const CardsSlider: FC<Props> = (props) => {
  const queryClient = useQueryClient();
  const advert1 = require("../../assets/images/cardCover.jpg");
  const advert2 = require("../../assets/images/cardCover2.jpg");

  const { stackStyle, currentIndex, setCurrentIndex, data } = props;

  const [isFlipped, setIsFlipped] = useState<string>("");
  const handleReveal = (id: string) => {
    if (isFlipped == id) {
      setIsFlipped("");
    } else {
      setIsFlipped(id);
    }
  };
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  // Function to handle card click
  const handleCardClick = (index: number) => {
    setSelectedIndex(index); // Update selected index

    // Clear any existing timer
    if (timer) {
      clearTimeout(timer);
    }

    // Set a new timer to send progress after 5 seconds
    const newTimer = setTimeout(() => {
      sendProgressToBackend(index);
    }, 5000);

    setTimer(newTimer);
  };

  // Function to send progress to the backend
  const sendProgressToBackend = async (index: number) => {
    try {
      const client = await getClient();
      const { data: data1 } = await client.post("/history", {
        cardsCollection: data[0].collectionId,
        progress: index,
        date: new Date(Date.now()),
        points: 0,
      });
      queryClient.invalidateQueries({
        queryKey: ["histories"],
      });
      queryClient.invalidateQueries({
        queryKey: ["recentlyPlayed"],
      });
      console.log(data1);
    } catch (error) {
      console.error("❌ Network error:", error);
    }
  };

  // Cleanup on unmount to avoid memory leaks
  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timer]);
  const renderItem = ({
    item,
  }: {
    item: {
      question: string;
      answer: string;
      _id: string;
      collectionId: string;
    };
  }) => {
    return (
      <View style={styles.item}>
        <FlipCard
          style={styles.flipCard}
          flip={isFlipped === item._id}
          clickable={false}
        >
          {/* Front Side */}
          <View style={styles.card}>
            <Image
              style={{ width: 300, height: 400, borderRadius: 8 }}
              source={advert1}
            />
            <View
              style={tw`absolute inset-0 justify-center items-center p-4 bg-black bg-opacity-50`}
            >
              <Text style={tw`text-white text-lg text-center`}>question</Text>
            </View>
          </View>
          {/* Back Side */}
          <View style={styles.card}>
            <Image
              style={{ width: 300, height: 400, borderRadius: 8 }}
              source={advert2}
            />
            <View
              style={tw`absolute inset-0 justify-center items-center p-4 bg-black bg-opacity-50`}
            >
              {isFlipped ? (
                <TypeWriter
                  typing={1}
                  minDelay={10}
                  maxDelay={100}
                  style={tw`text-white text-lg text-center`}
                >
                  answer
                </TypeWriter>
              ) : (
                <Text style={tw`text-white text-lg text-center`}>answer</Text>
              )}
              <CorrectBtn id={item._id} collectionId={item.collectionId} />
            </View>
          </View>
        </FlipCard>
        <Button
          mode="contained"
          onPress={() => handleReveal(item._id)}
          style={tw`mt-4`}
        >
          Reveal
        </Button>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        layout={stackStyle === "default" ? "default" : "stack"}
        data={data}
        renderItem={renderItem}
        sliderWidth={400}
        itemWidth={300}
        loop={true}
        autoplayInterval={3000}
        onSnapToItem={(index) => handleCardClick(index)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
  },
  flipCard: {
    width: 300,
    height: 400,
  },
  card: {
    width: 300,
    height: 400,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CardsSlider;
