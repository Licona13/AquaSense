import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import { addFoodDispenserData } from '@/lib/foodDispenser/foodDispenserService';
import { Timestamp } from 'firebase/firestore'; // Importa Timestamp
import { Picker } from '@react-native-picker/picker';

const FoodDispenserForm = () => {
  const [comment, setComment] = useState('');
  const [foodLevel, setFoodLevel] = useState('');
  const [interval, setInterval] = useState('');
  const [isActivated, setIsActivated] = useState(false);

  const handleSubmit = async () => {
    if (!foodLevel || !interval) {
      Alert.alert('Error', 'El nivel de comida y el intervalo son obligatorios');
      return;
    }

    // Obtener el timestamp como un objeto Timestamp
    const timestamp = Timestamp.now();

    const response = await addFoodDispenserData(comment, foodLevel, interval, timestamp);
    if (response.success) {
      Alert.alert('Éxito', 'Dispensador de comida agregado correctamente');
      setComment('');
      setFoodLevel('');
      setInterval('');
      setIsActivated(true); // Activamos el estado después de agregar los datos
    } else {
      Alert.alert('Error', 'Hubo un problema al agregar el dispensador de comida');
    }
  };

  const handleDeactivate = () => {
    // Restablecemos todos los valores y desactivamos la opción para agregar más datos
    setComment('');
    setFoodLevel('');
    setInterval('');
    setIsActivated(false);
  };

  return (
    <ImageBackground
      source={require("../../../../assets/images/descarga (1).jpg")}
      style={styles.background}
    >
      <Text style={styles.title}>Agregar Datos al Dispensador de Comida</Text>

      <Text style={styles.label}>Selecciona el nivel de comida:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={foodLevel}
          onValueChange={(itemValue) => setFoodLevel(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecciona una opción" value="" />
          <Picker.Item label="Alto" value="alto" />
          <Picker.Item label="Medio" value="medio" />
          <Picker.Item label="Bajo" value="bajo" />
        </Picker>
      </View>

      <Text style={styles.label}>Selecciona el tiempo en el que estará encendido:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={interval}
          onValueChange={(itemValue) => setInterval(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecciona una opción" value="" />
          <Picker.Item label="4 Horas" value="4" />
          <Picker.Item label="6 Horas" value="6" />
          <Picker.Item label="8 Horas" value="8" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Agrega un comentario (opcional)"
        placeholderTextColor={"grey"}
        value={comment}
        onChangeText={setComment}
      />

      <TouchableOpacity
        style={[styles.button, isActivated && styles.buttonDisabled]} // Aplica estilos y agrega estilo para deshabilitado
        onPress={handleSubmit}
        disabled={isActivated}
      >
        <Text style={styles.buttonText}>{isActivated ? "Activado" : "Activar"}</Text>
      </TouchableOpacity>

      {/* Botón de desactivar para restablecer el estado */}
      {isActivated && (
        <TouchableOpacity
          style={styles.deactivateButton}
          onPress={handleDeactivate}
        >
          <Text style={styles.buttonText}>Desactivar</Text>
        </TouchableOpacity>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "white",
  },
  label: {
    color: "white",
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: "90%",
    borderColor: "white",
    borderWidth: 2,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 10,
    color: "white",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    overflow: "hidden",
    width: "90%",
    marginBottom: 15,
  },
  picker: {
    height: 50,
    backgroundColor: "#1a1a2e",
    color: "white",
  },
  button: {
    backgroundColor: "#1a73e8", // Color del botón cuando está habilitado
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30, // Bordes redondeados
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // Sombra en Android
    shadowColor: "#000", // Sombra en iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: "80%",
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: "#aaa", // Color del botón cuando está deshabilitado
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white", // Color del texto
  },
  deactivateButton: {
    backgroundColor: "#e91e63", // Color del botón de desactivación
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: "80%",
  },
});

export default FoodDispenserForm;
