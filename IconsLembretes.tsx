import Ionicons from "@expo/vector-icons/FontAwesome";
import { Pressable, StyleSheet, View } from "react-native";

export default function IconsLembretes(props: {
  callbackEditar: Function;
  callbackRemover: Function;
  callbackConfirmar: Function;
  status: boolean;
}) {
  return (
    <View style={styles.container}>
      {props.status && (
        <Pressable onPress={() => props.callbackConfirmar()}>
          <Ionicons
            style={styles.icons}
            name="check"
            size={30}
            color="#61f551"
          />
        </Pressable>
      )}
      <Pressable onPress={() => props.callbackRemover()}>
        <Ionicons
          style={styles.icons}
          name="remove"
          size={30}
          color="#e64c4c"
        />
      </Pressable>
      <Pressable onPress={() => props.callbackEditar()}>
        <Ionicons
          style={styles.icons}
          name="pencil-square-o"
          size={30}
          color="#000000"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  icons: {
    marginHorizontal: 5,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
