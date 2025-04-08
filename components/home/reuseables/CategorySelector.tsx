import { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Pressable,
  Text,
  ScrollView,
} from "react-native";
import MaterialComIcon from "react-native-vector-icons/MaterialCommunityIcons";
import BasicModalContainer from "./BasicModalContainer";
import colors from "@/constants/Colors";

interface Props<T> {
  data: T[];
  visible?: boolean;
  title?: string;
  renderItem(item: T): JSX.Element;
  // onSelect(item: T, index: number): void;
  onRequestClose?(): void;
  handleOthers?(category: string): void;
}

const CategorySelector = <T extends any>({
  data,
  title,
  visible = false,
  renderItem,
  // onSelect,
  onRequestClose,
  handleOthers,
}: Props<T>) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (item: T, index: number) => {
    setSelectedIndex(index);
    // onSelect(item, index);
    onRequestClose && onRequestClose();
    if (handleOthers) handleOthers(item as string);
  };

  return (
    <BasicModalContainer visible={visible} onRequestClose={onRequestClose}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView>
        {data.map((item, index) => {
          return (
            <Pressable
              onPress={() => handleSelect(item, index)}
              key={index}
              style={styles.selectorContainer}
            >
              {selectedIndex === index ? (
                <MaterialComIcon
                  name="radiobox-marked"
                  color={colors.SECONDARY}
                />
              ) : (
                <MaterialComIcon
                  name="radiobox-blank"
                  color={colors.SECONDARY}
                />
              )}
              {renderItem(item)}
            </Pressable>
          );
        })}
      </ScrollView>
    </BasicModalContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.PRIMARY,
    paddingVertical: 10,
  },
  selectorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CategorySelector;
