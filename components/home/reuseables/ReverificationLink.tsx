import { libraryNavigatorStackParamList } from "@/@types/navigation";
import { getClient } from "@/components/api/client";
import AppLink from "@/components/AppLink";
import { handleAuthErrors } from "@/components/Auth/request";
import colors from "@/constants/Colors";
import { RootState } from "@/utils/store";
import { toast } from "@backpackapp-io/react-native-toast";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { FC, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { useSelector } from "react-redux";

interface Props {
  time?: number;
  activeAtFirst?: boolean;
  linkTitle: string;
  userId?: string;
}

const ReverificationLink: FC<Props> = ({
  linkTitle,
  userId,
  time = 60,
  activeAtFirst = false,
}) => {
  const { profile } = useSelector((state: RootState) => (state as any).auth);
  const [countDown, setCountDown] = useState(60);
  const [canSendNewOtpRequest, setCanSendNewOtpRequest] =
    useState(activeAtFirst);
  const { navigate } =
    useNavigation<NavigationProp<libraryNavigatorStackParamList>>();

  const requestForNewOtp = async () => {
    setCountDown(60);
    setCanSendNewOtpRequest(false);
    const client = await getClient();
    try {
      const response = await client.post("/auth/re-verify-email", {
        userId: userId || profile.id,
      });

      toast.success("Request successful", { icon: "✔️" });
      navigate("Verification", {
        userInfo: {
          email: profile?.email || "",
          name: profile?.name || "",
          id: userId || profile?.id || "",
        },
      });
    } catch (err) {
      handleAuthErrors(err);
    }
  };

  useEffect(() => {
    if (canSendNewOtpRequest) return;

    const intervalId = setInterval(() => {
      setCountDown((oldCountDown) => {
        if (oldCountDown <= 0) {
          setCanSendNewOtpRequest(true);
          clearInterval(intervalId);

          return 0;
        }
        return oldCountDown - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [canSendNewOtpRequest]);
  return (
    <View style={styles.container}>
      {countDown > 0 && !canSendNewOtpRequest ? (
        <Text style={styles.countDown}>{countDown} sec</Text>
      ) : null}
      <AppLink
        active={canSendNewOtpRequest}
        title={linkTitle}
        onPress={requestForNewOtp}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  countDown: {
    color: colors.SECONDARY,
    marginRight: 7,
  },
});

export default ReverificationLink;
