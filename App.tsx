import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Text,
  FlatList,
  ToastAndroid,
  Alert,
  Platform,
} from "react-native";
import IconsRedesSociais from "./IconsRedesSociais";
import IconsLembretes from "./IconsLembretes";
import axios from "axios";

interface Lembrete {
  texto: string;
  id: string;
  editando: boolean;
}

export default function App() {
  const [lembrete, setLembrete] = useState<string>("");
  const [lembretes, setLembretes] = useState<Lembrete[]>([]);
  const [lembretesOriginais, setLembretesOriginais] = useState<Lembrete[]>([]);
  useEffect(() => {
    const vai = async () => {
      const res = (await axios.get("http://localhost:8080/lembretes")).data;
      setLembretes(res);
    }
    vai();
  }, []);

  const adicionaLembrete = (): void => {
    if (lembrete.trim() === "") return;
    const id = Date.now().toString();
    setLembretes([{ texto: lembrete, id: id, editando: false }, ...lembretes]);
    setLembretesOriginais([
      { texto: lembrete, id: id, editando: false },
      ...lembretesOriginais,
    ]);
    setLembrete("");
  };

  const atualizaLembrete = (id: string, texto: string): void => {
    let novaLista = [...lembretes];
    novaLista.forEach((lembrete) => {
      if (lembrete.id === id) {
        lembrete.texto = texto;
      }
    });
    setLembretes(novaLista);
  };

  const deleteLembrete = (id: string): void => {
    if (Platform.OS === "web") {
      const res = confirm("Deseja realmente apagar o lembrete?");
      if (!res) return;
      setLembretes(lembretes.filter((lembrete) => lembrete.id !== id));
    } else {
      Alert.alert("Atenção!", "Deseja realmente apagar o lembrete?", [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => {
            ToastAndroid.showWithGravity(
              "Lembrete removido com sucesso!",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
            setLembretes(lembretes.filter((lembrete) => lembrete.id !== id));
          },
        },
      ]);
    }
  };

  const deleteAll = (): void => {
    if (Platform.OS === "web") {
      const res = confirm("Deseja realmente apagar todos os lembretes?");
      if (!res) return;
      setLembretes([]);
    } else {
      Alert.alert("Atenção!", "Deseja realmente apagar todos os lembretes?", [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => {
            ToastAndroid.showWithGravity(
              "Todos os lembretes foram removidos!",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
            setLembretes([]);
          },
        },
      ]);
    }
  };

  const editLembrete = (id: string): void => {
    let lembretesCopy = [...lembretes];
    lembretesCopy.forEach((lembrete) => {
      if (lembrete.id === id) {
        lembrete.editando = true;
      }
    });
    setLembretes(lembretesCopy);
  };

  const confirmarEdicao = (id: string): void => {
    let texto = "";
    let lembretesCopy = [...lembretes];
    lembretesCopy.forEach((lembrete) => {
      if (lembrete.id === id) {
        lembrete.editando = false;
        texto = lembrete.texto;
      }
    });
    let lembretesOriginaisCopy = [...lembretesOriginais];
    if (texto.trim() === "") {
      lembretesOriginaisCopy.forEach((lembrete) => {
        if (lembrete.id === id) {
          texto = lembrete.texto;
        }
      });
      lembretesCopy.forEach((lembrete) => {
        if (lembrete.id === id) {
          lembrete.texto = texto;
        }
      });
    } else {
      lembretesOriginaisCopy.forEach((lembrete) => {
        if (lembrete.id === id) {
          lembrete.texto = texto;
        }
      });
    }
    setLembretesOriginais(lembretesOriginaisCopy);
    setLembretes(lembretesCopy);
  };

  const cancelarEdicao = (id: string): void => {
    let texto = "";
    let lembretesOriginaisCopy = [...lembretesOriginais];
    lembretesOriginaisCopy.forEach((lembrete) => {
      if (lembrete.id === id) {
        texto = lembrete.texto;
      }
    });
    let lembretesCopy = [...lembretes];
    lembretesCopy.forEach((lembrete) => {
      if (lembrete.id === id) {
        lembrete.editando = false;
        lembrete.texto = texto;
      }
    });
    setLembretes(lembretesCopy);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputAdicionar}
        placeholder="Digite um lembrete..."
        onChangeText={setLembrete}
        value={lembrete}
        onSubmitEditing={adicionaLembrete}
        blurOnSubmit={false}
      ></TextInput>
      <Pressable style={styles.adicionarButton} onPress={adicionaLembrete}>
        <Text>Adicionar Lembrete</Text>
      </Pressable>
      <Pressable style={styles.zerarButton} onPress={deleteAll}>
        <Text style={{ color: "white" }}>Apagar Todos</Text>
      </Pressable>
      <FlatList
        style={styles.list}
        keyExtractor={(item) => item.id}
        data={lembretes}
        renderItem={(lembrete) => (
          <View style={styles.lembreteContainer}>
            {lembrete.item.editando ? (
              <TextInput
                style={styles.inputEditar}
                onChange={(event) => {
                  atualizaLembrete(lembrete.item.id, event.nativeEvent.text);
                }}
                onSubmitEditing={() => confirmarEdicao(lembrete.item.id)}
                blurOnSubmit={false}
                value={lembrete.item.texto}
              ></TextInput>
            ) : (
              <Text style={styles.lembrete}>{lembrete.item.texto}</Text>
            )}
            <IconsLembretes
              callbackRemover={() => deleteLembrete(lembrete.item.id)}
              callbackEditar={() => editLembrete(lembrete.item.id)}
              callbackConfirmar={() => {
                confirmarEdicao(lembrete.item.id);
              }}
              callbackCancelar={() => {
                cancelarEdicao(lembrete.item.id);
              }}
              status={lembrete.item.editando}
            />
          </View>
        )}
      ></FlatList>
      <IconsRedesSociais />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
  },
  inputAdicionar: {
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    textAlign: "center",
  },
  adicionarButton: {
    width: "80%",
    backgroundColor: "#ADE8F4",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
  },
  zerarButton: {
    width: "80%",
    backgroundColor: "#e64c4c",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  list: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    width: "80%",
    marginTop: 10,
  },
  lembreteContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  lembrete: {
    borderRadius: 5,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#e0e0e0",
    marginTop: 5,
    marginLeft: 10,
    marginRight: 5,
    flex: 1,
  },
  inputEditar: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 5,
    padding: 10,
    textAlign: "center",
  },
});
