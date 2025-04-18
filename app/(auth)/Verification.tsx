import { FC, useEffect, useRef, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TextInput,
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import AuthFormContainer from "@/components/form/AuthFormContainer";
import AppButton from "@/components/ui/AppButton";
import tw from "twrnc";
import client from "@/components/api/client";
import axios from "axios";
import colors from "@/constants/Colors";
import { OtpInput } from "react-native-otp-entry";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "@/@types/navigation";
import { toast } from "@backpackapp-io/react-native-toast";
import AppLink from "@/components/AppLink";
import { handleAuthErrors } from "@/components/Auth/request";
import ReverificationLink from "@/components/home/reuseables/ReverificationLink";
import { updateProfile } from "@/utils/store/auth";
import { useDispatch } from "react-redux";
import { handleError } from "@/components/api/request";

interface Props {
  route: any;
}
type PossibleScreen = {
  librarySettings: undefined;
  Login: undefined;
};

const otpFields = new Array(6).fill("");
const Verification: FC<Props> = ({ route }) => {
  const { userInfo } = route.params;
  const navigation = useNavigation<NavigationProp<PossibleScreen>>();
  const [otp, setOtp] = useState([...otpFields]);
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef<TextInput>(null);
  //   const newOtp = [...otp];
  //   if (value === "Backspace") {
  //     if (!newOtp[index]) setActiveOtpIndex(index - 1);
  //     newOtp[index] = "";
  //   } else {
  //     setActiveOtpIndex(index + 1);
  //     newOtp[index] = value;
  //   }
  //   setOtp([...newOtp]);
  // };

  const handlePaste = (value: string) => {
    if (value.length === 6) {
      Keyboard.dismiss();
      const newOtp = value.split("");
      setOtp([...newOtp]);
    }
  };
  const isValidOtp = otp.every((value) => {
    return value.trim();
  });

  const handleSubmit = async () => {
    setSubmitting(true);
    if (!isValidOtp) {
      toast.error("Invalid OTP, please check your input", { icon: "❌" });
      setSubmitting(false);
      return;
    }
    try {
      // Await the response from the post request
      const { data } = await client.post("/auth/verify-email", {
        userId: userInfo.id,
        token: otp.join(""),
      });
      dispatch(updateProfile(data.profile));
      toast.success("Email Verified", { icon: "✔️" });
      const { routeNames } = navigation.getState();
      if (routeNames.includes("Login")) {
        // Navigate to sign in
        navigation.navigate("Login");
      }

      if (routeNames.includes("librarySettings")) {
        // Navigate to librarySetting
        navigation.goBack();
      }
      setSubmitting(false);
    } catch (err) {
      handleError(err, "invalid OTP, please confirm your input");
      console.log("Verification error", err);
      setSubmitting(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Image
        style={styles.image}
        source={require("../../assets/images/IntroPage.jpg")}
      />
      <KeyboardAvoidingView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            flex: 1,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ height: "100%", paddingHorizontal: 20 }}>
            <AuthFormContainer heading="">
              <View style={{ paddingHorizontal: 20 }}>
                <View style={tw`w-100  items-center justify-center`}>
                  <Image
                    style={styles.png}
                    source={require("../../assets/images/otpPng.png")}
                  />
                  <View
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <Text style={tw`font-bold text-4xl`}> Verification</Text>
                    <Text style={tw` text-2xl`}>
                      {" "}
                      check your registered email
                    </Text>
                  </View>
                </View>
                <View style={styles.inputContainer}>
                  <OtpInput
                    numberOfDigits={6}
                    onTextChange={handlePaste}
                    focusColor={colors.PRIMARY}
                    focusStickBlinkingDuration={400}
                    disabled={false}
                    type="numeric"
                    theme={{
                      pinCodeContainerStyle: {
                        borderColor: "whitesmoke",
                      },
                    }}
                  />
                </View>
                <View
                  style={[
                    tw`mt-25`,
                    { width: "70%", marginHorizontal: "auto" },
                  ]}
                >
                  <AppButton
                    busy={submitting}
                    title="Submit"
                    onPress={handleSubmit}
                  />
                </View>
                <View style={styles.linkContainer}>
                  <ReverificationLink
                    linkTitle="Re-send OTP"
                    userId={userInfo.id}
                  />
                </View>
              </View>
            </AuthFormContainer>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  linkContainer: {
    width: "100%",
    marginTop: 20,
    justifyContent: "flex-end",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    right: 0,
  },
  overlay: {
    width: "100%",
    height: "100%",
    position: "absolute",
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
  },
  png: {
    width: 300,
    height: 300,
  },
  countDown: {
    color: colors.SECONDARY,
    marginRight: 7,
  },
});

export default Verification;
