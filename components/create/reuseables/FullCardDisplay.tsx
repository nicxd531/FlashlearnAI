import { FC } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Image } from "react-native-elements";
import { Text } from "react-native-paper";

interface Props {
  text: string;
  image: string | null;
}

const FullCardDisplay: FC<Props> = (props) => {
  const { text, image } = props;

  return (
    <View style={styles.container}>
      {text ? <Text variant="bodyLarge">{text}</Text> : null}
      {image ? (
        <Image
          style={{ width: 350, height: 200, borderRadius: 8 }}
          source={image ? { uri: image } : {}}
          PlaceholderContent={<ActivityIndicator />}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
});

export default FullCardDisplay;
