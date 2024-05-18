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
          openLink("https://linkedin.com");
        }}
      >
        <Ionicons name="linkedin" size={32} color="#0e76a8" />
      </Pressable>
      <Pressable
        onPress={() => {
          openLink("https://github.com");
        }}
      >
        <Ionicons name="github" size={32} color="#0d74e7" />
      </Pressable>
      <Pressable
        onPress={() => {
          openLink("https://x.com");
        }}
      >
        <Ionicons name="twitter" size={32} color="#08a0e9" />
      </Pressable>
      <Pressable
        onPress={() => {
          openLink("https://telegram.com");
        }}
      >
        <Ionicons name="telegram" size={32} color="#24A1DE" />
      </Pressable>
      <Pressable
        onPress={() => {
          openLink("https://facebook.com");
        }}
      >
        <Ionicons name="facebook" size={32} color="#1877F2" />
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
