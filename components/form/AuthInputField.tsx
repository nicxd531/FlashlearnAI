import { FC, ReactNode, useEffect } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

import { useFormikContext } from "formik";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
  FadeInDown,
} from "react-native-reanimated";

import colors from "@/constants/Colors";
import AppInput from "../ui/AppInput";

interface Props {
  name: string;
  placeholder?: string;
  label?: string;
  keyboardType?: TextInputProps["keyboardType"];
  autoCapitalize?: TextInputProps["autoCapitalize"];
  secureTextEntry?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  rightIcon?: ReactNode;
  onRightIconPress?(): void;
  delay: number | 500;
}

const AuthInputField: FC<Props> = (props) => {
  const inputTransformValue = useSharedValue(0);
  const { handleChange, values, errors, handleBlur, touched } =
    useFormikContext<{
      [key: string]: string;
    }>();

  const {
    label,
    placeholder,
    keyboardType,
    autoCapitalize,
    secureTextEntry,
    containerStyle,
    name,
    rightIcon,
    onRightIconPress,
    delay,
  } = props;
  const errorMsg = touched[name] && errors[name] ? errors[name] : "";

  const shakeUI = () => {
    inputTransformValue.value = withSequence(
      withTiming(-10, { duration: 50 }),
      withSpring(0, {
        damping: 9,
        mass: 0.5,
        stiffness: 1000,
        restDisplacementThreshold: 0.1,
      })
    );
  };
  const inputStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: inputTransformValue.value }],
    };
  });

  useEffect(() => {
    if (errorMsg) shakeUI();
  }, [errorMsg]);

  return (
    <Animated.View style={[containerStyle, inputStyle]}>
      <Animated.View
        entering={FadeInDown.delay(500).duration(1500).springify()}
      >
        <View style={styles.labelContainer}>
          <Text style={styles.errorMsg}>{errorMsg}</Text>
        </View>
        <View>
          <AppInput
            placeholder={placeholder}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            secureTextEntry={secureTextEntry}
            onChangeText={handleChange(name)}
            value={values[name]}
            onBlur={handleBlur(name)}
          />
          {rightIcon ? (
            <Pressable onPress={onRightIconPress} style={styles.rightIcon}>
              {rightIcon}
            </Pressable>
          ) : null}
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: colors.CONTRAST,
    padding: 5,
  },
  errorMsg: {
    color: colors.ERROR,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
  },
  rightIcon: {
    width: 45,
    height: 45,
    position: "absolute",
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AuthInputField;
