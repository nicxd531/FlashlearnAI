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
      toast.error("Unauthorized access, please try again", { icon: "❌" });
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

// interface UserInfo {
//   id: string;
// }

// export const handleVerificationSubmit = async (
//   setSubmitting: (value: boolean) => void,
//   isValidOtp: boolean,
//   userInfo: UserInfo,
//   otp: string[]
// ): Promise<void> => {
//   setSubmitting(true);
//   if (!isValidOtp) {
//     toast.error("Invalid OTP, please check your input", { icon: "❌" });
//     setSubmitting(false);
//     return;
//   }
//   try {
//     // Await the response from the post request
//     const response = await client.post("/auth/verify-email", {
//       userId: userInfo.id,
//       token: otp.join(""),
//     });

//     toast.success("Email Verified", { icon: "✔️" });
//     console.log(response.data); // Process the data as needed

//     // Navigate to sign in
//     navigation.navigate("Login");
//     setSubmitting(false);
//   } catch (err) {
//     handleAuthErrors(err);
//     // console.log("Verification error", err);
//     setSubmitting(false);
//   } finally {
//     setSubmitting(false);
//   }
// };

// export const requestForNewOtp = async (
//   setCountDown: (value: number) => void,
//   setCanSendNewOtpRequest: (value: boolean) => void,
//   userInfo: UserInfo
// ) => {
//   setCountDown(60);
//   setCanSendNewOtpRequest(false);
//   try {
//     const response = await client.post("/auth/re-verify-email", {
//       userId: userInfo.id,
//     });

//     toast.success("Request successful", { icon: "✔️" });
//   } catch (err) {
//     console.log("Error requesting for new OTP", err);
//   }
// };

// export const handlePaste = (value: string, setOtp: (otp: string[]) => void) => {
//   if (value.length === 6) {
//     Keyboard.dismiss();
//     const newOtp = value.split("");
//     setOtp([...newOtp]);
//   }
// };
