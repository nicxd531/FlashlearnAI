import MessageModal from "@/components/AppBar/MessagePanel";
import NotificationModal from "@/components/AppBar/NotificationModal";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as React from "react";
import { Appbar } from "react-native-paper";

const TopAppBar = () => {
  const [visible, setVisible] = React.useState(false);
  const [visibleM, setVisibleM] = React.useState(false);
  return (
    <>
      <Appbar.Header elevated={false} theme={{ colors: { primary: "green" } }}>
        <Appbar.Content
          title="Flashlearn"
          titleStyle={{ fontWeight: "bold", fontSize: 24 }} // Make the title bold and bigger
        />
        <Appbar.Action
          icon={({ color, size }) => (
            <Ionicons name="paper-plane-outline" size={25} color="black" />
          )}
          onPress={() => setVisibleM(true)}
        />
        <Appbar.Action
          icon={(props) => (
            <Ionicons name="notifications-outline" size={25} color="black" />
          )}
          onPress={() => setVisible(true)}
        />
      </Appbar.Header>
      <NotificationModal
        visible={visible}
        onClose={() => setVisible(false)}
        message={"notification panel"}
      />
      <MessageModal
        visibleM={visibleM}
        onClose={() => setVisibleM(false)}
        message={"message panel"}
      />
    </>
  );
};

export default TopAppBar;
