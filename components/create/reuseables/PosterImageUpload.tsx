import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { FC, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { IconButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { handleError } from "@/components/api/request";
import { Image } from "react-native-elements";

interface Props {
  posterPhoto: string;
  setPosterPhoto: (photo: string) => void;
}

const PosterImageUpload: FC<Props> = (props) => {
  const { posterPhoto, setPosterPhoto } = props;
  const [image, setImage] = useState<string | undefined>();
  const saveImage = (image: any) => {
    try {
      setImage(image);
      setPosterPhoto(image);
    } catch (error) {
      throw error;
    }
  };
  const handleImageSelect = async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [7, 4],
        quality: 1,
      });
      if (!result.canceled) {
        await saveImage(result.assets[0].uri);
        // setUserInfo({ ...userInfo, avatar: result.assets[0].uri });
      }
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <View style={styles.container}>
      {posterPhoto ? (
        <View style={styles.imageContainer}>
          <View style={{ width: 350, height: 200 }}>
            <Image
              style={{ width: 350, height: 200, borderRadius: 8 }}
              source={{ uri: posterPhoto }}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
          <TouchableOpacity style={styles.imageIcon}>
            <IconButton
              onPress={() => setPosterPhoto("")}
              style={{ backgroundColor: "#d2cfd9" }}
              icon={() => <Ionicons name="close" size={20} color="black" />}
              iconColor={"#d2cfd9"}
              size={10}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={() => handleImageSelect()}>
          <IconButton
            icon={() => <AntDesign name="camerao" size={70} color="#d2cfd9" />}
            iconColor={"#d2cfd9"}
            size={70}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "#d2cfd9",
    height: 200,
    width: 350,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  imageContainer: {
    position: "relative",
  },
  imageIcon: {
    position: "absolute",
    top: 5,
    left: 300,
  },
});

export default PosterImageUpload;
