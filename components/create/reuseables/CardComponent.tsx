import { handleError } from "@/components/api/request";
import { FC, useState } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { StyleSheet, View, Text } from "react-native";
import { IconButton, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Image } from "react-native-elements";

interface Props {
  data: { text: string; image: string | null }[];
  setData: React.Dispatch<
    React.SetStateAction<{ text: string; image: string | null }[]>
  >;
  index: number;
  key: number;
}

const CardComponent: FC<Props> = (props) => {
  const { data, setData, index } = props;
  const [image, setImage] = useState<string>();
  // Function to add a new post entry
  const addNewPost = () => {
    setData([...data, { text: "", image: null }]);
  };
  const saveImage = (image: any) => {
    try {
      setImage(image);
      //   setPosterPhoto(image);
    } catch (error) {
      throw error;
    }
  };
  // Handle changes in the text input for a specific post
  interface TextChangeEvent {
    target: {
      value: string;
    };
  }
  const handleTextChange = (index: number, event: any): void => {
    const newPosts = [...data];
    newPosts[index].text = event.nativeEvent.text;

    setData(newPosts);
  };
  const handleImageSelect = async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        // aspect: [7, 4],
        quality: 1,
      });
      if (!result.canceled) {
        await saveImage(result.assets[0].uri);
        const newPosts = [...data];
        if (result.assets[0].uri) {
          newPosts[index].image = result.assets[0].uri;
          setData(newPosts);
        }
        // setUserInfo({ ...userInfo, avatar: result.assets[0].uri });
      }
    } catch (error) {
      handleError(error);
    }
  };
  const handleRemove = () => {
    if (data.length < 2) return;
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };
  const handleImageRemove = (index: number) => {
    const newPosts = [...data];
    newPosts[index].image = null;
    setData(newPosts);
    setImage("");
  };
  // Function to handle image removal for a specific post
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "#d2cfd9" }}>{`post ${index + 1}`}</Text>
        {data.length < 2 ? null : (
          <TouchableOpacity onPress={() => handleRemove()}>
            <IconButton
              icon={() => <Ionicons name="close" size={20} color="#d2cfd9" />}
              iconColor={"#d2cfd9"}
              size={10}
            />
          </TouchableOpacity>
        )}
      </View>
      <TextInput
        value={data[index].text}
        placeholder="Add content !"
        style={{ borderWidth: 0, padding: 0, backgroundColor: "#fff" }}
        multiline={true}
        mode="flat"
        placeholderTextColor={"#d2cfd9"}
        onChange={(event: any) => handleTextChange(index, event)}
      />
      <View style={styles.imageMainContainer}>
        {data[index].image ? (
          <View style={styles.imageContainer}>
            <View style={{ width: 350, height: 200 }}>
              <Image
                style={{ width: 350, height: 200, borderRadius: 8 }}
                source={{ uri: data[index].image }}
                PlaceholderContent={<ActivityIndicator />}
              />
            </View>
            <TouchableOpacity style={styles.imageIcon}>
              <IconButton
                onPress={() => handleImageRemove(index)}
                style={{ backgroundColor: "#d2cfd9" }}
                icon={() => <Ionicons name="close" size={20} color="black" />}
                iconColor={"#d2cfd9"}
                size={10}
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {data[index].image ? null : (
          <TouchableOpacity onPress={() => handleImageSelect()}>
            <IconButton
              icon={() => (
                <AntDesign name="camerao" size={30} color="#d2cfd9" />
              )}
              iconColor={"#d2cfd9"}
              size={30}
            />
          </TouchableOpacity>
        )}
        {data.length > index + 1 || data.length >= 3 ? null : (
          <TouchableOpacity onPress={() => addNewPost()}>
            <IconButton
              icon={() => (
                <MaterialCommunityIcons name="plus" size={30} color="#d2cfd9" />
              )}
              iconColor={"#d2cfd9"}
              size={30}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  imageMainContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    borderColor: "#d2cfd9",
    height: 200,
    width: 350,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  imageIcon: {
    position: "absolute",
    top: 5,
    left: 300,
  },
});

export default CardComponent;
