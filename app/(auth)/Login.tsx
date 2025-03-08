import AuthInputField from "@/components/form/AuthInputField";
import { FC, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import * as yup from "yup";
import SubmitBtn from "@/components/form/SubmitBtn";
import PasswordVisibilityIcon from "@/components/ui/PasswordVisibilityIcon";

import AuthFormContainer from "@/components/form/AuthFormContainer";
import Form from "@/components/form/Form";
import colors from "@/constants/Colors";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import tw from "twrnc";
import { FormikHelpers } from "formik";
import client from "@/components/api/client";
import {
  updateBusyState,
  updateLoggedInState,
  updateProfile,
} from "@/utils/store/auth";
import { KeyboardAvoidingView } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "@/@types/navigation";
import { Keys, saveToAsyncStorage } from "@/utils/asyncStorage";
import { toast } from "@backpackapp-io/react-native-toast";
import axios from "axios";
import { signUpValidation } from "@/components/api/Validators";
import AppLink from "@/components/AppLink";
import { useDispatch } from "react-redux";
import { handleError } from "@/components/api/request";

const { height } = Dimensions.get("window");

interface SignInUserInfo {
  email: string;
  password: string;
}
interface Props {}
const initialValues = {
  email: "",
  password: "",
};

const LogIn: FC<Props> = (props) => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const dispatch = useDispatch();
  const translateY = useSharedValue(height); // Start off-screen

  // Animated style that uses the translateY shared value
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    // Animate the view to slide in from the bottom
    translateY.value = withTiming(height * 0.2, { duration: 500 }); // Cover 80% of the screen height
  }, [translateY]);
  const [secureEntry, setSecureEntry] = useState(true);

  const togglePasswordView = () => {
    setSecureEntry(!secureEntry);
  };
  const handleSubmit = async (
    values: SignInUserInfo,
    actions: FormikHelpers<SignInUserInfo>
  ) => {
    dispatch(updateBusyState(true));
    try {
      actions.setSubmitting(true);
      const { data } = await client.post("/auth/sign-in", {
        ...values,
      });
      await saveToAsyncStorage(Keys.AUTH_TOKEN, data.token);
      dispatch(updateProfile(data.profile));
      dispatch(updateLoggedInState(true));
      toast.success("Log in Successful ", { icon: "🎉🎊" });
    } catch (err) {
      handleError(err);
    } finally {
      actions.setSubmitting(false);
    }
    dispatch(updateBusyState(false));
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Image
        style={styles.image}
        source={require("../../assets/images/IntroPage.jpg")}
      />
      <KeyboardAvoidingView
        style={styles.secondContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.pngCover}>
          <Image
            style={{ width: 300, height: 300 }}
            source={require("../../assets/images/Login.png")}
          />
        </View>
        <Form
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={signUpValidation}
        >
          <AuthFormContainer
            heading="Please, Log In."
            subHeading="Welcome Back!"
          >
            <View style={styles.formContainer}>
              <View>
                <AuthInputField
                  name="email"
                  placeholder="Email"
                  label="email"
                  keyboardType="email-address"
                  containerStyle={styles.marginBottom}
                  delay={502}
                />
                <AuthInputField
                  name="password"
                  placeholder="password"
                  label="Password"
                  autoCapitalize="none"
                  secureTextEntry={secureEntry}
                  containerStyle={styles.marginBottom}
                  rightIcon={
                    <PasswordVisibilityIcon privateIcon={secureEntry} />
                  }
                  onRightIconPress={togglePasswordView}
                  delay={505}
                />
                <View style={{ width: "100%", alignItems: "flex-end" }}>
                  <AppLink
                    onPress={() => navigation.navigate("LostPassword")}
                    title="Forgot Password?"
                  />
                </View>
              </View>
              <View style={tw`mt-3`}>
                <SubmitBtn title="Sign In" />
                <View style={[styles.linkContainer, tw`mt-2`]}>
                  <Text style={{ color: "grey" }}>Don't have an account?</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("SignUp")}
                  >
                    <Text style={{ color: "black" }}> Get Started</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </AuthFormContainer>
        </Form>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  secondContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flex: 1,
  },
  formContainer: {
    width: "100%",
    justifyContent: "space-between",
  },
  marginBottom: {
    marginBottom: 20,
  },
  linkContainer: {
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
    width: "100%",

    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    right: 0,
    flex: 1,
  },
  overlay: {
    width: "100%",
    height: "100%",
    position: "absolute",
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
  },
  pngCover: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: "30%",
    marginTop: 10,
  },
});

export default LogIn;
