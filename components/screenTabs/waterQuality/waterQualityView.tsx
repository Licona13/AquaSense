import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { addWaterQuality } from "@/lib/waterQuality/waterQualityService";  // Asegúrate de importar la función que agregará los datos

export const HomeScreen = () => {
  const [oxygenLevel, setOxygenLevel] = useState("");
  const [phLevel, setPhLevel] = useState("");
  const [pondName, setPondName] = useState("");

  // Función para manejar el envío del formulario
  const handleSubmit = async () => {
    if (!oxygenLevel || !phLevel || !pondName) {
      Alert.alert("Error", "Por favor, complete todos los campos.");
      return;
    }

    try {
      await addWaterQuality({
        oxygen_level: parseFloat(oxygenLevel),
        ph_level: parseFloat(phLevel),
        pond_name: pondName,
      });
      Alert.alert("Éxito", "Los datos se han agregado correctamente.");
      setOxygenLevel("");
      setPhLevel("");
      setPondName("");
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al agregar los datos.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Datos del Agua</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nivel de Oxígeno"
        value={oxygenLevel}
        onChangeText={setOxygenLevel}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Nivel de pH"
        value={phLevel}
        onChangeText={setPhLevel}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Nombre del Estanque"
        value={pondName}
        onChangeText={setPondName}
      />

      <Button title="Agregar Datos" onPress={handleSubmit} />
      <Text>ENVIADO!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { 
    height: 40, 
    borderColor: "gray", 
    borderWidth: 1, 
    marginBottom: 10, 
    paddingLeft: 8, 
    borderRadius: 5 
  },
});
