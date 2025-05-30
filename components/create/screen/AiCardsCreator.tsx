import { AntDesign, Feather } from "@expo/vector-icons";
import { FC, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { ScrollView } from "react-native";
import { Image } from "react-native-elements";
import { useSelector } from "react-redux";
import tw from "twrnc";
import { FloatingAction } from "react-native-floating-action";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import { createNavigatorStackParamList } from "@/@types/navigation";
import { toast } from "@backpackapp-io/react-native-toast";
interface Props {
  route: any;
}

const AiCardsCreator: FC<Props> = ({ route }) => {
  const [active, setActive] = useState(false);
  const { collectionInfo } = route.params;
  const navigation =
    useNavigation<NavigationProp<createNavigatorStackParamList>>();

  const { busyACollection, collectionId } = useSelector(
    (state: any) => state.collection
  );
  const handleAi = () => {
    console.log("clicked");
    setActive(true);
    setTimeout(() => {
      setActive(false);
      toast.error("AI is not available yet", {
        icon: <AntDesign name="exclamationcircleo" size={24} color="red" />,
      });

      navigation.navigate("CardsPreview", {
        collectionInfo: collectionInfo,
      })
    }, 3000);
  };

  const ai = require("../../../assets/images/Ai-image.png");
  return (
    <View style={styles.container}>
      {/* Input field and send button */}
      <View style={[tw`justify-center w-full items-center flex`]}>
        <View style={styles.imageContainer}>
          <Image style={{ width: "100%", aspectRatio: 1 }} source={ai} />
        </View>
        <Text style={[tw`text-2xl font-bold`]}>Flashlearn AI</Text>
        <Text style={[tw`text-l `]}>
          Input prompt to generate your desired cards for {collectionInfo.title}
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Input AI Prompt" />
        <Pressable
          onPress={() =>
            navigation.navigate("CardsPreview", {
              collectionInfo: collectionInfo,
            })
          }
          style={styles.sendButton}
        >
          <Feather name="plus" size={18} color="black" />
        </Pressable>
        <Pressable style={styles.sendButton} onPress={() => handleAi()}>
          {active ? (
            <ActivityIndicator />
          ) : (
            <Feather
              onPress={() => handleAi()}
              name="send"
              size={18}
              color="black"
            />
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 100,
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  message: {
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 30,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  sendButton: {
    padding: 10,
    backgroundColor: "#ccc",
    borderRadius: 50,
    marginLeft: 10,
  },
  sendButton2: {
    padding: 10,
    backgroundColor: "#ccc",
    borderRadius: 50,
  },
  imageContainer: {
    height: 150,
    aspectRatio: 1,
  },
});

export default AiCardsCreator;
