import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
// import Feeds from "../Feeds";
import { GestureResponderEvent } from "react-native";
import Feeds from "./reuseables/Feeds";

interface Props {
  onOpen: (event: GestureResponderEvent) => void;
}

const data = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    avatar:
      "https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg",
    name: "John Doe",
    time: "2 hours ago",
    info: "cards for technology ",
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    avatar:
      "https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg",
    name: "Jane Smith",
    time: "3 hours ago",
    info: "cards for technology ",
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    avatar:
      "https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg",
    name: "Jane Smith",
    time: "3 hours ago",
    info: "cards for technology ",
  },
  // Add more items as needed
];

const DiscoverScreen: React.FC<Props> = (props) => {
  const { onOpen } = props;
  const renderItem = ({ item }: { item: (typeof data)[0] }) => (
    <Feeds
      onOpen={onOpen}
      image={item.image}
      avatar={item.avatar}
      name={item.name}
      info={item.info}
      time={item.time}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
      <Text> discover</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
  },
  listContent: {
    padding: 16,
  },
});

export default DiscoverScreen;
