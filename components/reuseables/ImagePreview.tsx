import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FC, useEffect } from "react";
import { BackHandler } from "react-native";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

interface Props {
  visible?: boolean;
  images: {
    url: string;
  }[];
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImagePreview: FC<Props> = (props) => {
  const { visible, images, setVisible } = props;
  const icon = (
    <View
      style={{ flexDirection: "row", justifyContent: "flex-end", padding: 10 }}
    >
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setVisible(false)}
      >
        <MaterialCommunityIcons size={30} name="close"></MaterialCommunityIcons>
      </TouchableOpacity>
    </View>
  );
  useEffect(() => {
    const backAction = () => {
      setVisible(false);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Cleanup
  });
  return (
    <Modal visible={visible} transparent={true}>
      <ImageViewer
        imageUrls={images}
        renderHeader={() => icon}
        backgroundColor={"white"}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {},
  closeButton: {},
});

export default ImagePreview;
