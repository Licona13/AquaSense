import React, { useState, useEffect } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView, KeyboardAvoidingView, Platform 
} from "react-native";
import { auth } from "@/lib/firebaseConfig"; 
import { updatePassword } from "firebase/auth"; // (contiene Firebase Authentication).
import Ionicons from "react-native-vector-icons/Ionicons"; // Iconos

export default function ProfileView() {
  const [email, setEmail] = useState(""); //Almacena el correo electrónico del usuario.
  const [newPassword, setNewPassword] = useState(""); //Guarda la nueva contraseña ingresada en el TextInput.
  const [confirmPassword, setConfirmPassword] = useState(""); //Almacena la confirmación de la nueva contraseña.
  const [loading, setLoading] = useState(false); //Evita que el usuario presione el botón varias veces seguidas.
  const [showNewPassword, setShowNewPassword] = useState(false); //VER CONTRASEÑA
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const user = auth.currentUser; //obtiene el usuario autenticado actualmente en Firebase.
    if (user) {
      setEmail(user.email || "Correo no disponible");
    }
  }, []);

  const handleUpdatePassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Error", "Todos los campos son requeridos.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    try {
      const user = auth.currentUser; //obtiene el usuario autenticado
      if (user) {
        await updatePassword(user, newPassword); //para cambiar la contraseña en Firebase.
        Alert.alert("LISTO!", "Contraseña actualizada correctamente.");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        Alert.alert("❌ Error", "No hay usuario autenticado.");
      }
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      Alert.alert("Error", "No se pudo actualizar la contraseña.");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.profile}>
            <Image style={styles.img} source={require("../../assets/images/user.png")} />
            <View>
              <Text style={styles.label}>Correo electrónico:</Text>
              <Text style={styles.email}>{email}</Text>
            </View>
          </View>

          <Text style={styles.label}>Nueva contraseña:</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Ingresa tu nueva contraseña"
              placeholderTextColor="gray"
              secureTextEntry={!showNewPassword}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)} style={styles.eyeIcon}>
              <Ionicons name={showNewPassword ? "eye-off" : "eye"} size={24} color="white" />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Confirmar contraseña:</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirma tu nueva contraseña"
              placeholderTextColor="gray"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
              <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={24} color="white" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleUpdatePassword} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? "Actualizando..." : "Actualizar contraseña"}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#1a1a2e",
  },
  scrollContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  profile: {
    flexDirection: "row",
    width: 400,
    height: 150,
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 125,
    height: 129,
  },
  label: {
    textAlign: "center",
    fontSize: 23,
    fontWeight: "bold",
    marginTop: 20,
    color: "white",
    marginBottom:10,
  },
  email: {
    fontSize: 18,
    color: "#5b5db7",
    marginBottom: 20,
    textAlign: "center",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 20,
    paddingRight: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color:"#32ede1",
  },
  eyeIcon: {
    padding: 10,
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#007bff",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
