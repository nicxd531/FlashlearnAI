import {
  createNavigatorStackParamList,
  libraryNavigatorStackParamList,
} from "@/@types/navigation";
import { collectionInfoSchema, FromFields } from "@/@types/reuseables";
import client from "@/components/api/client";
import { handleError } from "@/components/api/request";
import { getFromAsyncStorage, Keys } from "@/utils/asyncStorage";
import {
  updateBusyStateQuestion,
  updateCreateBusyState,
  updateCreatedCollectionData,
  updateCreatedCollectionId,
} from "@/utils/store/Collection";
import { toast } from "@backpackapp-io/react-native-toast";
import { NavigationProp } from "@react-navigation/native";
import axios from "axios";
import * as yup from "yup";

export const handleSubmitCollection = async (
  visibility: string,
  collectionInfo: FromFields,
  collectionId: string,
  dispatch: (action: any) => void,
  navigation: NavigationProp<createNavigatorStackParamList>
) => {
  dispatch(updateCreateBusyState(true));
  dispatch(updateCreatedCollectionData(null));
  try {
    const finalData = await collectionInfoSchema.validate(collectionInfo);
    const formData = new FormData();
    const { category, title, description } = finalData;
    formData.append("title", title);
    formData.append("description", description);
    if (category) {
      formData.append("category", category);
    } else {
      console.error("Category is missing or undefined");
    }
    formData.append("visibility", visibility);
    if (
      finalData.poster?.uri &&
      finalData.poster?.name &&
      finalData.poster?.type
    ) {
      formData.append("poster", {
        uri: finalData.poster.uri,
        name: finalData.poster.name,
        type: finalData.poster.type,
      } as any); // Cast to any to avoid type errors
    } else {
      console.error("Poster is missing or incomplete");
    }
    const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
    if (!token) {
      throw new Error("User is not authenticated. Token is missing.");
    }
    // formData.forEach((value, key) => {
    //   console.log(`${key}: ${value}`);
    // });
    const response = await client.post("/collection/create", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status !== 201) {
      throw new Error(`Server error: ${response.status}`);
    }
    const data = await response.data;
    toast.success("Collection Created ", { icon: "🎉🎊" });
    dispatch(updateCreatedCollectionId(data.collection.collectionId));
    dispatch(updateCreatedCollectionData(data.collection));
    navigation.navigate("AiCardsCreator", {
      collectionInfo: data.collection,
    });
  } catch (error) {
    handleError(error);
  } finally {
    dispatch(updateCreateBusyState(false));
  }
};

export const handleUpdateCollection = async (
  visibility: string,
  collectionInfo: FromFields,
  collectionId: string,
  dispatch: (action: any) => void,
  navigation: NavigationProp<createNavigatorStackParamList>
) => {
  dispatch(updateCreateBusyState(true));
  try {
    const finalData = await collectionInfoSchema.validate(collectionInfo);
    const { category, title, description } = finalData;
    const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
    if (!token) {
      throw new Error("User is not authenticated. Token is missing.");
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (category) {
      formData.append("category", category);
    } else {
      console.error("Category is missing or undefined");
    }
    formData.append("visibility", visibility);
    if (
      finalData.poster?.uri &&
      finalData.poster?.name &&
      finalData.poster?.type
    ) {
      formData.append("poster", {
        uri: finalData.poster.uri,
        name: finalData.poster.name,
        type: finalData.poster.type,
      } as any); // Cast to any to avoid type errors
    } else {
      console.error("Poster is missing or incomplete");
    }
    const response = await client.patch(
      `/collection/${collectionId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Include your auth token if required
        },
      }
    );

    if (response.status !== 201) {
      throw new Error(`Server error: ${response.status}`);
    }
    const data = await response.data;
    toast.success("Collection Updated ", { icon: "🎉🎊" });
    console.log("Success:", response.data);
    navigation.navigate("AiCardsCreator", {
      collectionInfo: data.collection,
    });
  } catch (error) {
    handleError(error);
  } finally {
    dispatch(updateCreateBusyState(false));
  }
};

export const handleCreateErrors = (error: any) => {
  if (error instanceof yup.ValidationError) {
    console.error("Validation error:", (error as yup.ValidationError).message);
  } else if (axios.isAxiosError(error)) {
    console.error(
      "Axios error:",
      (error.response?.data?.message as string) || error.message
    );
    toast.error((error.response?.data?.message as string) || error.message, {
      icon: "❌",
    });
  } else {
    console.error("Unexpected error:", (error as Error).message || error);
    toast.error((error as Error).message || (error as string), {
      icon: "❌",
    });
  }
};

export const deleteItem = async (
  index: number,
  cardId: string,
  collectionId: string,
  dispatch: (action: any) => void,
  setQaList: (callback: (prevQaList: any[]) => any[]) => void
) => {
  const token = await getFromAsyncStorage(Keys.AUTH_TOKEN); // Fetch the token from AsyncStorage
  if (!token) {
    throw new Error("User is not authenticated. Token is missing.");
  }
  const url = `/collection/cards/${collectionId}/${cardId}`;
  try {
    dispatch(updateBusyStateQuestion(true));
    const response = await client.delete(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include your auth token if required
      },
    });
    if (response.status === 200) {
      toast.success("card deleted ", { icon: "🎉🎊" });
      setQaList((prevQaList: any[]) =>
        prevQaList.filter((_: any, i: number) => i !== index)
      );
      dispatch(updateBusyStateQuestion(false));
    } else {
      console.error(`Failed to delete card: ${response.status}`);
      toast.error("Failed to delete card", { icon: "❌" });
    }
  } catch (error) {
    console.error("Error deleting card:", error);
    handleCreateErrors(error);
    toast.error(error + "", { icon: "❌" });
    dispatch(updateBusyStateQuestion(false));
  }
};
