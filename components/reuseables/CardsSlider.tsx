import React, { FC, useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
} from "react-native";
import FlipCard from "react-native-flip-card";
import { Text, Button } from "react-native-paper";
import Carousel from "react-native-snap-carousel";
import tw from "twrnc";
import TypeWriter from "react-native-typewriter";
import { getClient } from "../api/client";
import { useQueryClient } from "react-query";
import CorrectBtn from "./CorrectBtn";
import QuestionPreview from "../create/reuseables/QuestionPreview";
import { cards, CardsData } from "@/@types/collection";
import ImagePreview from "./ImagePreview";
import AnswerPreview from "../create/reuseables/AnswerPreview";
import deepEqual from "deep-equal";
import historyState from "@/utils/store/zustand/useHistory";
import { sendProgressToBackend } from "./request";

interface Props {
  stackStyle: string;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  data: cards[];
}
const CardsSlider: FC<Props> = (props) => {
  const { stackStyle, currentIndex, setCurrentIndex, data } = props;
  const historyId = historyState((state) => state.historyId);
  const collectionId = historyState((state) => state.collectionId);
  const correctCards = historyState((state) => state.correctCards);
  const progress = historyState((state) => state.progress);
  const owner = historyState((state) => state.owner);
  const points = historyState((state) => state.points);
  const durationInSeconds = historyState((state) => state.durationInSeconds);
  const queryClient = useQueryClient();
  const advert1 = require("../../assets/images/cardCover.jpg");
  const advert2 = require("../../assets/images/cardCover2.jpg");

  const extractCardIds = (cards: any[]): string[] => {
    return cards.map((card) => String(card._id));
  };
  const cardsIds = extractCardIds(data);
  const cardsData = {
    historyId: historyId,
    collectionId: collectionId,
    cards: cardsIds,
    correctCards: correctCards,
    progress: progress,
    owner: owner,
    points: points,
    durationInSeconds: durationInSeconds,
  }
  const [isFlipped, setIsFlipped] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [typingComplete, setTypingComplete] = useState<boolean[]>(
    new Array(data.length).fill(false)
  );

  const [visible, setVisible] = useState(false);
  const [images, setImages] = useState([]);
  const handleReveal = (id: string) => {
    if (isFlipped == id) {
      setIsFlipped("");
    } else {
      setIsFlipped(id);
    }
  };

  // Function to handle card click
  const handleCardClick = (index: number, data: cards[], cardsData: CardsData,) => {
    cardsData.collectionId = data[0].collectionId; // Update collectionId in cardsData
    cardsData.progress = index; // Update the index in mainData
    setSelectedIndex(index); // Update selected index
    setCurrentIndex(index);

    // Clear any existing timer
    if (timer) {
      clearTimeout(timer);
    }

    // Set a new timer to send progress after 5 seconds
    const newTimer = setTimeout(() => {
      sendProgressToBackend(data, queryClient, index, cardsData);
    }, 6000);

    setTimer(newTimer);
  };




  const isCurrentSlide = (index: number): boolean => {
    return index + 1 === selectedIndex ? true : false;
  };
  // Cleanup on unmount to avoid memory leaks
  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timer]);
  const renderItem = ({ item, index }: { item: cards; index: number }) => {
    const { answer, question } = item;

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
              style={{ width: 350, height: 600, borderRadius: 8 }}
              source={advert1}
            />
            <View
              style={tw`absolute inset-0 justify-center items-center bg-black bg-opacity-50 `}
            >
              <QuestionPreview
                setVisible={setVisible}
                setImages={setImages as any}
                data={question}
              />
            </View>
          </View>
          {/* Back Side */}
          <View style={styles.card}>
            <Image
              style={{ width: 350, height: 600, borderRadius: 8 }}
              source={advert2}
            />
            <View
              style={tw`absolute inset-0 justify-center items-center  bg-black bg-opacity-50`}
            >
              {isFlipped ? (
                <AnswerPreview
                  setVisible={setVisible}
                  setImages={setImages as any}
                  data={answer}
                />
              ) : (
                <Text style={tw`text-white text-lg text-center`}>answer</Text>
              )}
              <CorrectBtn id={item._id} collectionId={item._id} />
            </View>
          </View>
        </FlipCard>

        <Button
          mode="contained"
          onPress={() => handleReveal(item._id)}
          style={[tw`mt-4 `]}
        >
          Reveal
        </Button>

        <ImagePreview
          images={images}
          visible={visible}
          setVisible={setVisible}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        layout={stackStyle === "default" ? "default" : "stack"}
        data={data}
        renderItem={renderItem}
        sliderWidth={600}
        itemWidth={350}
        loop={true}
        autoplayInterval={3000}
        onSnapToItem={(index) => handleCardClick(index, data, cardsData)}
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
    width: 350,
    height: 600,
  },
  card: {
    width: 350,
    height: 600,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CardsSlider;
