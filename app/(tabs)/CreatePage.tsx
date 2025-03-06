import TopAppBar from "@/components/reuseables/TopAppBar";
import React, { FC, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CreateCollectionPage from "../(create)/CreateCollectionPage";
import { defaultForm } from "@/@types/reuseables";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AiCardsCreator from "@/components/create/screen/AiCardsCreator";
import ManualCardsCreation from "@/components/create/screen/ManualCardsCreation";
import CardsPreview from "@/components/create/screen/CardsPreview";

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
  },
});

export default CreatePage;
