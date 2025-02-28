import React, { FC } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Modalize } from "react-native-modalize";
import tw from "twrnc";
import { Image } from "react-native-elements";
import { Chip, IconButton, Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import SkeletonContent from "react-native-skeleton-content";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "@/@types/navigation";

interface Props {
  modalizeRef: React.RefObject<Modalize>;
}

const FeedsModal: FC<Props> = ({ modalizeRef }) => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const screenHeight = Dimensions.get("window").height;
  const image = require("../../../assets/images/advert1.jpg");

  return (
    <Modalize
      childrenStyle={tw`p-5`}
      ref={modalizeRef}
      snapPoint={screenHeight - 500} // Initial height of the modal (halfway)
      modalHeight={screenHeight} // Full height of the modal
    >
      <Image
        style={{ width: 370, height: 200, borderRadius: 15 }}
        source={image}
        PlaceholderContent={<ActivityIndicator />}
      />

      <View>
        <Text style={[tw`font-bold mt-4`]} variant="headlineLarge">
          Card name
        </Text>
        <View style={[tw`justify-between flex-row mt-2 align-center`]}>
          <Chip style={tw`self-start`} textStyle={styles.chipContent}>
            Category
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
        <Text>2 months ago</Text>
        <Text style={[tw`mt-4`]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text>

        <View style={[tw`align-center  flex-row mt-4`]}>
          <Text style={[tw`font-bold  mr-7`]} variant="titleMedium">
            Number of Cards:
          </Text>
          <Text variant="titleMedium">13</Text>
        </View>
        <View style={[tw`align-center  flex-row mt-4`]}>
          <Text style={[tw`font-bold  mr-7`]} variant="titleMedium">
            Author:
          </Text>
          <Text variant="titleMedium">Nicx</Text>
        </View>
      </View>
    </Modalize>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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

export default FeedsModal;
