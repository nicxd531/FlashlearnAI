import { FC, ReactNode } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import BasicModalContainer from "./BasicModalContainer";
import { Playlist } from "@/@types/collection";
import colors from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

interface Props {
  visible: boolean;
  onRequestClose(): void;
  list: Playlist[];
  onCreateNewPress(): void;
  onPlaylistPress(item: Playlist): void;
}

interface ListItemProps {
  title: string;
  icon: ReactNode;
  onPress?(): void;
}

const ListItem: FC<ListItemProps> = ({ title, icon, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.listItemContainer}>
      {icon}
      <Text style={styles.listItemTitle}>{title}</Text>
    </Pressable>
  );
};

const PlaylistModal: FC<Props> = ({
  onRequestClose,
  visible,
  onCreateNewPress,
  list,
  onPlaylistPress,
}) => {
  return (
    <BasicModalContainer onRequestClose={onRequestClose} visible={visible}>
      <ScrollView>
        {list.map((item) => {
          return (
            <ListItem
              onPress={() => onPlaylistPress(item)}
              key={item.id}
              icon={
                <FontAwesome
                  size={20}
                  name={item.visibility === "public" ? "globe" : "lock"}
                  color={colors.PRIMARY}
                />
              }
              title={item.title}
            />
          );
        })}
      </ScrollView>
      {/* create playlist (new) button */}
      <ListItem
        icon={<AntDesign size={20} name="plus" color={colors.PRIMARY} />}
        title="Create New"
        onPress={onCreateNewPress}
      />
    </BasicModalContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
  listItemContainer: { flexDirection: "row", alignItems: "center", height: 45 },
  listItemTitle: { fontSize: 16, color: colors.PRIMARY, marginLeft: 5 },
});

export default PlaylistModal;
