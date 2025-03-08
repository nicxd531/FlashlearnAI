import React, { FC, useState } from "react";
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
              <Text style={tw`text-white text-lg text-center`}>
                {item.question}
              </Text>
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
                  {item.answer}
                </TypeWriter>
              ) : (
                <Text style={tw`text-white text-lg text-center`}>
                  {item.answer}
                </Text>
              )}
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
        onSnapToItem={(index) => setCurrentIndex(index)}
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
