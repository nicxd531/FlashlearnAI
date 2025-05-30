import AppHeader from "@/components/library/components/AppHeader";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FC, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import AddQuestions from "../reuseables/AddQuestions";
import AddAnswers from "../reuseables/AddAnswers";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Btn from "../reuseables/Btn";
import { handleError } from "@/components/api/request";
import client from "@/components/api/client";
import { getFromAsyncStorage, Keys } from "@/utils/asyncStorage";
import { useSelector } from "react-redux";
import { toast } from "@backpackapp-io/react-native-toast";
import { useFetchCardsCreate } from "../hooks/query";
import CardsPreview from "./CardsPreview";
import CardsPreviewList from "../reuseables/CardsPreviewList";
import { SafeAreaView } from "react-native";
import { useQueryClient } from "react-query";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import { createNavigatorStackParamList } from "@/@types/navigation";

interface Props { }

const AddCards: FC<Props> = (props) => {
  const navigation =
    useNavigation<NavigationProp<createNavigatorStackParamList>>();
  const { createBusyState, createdCollectionId } = useSelector(
    (state: any) => state.collection
  );
  const queryClient = useQueryClient();
  const { data, isLoading } = useFetchCardsCreate(createdCollectionId);
  const [question, setQuestion] = useState<
    { text: string; image: string | null }[]
  >([{ text: "", image: null }]);
  const [answer, setAnswer] = useState<
    { text: string; image: string | null }[]
  >([{ text: "", image: null }]);
  const [busy, setBusy] = useState(false);
  type TabParamList = {
    Question: undefined;
    Answer: undefined;
  };
  const Tab = createMaterialTopTabNavigator<TabParamList>();
  const handleSubmit = async () => {
    setBusy(true);
    try {
      const formData = new FormData();
      question.forEach((q, index) => {
        formData.append(`question[${index}][text]`, q.text || "");
        if (q.image) {
          const imageData = {
            uri: q.image,
            name: `${q.text ? q.text : "questionPhoto"}.jpg`,
            type: "image/jpeg",
          };
          formData.append(`question[${index}][image]`, imageData as any);
        } else {
          formData.append(`question[${index}][image]`, "");
        }
      });
      answer.forEach((a, index) => {
        formData.append(`answer[${index}][text]`, a.text || "");
        if (a.image) {
          const imageData = {
            uri: a.image,
            name: `${a.text ? a.text : "answerPhoto"}.jpg`,
            type: "image/jpeg",
          };
          formData.append(`answer[${index}][image]`, imageData as any);
        } else {
          formData.append(`answer[${index}][image]`, "");
        }
      });

      // Other data
      formData.append("collectionId", createdCollectionId);
      const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
      if (!token) {
        throw new Error("User is not authenticated. Token is missing.");
      }
      const response = await client.post("/collection/create-Card", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        queryClient.invalidateQueries({
          queryKey: ["cardsCreate", createdCollectionId],
        });
        toast.success("Card Created ", { icon: "🎉🎊" });
        setQuestion([{ text: "", image: null }]);
        setAnswer([{ text: "", image: null }]);
        queryClient.invalidateQueries({
          queryKey: ["fetchCollectionData"],
        });
        navigation.goBack();
      }
    } catch (err) {
      handleError(err);
      console.log(err);
      setBusy(false);
    }
    setBusy(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Add Cards" />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Btn
          handleSubmit={handleSubmit}
          busy={busy}
          title="Save Card"
          iconName="content-save"
        />
      </View>
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: styles.tabBarStyles,
            tabBarLabelStyle: styles.tabBarLabelStyles,
          }}
        >
          <Tab.Screen
            name="Question"
            children={() => (
              <AddQuestions question={question} setQuestion={setQuestion} />
            )}
          />
          <Tab.Screen
            name="Answer"
            children={() => (
              <AddAnswers answer={answer} setAnswer={setAnswer} />
            )}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "#fff",
  },
  tabBarStyles: {
    elevation: 0,
    shadowRadius: 0,
    shadowColor: "transparent",
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    // opacity: 0,
  },
  tabBarLabelStyles: {
    // color: colors.CONTRAST,
    fontSize: 12,
  },
});

export default AddCards;
