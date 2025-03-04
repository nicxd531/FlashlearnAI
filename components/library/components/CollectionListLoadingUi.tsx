import PulseAnimationContainer from "@/components/home/reuseables/PulseAnimationContainer";
import { FC } from "react";
import { StyleSheet, View } from "react-native";

interface Props {
  items?: number;
}

const CollectionListLoadingUi: FC<Props> = ({ items = 8 }) => {
  const dummyData = new Array(items).fill("");
  return (
    <PulseAnimationContainer>
      <View style={styles.itemsContainer}>
        {dummyData.map((_, index) => {
          return <View key={index} style={styles.dummyListItem} />;
        })}
      </View>
    </PulseAnimationContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
  itemsContainer: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
  dummyListItem: {
    width: "45%",
    height: 200,
    backgroundColor: "#fff",
    marginBottom: 15,
    borderRadius: 10,
  },
});

export default CollectionListLoadingUi;
