import PulseAnimationContainer from '@/components/home/reuseables/PulseAnimationContainer';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native'

interface Props {}

const ProfilePreviewLoadingUI: FC<Props> = (props) => {
  return <PulseAnimationContainer>
  <View style={{ marginTop: 50, alignItems: "center", flex: 1 }}>
    <View style={styles.dummyTitleView} />
  </View>
  <View style={{ width: 70, height: 500 }} />
  <View style={{ width: 70, height: 30 }} />
  <View style={{ width: 70, height: 30 }} />
  <View style={{ width: 70, height: 30 }} />
</PulseAnimationContainer>
};

const styles = StyleSheet.create({
  container: {
    
  },
  dummyTitleView: {
    height: 200,
    width: "100%",
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 16,
  },
  dummyTopView: {
    height: 150,
    width: 250,
    backgroundColor: "white",
    marginRight: 10,
    borderRadius: 16,
  },
  dummyTopViewContainer: {
    flexDirection: "row",
  },
});

export default ProfilePreviewLoadingUI;