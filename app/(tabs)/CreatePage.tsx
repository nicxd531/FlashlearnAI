import TopAppBar from "@/components/reuseables/TopAppBar";
import React, { FC, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CreateCollectionPage from "../(create)/CreateCollectionPage";
import { defaultForm } from "@/@types/reuseables";

interface Props {}

const CreatePage: FC<Props> = (props) => {
  const [collectionInfo, setCollectionInfo] = React.useState({
    ...defaultForm,
  });

  const [active, setActive] = useState(0);
  return (
    <View style={styles.container}>
      <TopAppBar />
      <CreateCollectionPage
        collectionInfo={collectionInfo}
        setCollectionInfo={setCollectionInfo}
        setActive={setActive}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CreatePage;
