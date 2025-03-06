import { FromFields } from "@/@types/reuseables";
import {
  handleSubmitCollection,
  handleUpdateCollection,
} from "@/components/api/request";
import BtnRNPIcon from "@/components/reuseables/BtnRNPIcon";
import TextHCheckBox from "@/components/reuseables/TextHCheckBox";
import React, { FC, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import tw from "twrnc";
import RNPickerSelect from "react-native-picker-select";
import { categories } from "@/@types/collection";
import CollectionPreviewModal from "@/components/reuseables/CollectionPreviewModal";

interface Props {
  setActive: (p: any) => void;
  collectionInfo: FromFields;
  setCollectionInfo: React.Dispatch<React.SetStateAction<FromFields>>;
}

const CreateCollectionPage: FC<Props> = (props) => {
  const { busyACollection, collectionId } = useSelector(
    (state: any) => state.collection
  );

  const { collectionInfo, setCollectionInfo } = props;
  const [checked, setChecked] = React.useState(false);
  const formattedCategories = categories.map((category) => ({
    label: category,
    value: category.replace(/ /g, " "),
  }));

  const visibility = checked ? "public" : "private";

  useEffect(() => {
    setCollectionInfo({ ...collectionInfo, visibility });
  }, [checked]);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={[styles.heading]}>
          <Text style={[tw`font-bold  w-full `]} variant="headlineMedium">
            Create Collection
          </Text>
        </View>
        <TextInput
          label="Title"
          value={collectionInfo.title}
          onChangeText={(title) =>
            setCollectionInfo({ ...collectionInfo, title })
          }
          style={{ backgroundColor: "transparent" }}
        />
        <TextInput
          label="Description"
          value={collectionInfo.description}
          onChangeText={(description) =>
            setCollectionInfo({ ...collectionInfo, description })
          }
          style={{
            backgroundColor: "transparent",
            textAlignVertical: "top",
          }}
          multiline
          textAlignVertical="top"
        />
        <RNPickerSelect
          onValueChange={(category) =>
            setCollectionInfo({ ...collectionInfo, category })
          }
          items={formattedCategories}
          placeholder={{ label: "categories", value: null }}
        />
        <TextHCheckBox checked={checked} setChecked={setChecked} />
        <View style={{ width: 380, alignItems: "center" }}>
          {/* <PosterPreview
          collectionInfo={collectionInfo}
          setCollectionInfo={setCollectionInfo}
        /> */}
        </View>
        <View style={[{ width: "60%", marginHorizontal: "auto" }, tw`mt-5`]}>
          <BtnRNPIcon
            busyACollection={busyACollection}
            handleSubmit={
              collectionId
                ? () =>
                    handleUpdateCollection(
                      visibility,
                      collectionInfo,
                      collectionId
                    )
                : () =>
                    handleSubmitCollection(
                      visibility,
                      collectionInfo,
                      collectionId
                    )
            }
            title={collectionId ? "update collection" : "Save Collection"}
            iconName="save"
          />
        </View>
        <View style={{ height: 550 }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
    width: "100%",
  },
  heading: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",

    marginBottom: 20,
  },
});

export default CreateCollectionPage;
