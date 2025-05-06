import { flashcardPlaceholder } from '@/constants/Styles';
import { FC } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ActivityIndicator, IconButton, Text } from 'react-native-paper';
import { useFetchCollectionData } from '../hooks/query';
import tw from 'twrnc';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { updateCollectionData, updateCollectionId } from '@/utils/store/Collection';
import { CollectionData } from '@/@types/collection';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';
import { libraryNavigatorStackParamList } from '@/@types/navigation';

interface Props {
    id: string
}

const PlaylistImage: FC<Props> = (props) => {
    const navigation =
        useNavigation<NavigationProp<libraryNavigatorStackParamList>>();
    const { id } = props;
     const dispatch = useDispatch();
    const { data, isLoading } = useFetchCollectionData(id);
    // console.log("data", data)
    const poster = data?.poster;
      const handlePlay = (data: CollectionData, id: string) => {
        dispatch(updateCollectionData(data));
        dispatch(updateCollectionId(id));
        navigation.navigate("collectionPreview");
      };
  return <View style={styles.container}>
  <ImageBackground
        style={{
          width: 420,
          height: 250,
          borderRadius: 15,
          justifyContent: "center",
          alignItems: "center",
        }}
        source={
          poster ? { uri: poster?.url } : flashcardPlaceholder
        }
        // imageStyle={{ borderRadius: 15 }}
      >
        {!poster && (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={{ position: "absolute" }}
          />
        )}
        <View style={styles.textContainer}>

        <Text variant='displaySmall' style={styles.text}>{data?.title}</Text>
        </View>
      </ImageBackground>
      <View style={{flexDirection:"row",justifyContent:"space-between",width:"95%"}}>

      <View style={styles.totalCards }>
        <Text variant='titleMedium'>Total Cards :</Text>
        <Text style={[tw`ml-4`]} variant='titleMedium'>{data?.cards?.length}</Text>
      </View>
      <TouchableOpacity onPress={() => handlePlay(data, data.id)}>
            <IconButton
              icon={() => (
                <MaterialIcons
                  name="play-circle-outline"
                  size={35}
                  color="#00000"
                />
              )}
              iconColor={"#0000"}
              size={20}
            />
          </TouchableOpacity>
      </View>
      
      </View>;
};

const styles = StyleSheet.create({
  container: {
   
  },
  textContainer:{
    flex:1,
    width:"100%",
    alignItems:"flex-start",
    backgroundColor:"rgba(0, 0, 0, 0.14)", 
    justifyContent:"flex-end",
    borderRadius: 15,
    padding:10,
 },

  text:{
color:"white",
  },
  totalCards:{
    flexDirection:"row",
    padding:10,
  }
});

export default PlaylistImage;