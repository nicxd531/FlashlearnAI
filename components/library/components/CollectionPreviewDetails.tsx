import { CollectionData } from '@/@types/collection';
import { formatRelativeTime } from '@/components/api/request';
import PublicProfilePreview from '@/components/reuseables/PublicProfilePreview';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper';
import tw from 'twrnc';

interface Props {
  collectionData: CollectionData
}

const CollectionPreviewDetails: FC<Props> = (props) => {
  const { collectionData } = props
  const createdAt = formatRelativeTime(collectionData?.createdAt);
  const updatedAt = formatRelativeTime(collectionData?.updatedAt);
  return <View>
    <PublicProfilePreview profile={collectionData.owner as any} />
    <View style={tw`p-4 bg-white shadow-md rounded-md mb-4 mt-5`}>
      <Text style={tw`text-xl font-bold capitalize`}>
        {collectionData?.title}
      </Text>
      <Text variant={"bodyLarge"} style={tw`text-base text-gray-600 mt-2`}>
        → description: {collectionData?.description}
      </Text>
      <Text variant={"labelLarge"} style={tw`text-base text-gray-600 mt-2`}>
        →  category: {collectionData?.category}
      </Text>
      <Text variant={"labelLarge"} style={tw`text-base text-gray-600 mt-2`}>
        →  visibility: {collectionData?.visibility}
      </Text>
      <Text variant={"labelLarge"} style={tw`text-base text-gray-600 mt-2`}>
        → Number of Cards: {collectionData?.cards?.length}
      </Text>
      <Text variant={"labelLarge"} style={tw`text-base text-gray-600 mt-2`}>
        →  Number of likes:{" "}
        {collectionData?.likes > 0 ? collectionData?.likes : 0}
      </Text>
      <Text variant={"labelLarge"} style={tw`text-base text-gray-600 mt-2`}>
        → Created Time: {createdAt}
      </Text>
      <Text variant={"labelLarge"} style={tw`text-base text-gray-600 mt-2`}>
        →   updated Time: {updatedAt}
      </Text>
    </View>
  </View>;
};

const styles = StyleSheet.create({
  container: {},
});

export default CollectionPreviewDetails;