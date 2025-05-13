import EmptyRecords from "@/components/library/components/EmptyRecords";
import { FC } from "react";
import React, { useState } from "react";
import { View, TouchableOpacity, Animated, StyleSheet } from "react-native";
import { deleteItem } from "../hooks/request";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { Text } from "react-native-paper";
import tw from "twrnc";
import FullCardComp from "@/components/reuseables/FullCardComp";
import FullCardDisplay from "./FullCardDisplay";
import { ScrollView } from "react-native";

interface Card {
  question: {
    text: string;
    image: { url: string | null; publicId: string | null };
  }[];
  answer: {
    text: string;
    image: { url: string | null; publicId: string | null };
  }[];
  _id: string;
  collectionId: string;
}

interface Props {
  cards: Card[];
}

const CardsPreviewList: FC<Props> = (props) => {
  const { cards = [] } = props;
  const dispatch = useDispatch();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [mainCards, setMainCards] = useState<Card[]>(cards);
  const animations = props?.cards?.map(
    () => useState(new Animated.Value(0))[0]
  );

  const handlePress = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
      Animated.timing(animations[index], {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      setExpandedIndex(index);
      Animated.timing(animations[index], {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const cardHeights = animations.map((animation) =>
    animation.interpolate({
      inputRange: [0, 1],
      outputRange: [50, 1000], // Adjust the height values as needed
    })
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[tw`font-bold mb-5`]} variant="titleMedium">
        List Of Available cards
      </Text>
      {mainCards ? (
        mainCards?.map((card, index) => (
          <TouchableOpacity key={index} onPress={() => handlePress(index)}>
            <Animated.View
              style={[
                styles.card,
                expandedIndex === index && {
                  height: cardHeights[index],
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <View style={{ width: "90%" }}>
                  <Text ellipsizeMode="tail" numberOfLines={1}>
                    Q: {card.question[0].text}
                  </Text>
                  {expandedIndex === index && (
                    <ScrollView
                      contentContainerStyle={{
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{ textTransform: "capitalize" }}
                        variant="titleLarge"
                      >
                        full question
                      </Text>
                      <View>
                        <Text
                          variant="titleMedium"
                          style={{
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          Questions
                        </Text>

                        {card?.question?.map((item, index) => {
                          const { text, image } = item;

                          return (
                            <FullCardDisplay text={text} image={image.url} />
                          );
                        })}
                        <Text variant="titleMedium">Answers</Text>

                        {card?.answer?.map((item, index) => {
                          const { text, image } = item;

                          return (
                            <FullCardDisplay text={text} image={image.url} />
                          );
                        })}
                      </View>
                    </ScrollView>
                  )}
                </View>

                <TouchableOpacity
                  onPress={() =>
                    deleteItem(
                      index,
                      card._id,
                      card.collectionId,
                      dispatch,
                      setMainCards
                    )
                  }
                  style={styles.icon}
                >
                  <MaterialCommunityIcons name="delete" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </Animated.View>
          </TouchableOpacity>
        ))
      ) : (
        <EmptyRecords title={"no available cards in this collection 😔"} />
      )}
      <View style={{ marginBottom: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 2,
    overflow: "hidden",
    marginTop: 10,
    width: "100%",
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 50,
  },
});

export default CardsPreviewList;
