import Ionicons from "@expo/vector-icons/FontAwesome";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import * as Linking from "expo-linking";

export default function IconsRedesSociais() {
  const openLink = (url: string): void => {
    if (Platform.OS === "web") {
      window.open(url, "_blank");
    } else {
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.icons}>
      <Pressable
        onPress={() => {
          openLink("https://www.linkedin.com/in/frs15/");
        }}
      >
        <Ionicons name="linkedin" size={32} color="#0e76a8" />
      </Pressable>
      <Pressable
        onPress={() => {
          openLink("https://github.com/frsouzaa");
        }}
      >
        <Ionicons name="github" size={32} color="#0d74e7" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  icons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "50%",
    marginTop: 10,
  },
});
