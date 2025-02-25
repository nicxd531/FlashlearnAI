import AuthInputField from "@/components/form/AuthInputField";
import { FC, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import * as yup from "yup";
import SubmitBtn from "@/components/form/SubmitBtn";
import PasswordVisibilityIcon from "@/components/ui/PasswordVisibilityIcon";
import { Image } from "react-native";
import AuthFormContainer from "@/components/form/AuthFormContainer";
import Form from "@/components/form/Form";
import colors from "@/constants/Colors";
import tw from "twrnc";
import { KeyboardAvoidingView } from "react-native";
import { FormikHelpers } from "formik";
import axios from "axios";
import client from "@/components/api/client";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { toast } from "@backpackapp-io/react-native-toast";
import { AuthStackParamList } from "@/@types/navigation";

const signUpValidation = yup.object({
  name: yup
    .string()
    .trim("Name is missing")
    .min(3, "Invalid name")
    .required("name is required"),
  email: yup
    .string()
    .trim("Name is missing")
    .email("Invalid email")
    .required("email is required"),
  password: yup
    .string()
    .trim("password is missing")
    .min(8, "password is too short")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
      "Password should contain both text, characters and number"
    )
    .required("password is required"),
});

interface Props {
  navigation: any;
}

export interface NewUser {
  name: string;
  email: string;
  password: string;
}

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const SignUp: FC<Props> = ({ navigation }) => {
  const [secureEntry, setSecureEntry] = useState(true);
  const togglePasswordView = () => {
    setSecureEntry(!secureEntry);
  };
  const handleSubmit = async (
    values: NewUser,
    actions: FormikHelpers<NewUser>
  ) => {
    try {
      actions.setSubmitting(true);
      const { data } = await client.post("/auth/create", {
        ...values,
      });
      toast.success("Yay! Welcome to FlashlearnAI", { icon: "🎉🎊" });
      navigation.navigate("Verification", {
        userInfo: data.user,
      });
      actions.setSubmitting(false);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        // Server responded with a status other than 200 range
        if (err.response.status === 400) {
          toast.error("Invalid input, please check your details ", {
            icon: "❌",
          });
        } else if (err.response.status === 409) {
          toast.error("Email already exists ", { icon: "❌" });
        } else if (err.response.status === 422) {
          toast.error("Unprocessable Entity: Please check your input data ", {
            icon: "❌",
          });
        } else {
          toast.error(`Error: ${err.response.data.message} `, { icon: "❌" });
        }
      } else if (axios.isAxiosError(err) && err.request) {
        // Request was made but no response received
        toast.error("Network error, please try again later ", { icon: "❌" });
      } else {
        // Something else happened while setting up the request
        toast.error(`Error: ${(err as Error).message} `, { icon: "❌" });
      }
      console.log("sign up error", err);
      actions.setSubmitting(false);
    } finally {
      actions.setSubmitting(false);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Image
        style={styles.image}
        source={require("../../assets/images/IntroPage.jpg")}
      />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <View style={styles.pngCover}>
          <Image
            style={{ width: 250, height: 250 }}
            source={require("../../assets/images/SignUp.png")}
          />
        </View>
        <Form
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={signUpValidation}
        >
          <AuthFormContainer
            heading="Let's Get Started"
            subHeading="Create Account"
          >
            <View style={styles.formContainer}>
              <AuthInputField
                name="name"
                placeholder="First Name"
                label="name"
                containerStyle={styles.marginBottom}
                delay={501}
              />
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
                placeholder="Password"
                label="Password"
                autoCapitalize="none"
                secureTextEntry={secureEntry}
                containerStyle={styles.marginBottom}
                rightIcon={<PasswordVisibilityIcon privateIcon={secureEntry} />}
                onRightIconPress={togglePasswordView}
                delay={503}
              />
              <View style={tw`mt-12`}>
                <SubmitBtn title="Sign Up" />
                <View style={[styles.linkContainer, tw`mt-2`]}>
                  <Text style={{ color: "grey" }}>
                    Already have an account?
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={{ color: "black" }}> Sign In</Text>
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

  scrollContainer: {
    flex: 1,
  },
  formContainer: {
    width: "100%",
    justifyContent: "space-between",
  },
  marginBottom: {},
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

    marginTop: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

export default SignUp;
