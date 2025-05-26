import { CollectionData } from '@/@types/collection';
import { flashcardPlaceholder } from '@/constants/Styles';
import { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Image } from 'react-native-elements';
import { Text } from 'react-native-paper';

interface Props {
    index:number;
    handlePlay: (data: CollectionData , id: string) => void;
    item: CollectionData;
}

const PlaylistCollection: FC<Props> = (props) => {
    const {index,item  } = props;
  return    <TouchableOpacity
              key={index}
              // onPress={() => handlePlay(item, item?.id as string)}
              style={[
                styles.item,
                {
                  flexDirection: "row",
  
                  justifyContent: "flex-start",
                  padding: 10,
                  width: "60%",
                  marginLeft: 5,
                },
              ]}
            >
              <Text variant="titleLarge">{index + 1}</Text>
              <View style={styles.chipContent}>
                <Image
                  source={
                    item.poster
                      ? { uri: item.poster as any }
                      : flashcardPlaceholder
                  }
                  style={{ width: 50, height: 50, marginLeft: 40 }}
                />
                <View>
                  <Text
                    numberOfLines={1}
                    variant="titleLarge"
                    style={{ marginLeft: 40 }}
                  >
                    {item?.title}
                  </Text>
                  <Text
                    numberOfLines={1}
                    variant="titleMedium"
                    style={{ marginLeft: 40 }}
                  >
                    {item?.cards?.length ? item?.cards?.length : 0} Cards
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
};

const styles = StyleSheet.create({
  container: {},
  item: {
    justifyContent: "center",
    alignItems: "center",
  },
  chipContent: {
    alignItems: "center",
    flexDirection: "row",
  },
});

export default PlaylistCollection;