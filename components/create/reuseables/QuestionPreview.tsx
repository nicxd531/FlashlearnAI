import { questionSection } from "@/@types/collection";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import TypeWriter from "react-native-typewriter";
import tw from "twrnc";

interface Props {
  data: questionSection[];
  setImages: (images: { url: string }[]) => { url: string }[];
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuestionPreview: FC<Props> = (props) => {
  const { data, setVisible, setImages } = props;
  const handleImagePress = (image: string) => {
    setImages([{ url: image }]);
    setVisible(true);
  };

  const renderItems = ({
    item,
    index,
  }: {
    item: questionSection;
    index: number;
  }) => {
    const image = item.image?.url;
    return (
      <View style={styles.itemContainer}>
        <Text style={tw`text-white text-lg `}>{item.text}</Text>
        {item.image ? (
          <Image
            onPress={() => handleImagePress(image)}
            source={{ uri: image }}
            style={styles.image}
          />
        ) : null}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={tw`text-white text-lg text-center`}>Questions</Text>
      <FlatList
        data={data}
        renderItem={renderItems}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ borderRadius: 8 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // width: "100%",
    paddingVertical: 5,
    borderRadius: 8,
  },
  itemContainer: {
    // padding: 1,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
    borderRadius: 8,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 8,
    resizeMode: "cover",
  },
});

export default QuestionPreview;
