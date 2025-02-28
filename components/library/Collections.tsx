import { useFetchCollectionsByProfile } from "@/hooks/query";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {}

const Collections: FC<Props> = (props) => {
  // const { data, isLoading } = useFetchCollectionsByProfile();
  // console.log({ data });
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, color: "black" }}>Collections</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Collections;
