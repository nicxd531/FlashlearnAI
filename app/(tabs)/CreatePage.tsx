import TopAppBar from "@/components/reuseables/TopAppBar";
import React, { FC, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { defaultForm } from "@/@types/reuseables";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AiCardsCreator from "@/components/create/screen/AiCardsCreator";
import ManualCardsCreation from "@/components/create/screen/ManualCardsCreation";
import CardsPreview from "@/components/create/screen/CardsPreview";
import CreateCollectionPage from "@/components/create/screen/CreateCollectionPage";
import AddCards from "@/components/create/screen/AddCards";

interface Props {}

const CreatePage: FC<Props> = (props) => {
  const Stack = createNativeStackNavigator();
  return (
    <View style={styles.container}>
      <TopAppBar />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="CreateCollectionPage"
          component={CreateCollectionPage}
        />
        <Stack.Screen name="AiCardsCreator" component={AiCardsCreator} />
        <Stack.Screen name="AddCards" component={AddCards} />
        <Stack.Screen
          name="ManualCardsCreation"
          component={ManualCardsCreation}
        />
        <Stack.Screen name="CardsPreview" component={CardsPreview} />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default CreatePage;
