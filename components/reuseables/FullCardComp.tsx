import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import tw from "twrnc";
import colors from "@/constants/Colors";
import { Text } from "react-native-paper";
import * as Progress from "react-native-progress";
import CardsSlider from "./CardsSlider";

interface Props {
  stackStyle: any;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  data: any[];
  progress: number;
}

const FullCardComp: FC<Props> = (props) => {
  const { stackStyle, currentIndex, setCurrentIndex, data, progress } = props;
 
  return data ? (
    <>
      <CardsSlider
        stackStyle={stackStyle}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        data={data}
      />

      <View
        style={tw`flex-row justify-center items-center w-full m-auto mt-10 flex-col`}
      >
        <Progress.Bar progress={progress} width={200} color={colors.PRIMARY} />

        <Text style={[styles.counter, tw`mt-2`]}>
          {currentIndex + 1} / {data.length}
        </Text>
      </View>
    </>
  ) : (
    <View style={tw`flex-1`}>
      <Text variant={"bodyLarge"}>no card available for display 😔</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  counter: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default FullCardComp;
