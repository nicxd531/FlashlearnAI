import AuthInputField from "@/components/form/AuthInputField";

import { FC } from "react";
import {
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import * as yup from "yup";
import SubmitBtn from "@/components/form/SubmitBtn";
import AuthFormContainer from "@/components/form/AuthFormContainer";
import Form from "@/components/form/Form";
import colors from "@/constants/Colors";
import tw from "twrnc";
import Animated, { FadeInDown } from "react-native-reanimated";
import { FormikHelpers } from "formik";
import client from "@/components/api/client";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "@/@types/navigation";
import AppLink from "@/components/AppLink";
const lostPasswordSchema = yup.object({
  email: yup
    .string()
    .trim("Name is missing")
    .email("Invalid email")
    .required("email is required"),
});

interface Props {}
interface initialValue {
  email: string;
}
const initialValues = {
  email: "",
};

const LostPassword: FC<Props> = (props) => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const handleSubmit = async (
    values: initialValue,
    actions: FormikHelpers<initialValue>
  ) => {
    try {
      actions.setSubmitting(true);
      const { data } = await client.post("/auth/forget-password", {
        ...values,
      });
      console.log({ data });
    } catch (err) {
      console.log("lost password err", err);
    }
    actions.setSubmitting(false);

    // send information to api
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
        <Form
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={lostPasswordSchema}
        >
          <AuthFormContainer
            heading="Forget Password!"
            subHeading="did you forget your password, don't worry we will help you get back in"
          >
            <Image
              style={styles.png}
              source={require("../../assets/images/forgetPassword.png")}
            />

            <View style={styles.formContainer}>
              <AuthInputField
                name="email"
                placeholder="john@gmail.com"
                label="email"
                keyboardType="email-address"
                containerStyle={styles.marginBottom}
                delay={501}
              />
              <View style={tw`mt-10`}>
                <Animated.View
                  entering={FadeInDown.delay(502).duration(1500).springify()}
                >
                  <SubmitBtn title="Sign link" />
                </Animated.View>
                <Animated.View
                  style={styles.linkContainer}
                  entering={FadeInDown.delay(506).duration(1500).springify()}
                >
                  <AppLink
                    onPress={() => navigation.navigate("Login")}
                    title="Log in"
                  />
                  <AppLink
                    onPress={() => navigation.navigate("SignUp")}
                    title="Sign up"
                  />
                </Animated.View>
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
    backgroundColor: colors.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  scrollContainer: {
    flex: 1,
    width: "100%",
  },
  formContainer: {
    width: "100%",
  },
  marginBottom: {
    marginBottom: 20,
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
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
});

export default LostPassword;
