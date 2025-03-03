import { FC } from "react";
import { StyleSheet, View } from "react-native";
import BasicModalContainer from "./BasicModalContainer";

interface Props<T> {
  visible: boolean;
  onRequestClose: () => void;
  options: T[];
  renderItem: (item: T) => JSX.Element;
}

const OptionsModal = <T extends any>({
  visible,
  options,
  onRequestClose,
  renderItem,
}: Props<T>) => {
  return (
    <BasicModalContainer onRequestClose={onRequestClose} visible={visible}>
      {options.map((item, index) => {
        return <View key={index}>{renderItem(item)}</View>;
      })}
    </BasicModalContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default OptionsModal;
