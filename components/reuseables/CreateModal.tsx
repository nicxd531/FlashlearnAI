import client from "@/components/api/client";
import { RootState } from "@/utils/store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import tw from "twrnc";
import {
  updateBusyStateQuestion,
  updateCreatedCollectionData,
} from "@/utils/store/Collection";
import { cardsInfoSchema } from "@/@types/reuseables";
import { toast, Toasts } from "@backpackapp-io/react-native-toast";
import axios from "axios";
import { getFromAsyncStorage, Keys } from "@/utils/asyncStorage";
import * as yup from "yup";
import colors from "@/constants/Colors";
import AddQuestionInput from "./AddQuestionInput";
import ListOfCards from "./ListOfCards";

interface NotificationModalProps {
  visible: boolean;
  onClose: () => void;
  message: string;
}

const CreateModal: React.FC<NotificationModalProps> = ({
  visible,
  onClose,
  message,
}) => {
  const { createdCollectionId, busyAQuestion, createdCollectionData } =
    useSelector((state: RootState) => (state as any).collection);
  // console.log("collectionId", collectionId);
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [errorM, setError] = useState<string | null>(null);
  const [qaList, setQaList] = useState<
    { question: string; answer: string; _id: string; collectionId: string }[]
  >([]);
  const dispatch = useDispatch();
  const addQaItem = async () => {
    dispatch(updateBusyStateQuestion(true));
    try {
      const finalData = await cardsInfoSchema.validate({ question, answer });
      if (question && answer) {
        const token = await getFromAsyncStorage(Keys.AUTH_TOKEN); // Fetch the token from AsyncStorage
        if (!token) {
          throw new Error("User is not authenticated. Token is missing.");
        }
        const { data } = await client.post(
          "/collection/create-Card",
          {
            question,
            answer,
            collectionId: createdCollectionId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add the Authorization header
            },
          }
        );
        toast.success("Card Created ", { icon: "🎉🎊" });
        const newData = data.collection.cards.map((card: any) => ({
          ...card,
          _id: card._id,
        }));
        dispatch(updateCreatedCollectionData(data.collection));
        setQaList([...newData]);
        setQuestion("");
        setAnswer("");
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        console.error(
          "Validation error:",
          (error as yup.ValidationError).message
        );
      } else if (axios.isAxiosError(error)) {
        console.error(
          "Axios error:",
          (error.response?.data?.message as string) || error.message
        );
        toast.error(
          (error.response?.data?.message as string) || error.message,
          { icon: "❌" }
        );
      } else {
        console.error("Unexpected error:", (error as Error).message || error);
        toast.error((error as Error).message || (error as string), {
          icon: "❌",
        });
      }
    } finally {
      dispatch(updateBusyStateQuestion(false));
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <MaterialCommunityIcons
                size={30}
                name="close"
              ></MaterialCommunityIcons>
            </TouchableOpacity>
          </View>
          <View style={tw`w-full items-center`}>
            <View>
              <Text style={styles.message}>{message}</Text>
              <AddQuestionInput
                question={question}
                setQuestion={setQuestion}
                answer={answer}
                setAnswer={setAnswer}
                addQaItem={addQaItem}
                busyAQuestion={busyAQuestion}
              />
              {busyAQuestion ? (
                <View style={styles.activityIndicatorContainer}>
                  <ActivityIndicator size="large" color={colors.SECONDARY} />
                </View>
              ) : (
                <ListOfCards
                  qaList={qaList}
                  setQaList={setQaList}
                  error={errorM}
                />
              )}
            </View>
          </View>
        </View>
      </View>
      <Toasts
        overrideDarkMode={true}
        globalAnimationType="spring"
        globalAnimationConfig={{
          duration: 1000,
          flingPositionReturnDuration: 200,
          stiffness: 50,
        }}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "90%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    height: "80%",
    overflow: "hidden",
  },
  message: {
    fontSize: 25,
    marginBottom: 20,
    marginHorizontal: "auto",
    fontWeight: "bold",
  },
  closeButton: {},
  addButton: {
    marginTop: 10,
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 300, // Adjust the height as needed
  },
});

export default CreateModal;
