import { CollectionData } from "@/@types/collection";
import { AuthStackParamList } from "@/@types/navigation";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
  Animated,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Image } from "react-native-elements";
import { Chip, IconButton, Text } from "react-native-paper";
import tw from "twrnc";
import { formatRelativeTime, getSource } from "../api/request";
import { flashcardPlaceholder } from "@/constants/Styles";
interface CollectionPreviewModalProps {
  setModalVisible: (visible: boolean) => void;
  modalVisible: boolean;
  data: CollectionData | null;
}

const CollectionPreviewModal: React.FC<CollectionPreviewModalProps> = ({
  setModalVisible,
  modalVisible,
  data,
}) => {
  console.log({ data });
  const [modalHeight] = useState(new Animated.Value(600)); // Initial height for preview
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const screenHeight = Dimensions.get("window").height;
  const image = require("../../assets/images/advert1.jpg");
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      modalHeight.setValue(gestureState.dy + 300); // Adjust the height dynamically
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dy < -50) {
        Animated.timing(modalHeight, {
          toValue: 800, // Full height
          duration: 300,
          useNativeDriver: false,
        }).start();
      } else if (gestureState.dy > 50) {
        Animated.timing(modalHeight, {
          toValue: 300, // Initial height
          duration: 300,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.timing(modalHeight, {
          toValue: 300, // Reset to initial height if not dragged enough
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    },
  });
  const createdAt = formatRelativeTime(data?.createdAt ?? "");

  useEffect(() => {
    if (typeof setModalVisible !== "function") {
      console.error("setModalVisible is not a function");
    }
  }, []);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <Animated.View
            style={[styles.modalContent, { height: modalHeight }]}
            {...panResponder.panHandlers}
          >
            <View style={styles.pullBar} />
            {data ? (
              <>
                <Image
                  style={{ width: 370, height: 200, borderRadius: 15 }}
                  source={getSource(
                    data?.poster?.url ?? "",
                    flashcardPlaceholder
                  )}
                  PlaceholderContent={<ActivityIndicator />}
                />

                <View>
                  <Text style={[tw`font-bold mt-4`]} variant="headlineLarge">
                    {data.title}
                  </Text>
                  <View style={[tw`justify-between flex-row mt-2 `]}>
                    <Chip style={tw`self-start`} textStyle={styles.chipContent}>
                      {data.category}
                    </Chip>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("CollectionPlay")}
                    >
                      <IconButton
                        icon={() => (
                          <MaterialIcons
                            name="play-circle-outline"
                            size={35}
                            color="#00000"
                          />
                        )}
                        iconColor={"#0000"}
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text>{createdAt}</Text>
                  <Text style={[tw`mt-4`]}>{data.description}</Text>

                  <View style={[tw`  flex-row mt-4`]}>
                    <Text style={[tw`font-bold  mr-7`]} variant="titleMedium">
                      Number of Cards:
                    </Text>
                    <Text variant="titleMedium">{data?.cards?.length}</Text>
                  </View>
                  <View style={[tw`  flex-row mt-4`]}>
                    <Text style={[tw`font-bold  mr-7`]} variant="titleMedium">
                      Author:
                    </Text>
                    <Text variant="titleMedium">
                      {data?.owner?.name ?? "Unknown"}
                    </Text>
                  </View>
                </View>
              </>
            ) : (
              <ActivityIndicator />
            )}
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  pullBar: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 2.5,
    alignSelf: "center",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
  },
  chipContent: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CollectionPreviewModal;
