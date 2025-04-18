import AppHeader from "@/components/library/components/AppHeader";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FC, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import AddQuestions from "../reuseables/AddQuestions";
import AddAnswers from "../reuseables/AddAnswers";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Btn from "../reuseables/Btn";

interface Props {}

const AddCards: FC<Props> = (props) => {
  const [question, setQuestion] = useState([{ text: "", image: null }]);
  const [answer, setAnswer] = useState([{ text: "", image: null }]);
  const [busy, setBusy] = useState(false);
  const Tab = createMaterialTopTabNavigator();
  const handleSubmit = async () => [console.log("submitting")];
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AppHeader title="Add Cards" />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBarStyles,
          tabBarLabelStyle: styles.tabBarLabelStyles,
        }}
      >
        <Tab.Screen name="Question">
          {(props) => (
            <AddQuestions question={question} setQuestion={setQuestion} />
          )}
        </Tab.Screen>
        <Tab.Screen name="Answer">
          {(props) => <AddAnswers answer={answer} setAnswer={setAnswer} />}
        </Tab.Screen>
      </Tab.Navigator>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,

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
