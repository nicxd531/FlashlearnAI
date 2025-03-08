import { defaultForm, FromFields } from "@/@types/reuseables";
import BtnRNPIcon from "@/components/reuseables/BtnRNPIcon";
import TextHCheckBox from "@/components/reuseables/TextHCheckBox";
import React, { FC, useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import tw from "twrnc";
import RNPickerSelect from "react-native-picker-select";
import { categories } from "@/@types/collection";
import CollectionPreviewModal from "@/components/reuseables/CollectionPreviewModal";
import {
  handleSubmitCollection,
  handleUpdateCollection,
} from "@/components/create/hooks/request";
import { AntDesign } from "@expo/vector-icons";
import { updateCollectionId } from "@/utils/store/Collection";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import { createNavigatorStackParamList } from "@/@types/navigation";
import { Toasts } from "@backpackapp-io/react-native-toast";

interface Props {}

const CreateCollectionPage: FC<Props> = (props) => {
  const [checked, setChecked] = React.useState(false);
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NavigationProp<createNavigatorStackParamList>>();
  const { createBusyState, createdCollectionId } = useSelector(
    (state: any) => state.collection
  );
  const [collectionInfo, setCollectionInfo] = React.useState({
    ...defaultForm,
  });
  const formattedCategories = categories.map((category) => ({
    label: category,
    value: category.replace(/ /g, " "),
  }));

  const visibility = checked ? "public" : "private";
  const handleNew = () => {
    setCollectionInfo({ ...defaultForm });
    dispatch(updateCollectionId(null));
  };
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
          <Pressable onPress={handleNew} style={tw`mr-2`}>
            <AntDesign name="plus" size={24} />
          </Pressable>
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
        <View style={{ width: 380, alignItems: "center" }}></View>
        <View style={[{ width: "60%", marginHorizontal: "auto" }, tw`mt-5`]}>
          <BtnRNPIcon
            busyACollection={createBusyState}
            handleSubmit={
              createdCollectionId
                ? () =>
                    handleUpdateCollection(
                      visibility,
                      collectionInfo,
                      createdCollectionId,
                      dispatch,
                      navigation
                    )
                : () =>
                    handleSubmitCollection(
                      visibility,
                      collectionInfo,
                      createdCollectionId,
                      dispatch,
                      navigation
                    )
            }
            title={
              createdCollectionId ? "update collection" : "Save Collection"
            }
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
    flexDirection: "row",
    marginBottom: 20,
  },
});

export default CreateCollectionPage;
