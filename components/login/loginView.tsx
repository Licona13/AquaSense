import React, { useState } from "react";
import {View,TextInput,TouchableOpacity,StyleSheet,Text,Alert,Image,ImageBackground,ScrollView,KeyboardAvoidingView,Platform,StatusBar,} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../types";
import { login} from "@/lib/user/auth";
import { sendPasswordReset } from "@/lib/user/passwordReset";
import ModalResetPassword from "./modalResetpassword";
import Icon from "react-native-vector-icons/Feather";

const LoginView = () => {
  const navigation = useNavigation<NavigationProps>();
  const [password, setPassword] = useState("");
  const [email] = useState("aquasensekeicode@gmail.com");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {  //proceso de inicio de sesión.
    if (password === "") { //Verifica si el campo esta vacio
      Alert.alert("❌ Error", "Tienes que agregar tu contraseña");
      return;
    }
    setLoading(true);
    try {
      await login(email, password); //Llama a una función login y verificar las credenciales
      setLoading(false);
      navigation.navigate("Home"); //Redirige a la pantalla home
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Credenciales incorrectas");
    }
  };

  const handleConfirmReset = async () => {
    try {
      await sendPasswordReset(email);
      setModalVisible(false);
      Alert.alert("Éxito", "Se ha enviado un correo para recuperar la contraseña.");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ImageBackground style={styles.fondo} source={require("../../assets/images/fondo.jpg")}> 
      <View style={styles.fondo}> 
        <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" hidden={false} />

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
            <View style={styles.welcome}>
              {/* <Text style={styles.welcometext}>Bienvenido a</Text> */}
              <Text style={styles.title}>A Q U A S E N S E</Text>
              <Image style={styles.logo} source={require("../../assets/images/logo.png")} />
            </View>
            <View style={styles.containerInput}>
              <TextInput
                style={styles.input}
                placeholder="Ingresa tu contraseña"
                placeholderTextColor={"white"}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ padding: 10 }}>
                <Icon name={showPassword ? 'eye' : 'eye-off'} size={20} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.login}>
              <TouchableOpacity
                onPress={handleLogin}
                disabled={loading}
                style={[styles.button, { backgroundColor: loading ? 'red' : '#007bff' }]}
              >
                <Text style={styles.buttonText}>{loading ? 'Cargando...' : 'Iniciar sesión'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={styles.password}>Olvidé mi contraseña</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      <ModalResetPassword
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleConfirmReset}
        email={email}
      />
    </ImageBackground>
  );
};

export default LoginView;

const styles = StyleSheet.create({
  fondo: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    marginTop: 25,
    alignItems: "center",
  },
  welcometext: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    fontStyle: "italic",
    textAlign: "center",
    width: 200,
  },
  title: {
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
  },
  logo: {
    marginTop: 30,
    width: 300,
    height: 300,
  },
  containerInput: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 12,
    width: 280,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    paddingLeft: 10,
    fontSize: 18,
    color: "white",
  },
  button: {
    // marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: 200,
    height: 50,
    borderWidth: 1,
    // borderColor: "blue",
    justifyContent: "center",
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  login: {
    width: 390,
    height: 70,
    // flexDirection: "row",
    // gap: 10,
    alignItems: "center",
  },
  password: {
    textDecorationLine: "underline",
    color: "white",
    marginTop: 20,
    fontSize: 18,
  },
});
