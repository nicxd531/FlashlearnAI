import EmptyRecords from "@/components/library/components/EmptyRecords";
import { FC } from "react";
import React, { useState } from "react";
import { View, TouchableOpacity, Animated, StyleSheet } from "react-native";
import { deleteItem } from "../hooks/request";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { Text } from "react-native-paper";
import tw from "twrnc";

interface Card {
  question: string;
  answer: string;
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
  const animations = props.cards.map(() => useState(new Animated.Value(0))[0]);

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
      outputRange: [50, 150], // Adjust the height values as needed
    })
  );

  return (
    <View style={styles.container}>
      <Text style={[tw`font-bold `]} variant="titleMedium">
        List Of Available cards
      </Text>
      {mainCards ? (
        mainCards.map((card, index) => (
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
                }}
              >
                <View>
                  <Text>Q: {card.question}</Text>
                  {expandedIndex === index && <Text> A: {card.answer}</Text>}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 2,
    overflow: "hidden",
  },
});

export default CardsPreviewList;
