import { FC } from "react";
import Entypo from "@expo/vector-icons/Entypo";

interface Props {
  privateIcon: boolean;
}

const PasswordVisibilityIcon: FC<Props> = ({ privateIcon }) => {
  return privateIcon ? (
    <Entypo name="eye" size={20} color="black" />
  ) : (
    <Entypo name="eye-with-line" size={20} color="black" />
  );
};

export default PasswordVisibilityIcon;
