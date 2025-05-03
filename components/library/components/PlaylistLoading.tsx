import PulseAnimationContainer from "@/components/home/reuseables/PulseAnimationContainer";
import { FC } from "react";
import { StyleSheet, View } from "react-native";

interface Props {
  dummyData: string[];
}

const PlaylistLoading: FC<Props> = (props) => {
  const { dummyData } = props;
  return (
    <PulseAnimationContainer>
      <View style={styles.container}>
        <View style={styles.dummyImage} />
        <View style={{ width: "100%", padding: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
              width: "100%",
              marginBottom: 50,
            }}
          >
            <View style={styles.dummyTitleView} />
            <View style={styles.dummyTitleView3} />
          </View>

          <View style={styles.dummyTopViewContainer}>
            {dummyData.map((_, index) => {
              return <View key={index} style={styles.dummyTopView} />;
            })}
          </View>
        </View>
      </View>
    </PulseAnimationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  dummyTitleView: {
    height: 30,
    width: 150,
    backgroundColor: "#ccc",
    marginBottom: 10,
    borderRadius: 16,
  },
  dummyTitleView3: {
    height: 30,
    width: 30,
    backgroundColor: "#ccc",
    marginBottom: 10,
    borderRadius: 30,
  },
  dummyTopView: {
    height: 30,
    width: 380,
    backgroundColor: "#ccc",
    marginRight: 10,
    borderRadius: 16,
    marginTop: 10,
  },
  dummyTopViewContainer: {
    flexDirection: "column",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  optionLabel: { fontSize: 16, marginLeft: 5 },
  dummyImage: {
    width: 390,
    height: 250,
    borderRadius: 15,
    backgroundColor: "#ccc",
    marginTop: 30,
  },
  dummyTitleView2: {
    height: 30,
    width: 75,
    backgroundColor: "#ccc",
    marginBottom: 10,
    borderRadius: 16,
  },
});

export default PlaylistLoading;
