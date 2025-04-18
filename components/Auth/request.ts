import { AuthStackParamList } from "@/@types/navigation";
import { toast } from "@backpackapp-io/react-native-toast";
import { NavigationProp } from "@react-navigation/native";
import axios from "axios";
import client from "../api/client";
import { Keyboard } from "react-native";

export const handleAuthErrors = (err: any) => {
  if (axios.isAxiosError(err) && err.response) {
    // Handle different status codes
    if (err.response.status === 400) {
      toast.error("Invalid input, please check your details", {
        icon: "❌",
      });
    } else if (err.response.status === 401) {
      toast.error(`Error: ${err.response.data.message}`, { icon: "❌" });
    } else if (err.response.status === 403) {
      toast.error("Wrong email or password ", { icon: "❌" });
    } else if (err.response.status === 409) {
      toast.error("Email already exists ", { icon: "❌" });
    } else if (err.response.status === 422) {
      toast.error("Unprocessable Entity: Please check your input data", {
        icon: "❌",
      });
    } else {
      toast.error(`Error: ${err.response.data.message}`, { icon: "❌" });
    }
  } else if (axios.isAxiosError(err) && err.request) {
    // Request was made but no response received
    toast.error("Network error, please try again later", { icon: "❌" });
  } else {
    // Something else happened while setting up the request
    toast.error(`Error: ${(err as Error).message}`, { icon: "❌" });
  }
};
