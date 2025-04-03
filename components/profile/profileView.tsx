import React, { useState, useEffect } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform
} from "react-native";
import * as ImagePicker from "expo-image-picker"; // Importar ImagePicker
import { auth } from "@/lib/firebaseConfig";
import { updatePassword } from "firebase/auth"; // Firebase Authentication
import Ionicons from "react-native-vector-icons/Ionicons"; // Iconos
import { signOut } from "firebase/auth";
import { Modalize } from "react-native-modalize"; // Importar Modalize
import { Alert } from "react-native";

export default function ProfileView() {
  const [email, setEmail] = useState(""); 
  const [newPassword, setNewPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [showNewPassword, setShowNewPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null); // Foto de perfil
  const modalizeRef = React.useRef<Modalize>(null); // Referencia al Modalize

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email || "Correo no disponible");
      setProfileImage(user.photoURL || null); // Si tiene foto en Firebase, usarla
    }
  }, []);

  // Función para seleccionar una imagen de la galería
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri); // Actualiza la imagen en la pantalla
      Alert.alert("Éxito", "Foto de perfil actualizada correctamente.");
    }
  };

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
      const user = auth.currentUser;
      if (user) {
        await updatePassword(user, newPassword);
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

  // Función para abrir el modal de confirmación de cierre de sesión
  const openLogoutModal = () => {
    modalizeRef.current?.open();
  };

  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Sesión cerrada", "Has cerrado sesión correctamente.");
      // Aquí puedes redirigir al usuario a la pantalla de inicio de sesión si es necesario
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      Alert.alert("Error", "No se pudo cerrar sesión.");
    }
    modalizeRef.current?.close(); // Cerrar el modal después de cerrar sesión
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          {/* Sección de foto de perfil */}
          <View style={styles.profile}>
            <TouchableOpacity onPress={pickImage}>
              <Image
                style={styles.img}
                source={{
                  uri: profileImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                }}
              />
              <View style={styles.cameraIcon}>
                <Ionicons name="camera" size={24} color="white" />
              </View>
            </TouchableOpacity>
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

          <TouchableOpacity style={styles.log_out} onPress={openLogoutModal}>
            <Text style={styles.buttonText}>Cerrar sesión</Text>
          </TouchableOpacity>

          {/* Modal para confirmar cierre de sesión */}
          <Modalize ref={modalizeRef} adjustToContentHeight={true}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>¿Estás seguro de que deseas cerrar sesión?</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={() => modalizeRef.current?.close()} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Sí</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modalize>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// Estilos
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
    height: 125,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "white",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#007AFF",
    borderRadius: 15,
    padding: 5,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: "#5b5db7",
    textAlign: "center",
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
    fontSize: 18,
    fontWeight: "bold",
  },
  log_out: {
    marginTop: 50,
    backgroundColor: "red",
    borderRadius: 8,
    width: "100%",
    padding: 15,
    alignItems: "center",
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
    color: "#32ede1",
  },
  eyeIcon: {
    padding: 10,
  },
  modalContent: {
    alignItems: "center",
    padding: 50,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  modalButton: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 8,
    width: 100,
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
});
