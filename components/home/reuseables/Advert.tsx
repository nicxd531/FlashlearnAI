import React, { FC, useCallback } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Image } from "react-native-elements";
import Carousel from "react-native-snap-carousel";
import tw from "twrnc";

interface Props {}

const data = [
  {
    title: "Advert 1",
    image: require("../../../assets/images/advert1.jpg"),
  },
  {
    title: "Advert 2",
    image: require("../../../assets/images/advert2.jpg"),
  },
  {
    title: "Advert 3",
    image: require("../../../assets/images/advert3.jpg"),
  },
];

const Advert: FC<Props> = (props) => {
  const renderItem = useCallback(
    ({ item }: { item: { title: string; image: any } }) => (
      <View style={styles.item} key={item.title}>
        <Image
          style={{ width: 300, height: 200, borderRadius: 8 }}
          source={item.image}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
    ),
    []
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={500}
        itemWidth={300}
        loop={true}
        autoplay={true}
        autoplayInterval={9000}
        keyExtractor={(item: { title: string; image: any }, index: number) =>
          `${item.title}-${index}`
        }
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
});

export default React.memo(Advert);
