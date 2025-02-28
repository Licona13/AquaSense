// components/water_quality/WaterQualityItem.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WaterQualityItemProps } from './types';// Importa los tipos

export default function WaterQualityItem({
  pond_name,
  ph_level,
  oxygen_level,
  temperature,
  timestamp,
}: WaterQualityItemProps) {
  return (
    <View style={styles.containerCard}>
      <View style={styles.tableRow}>
        <Text style={styles.title}>Estanque</Text>
        <Text style={styles.data}>{pond_name}</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.title}>Nivel de pH</Text>
        <Text style={styles.data}>{ph_level}</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.title}>Nivel de oxígeno</Text>
        <Text style={styles.data}>{oxygen_level}</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.title}>Temperatura</Text>
        <Text style={styles.data}>{temperature}°C</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.title}>Fecha</Text>
        <Text style={styles.data}>{new Date(timestamp).toLocaleString()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerCard: {
    borderWidth: 3,
    borderColor: "#d6c9e2",
    borderRadius: 12,
    width: 350,
    height: 150,
    marginBottom: 20,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  title: {
    fontSize: 17,
    color: "#dad317",
    fontWeight: "bold",
  },
  data: {
    color: "white",
    fontSize: 17,
    textAlign: "right",
  },
});
