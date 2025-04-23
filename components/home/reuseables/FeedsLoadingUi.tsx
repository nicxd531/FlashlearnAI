import PulseAnimationContainer from "@/components/home/reuseables/PulseAnimationContainer";
import { FC } from "react";
import { StyleSheet, View } from "react-native";

interface Props {
  items?: number;
}

const FeedsLoadingUi: FC<Props> = ({ items = 8 }) => {
  const dummyData = new Array(items).fill("");
  return (
    <PulseAnimationContainer>
      <View style={styles.itemsContainer}>
              {dummyData.map((_, index) => {
                return <View key={index} style={styles.dummyListItem} >
                    <View style={{ width:"95%", height:70 , borderRadius: 15,marginTop:10,marginBottom:10,flexDirection:"row",alignItems:"center"}}>
                        <View style={{ width:"20%", height:70 , backgroundColor: "#d2cfd9", borderRadius: 50,marginTop:10,marginBottom:10,marginLeft:10}}/>
                        <View style={{flex:1}}> 
                        <View style={{ width:"50%", height:20 , backgroundColor: "#d2cfd9", borderRadius: 10,marginTop:5,marginBottom:5}}/>
                        <View style={{ width:"50%", height:20 , backgroundColor: "#d2cfd9", borderRadius: 10,marginTop:5,marginBottom:5}}/>
                        </View>
                    </View>
                    <View style={{ width:"95%", height:150 , backgroundColor: "#d2cfd9", borderRadius: 15,}}/>
                    <View style={{flex:1,height:50, width:"100%",flexDirection:"column",marginLeft:10,marginTop:10}}>
                    <View style={{ width:"50%", height:20 , backgroundColor: "#d2cfd9", borderRadius: 10,marginTop:5,marginBottom:5}}/>
                    <View style={{ width:"50%", height:20 , backgroundColor: "#d2cfd9", borderRadius: 10,marginTop:5,marginBottom:5}}/>
                    </View>
                </View>;
              })}
            </View>
    </PulseAnimationContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
  itemsContainer: {
    flex: 1,
   
    flexDirection: "column",
    justifyContent: "center",
    alignItems:"center",
    marginTop: 30,

  },
  dummyListItem: {
    width: "90%",
    height: 350,
    backgroundColor: "#d2cfd9",
    marginBottom: 15,
    borderRadius: 15,
padding:5,
    alignItems:"center",
  },
});

export default FeedsLoadingUi;
