import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { WaterQualityItemProps } from "./types";

export default function WaterQualityItem({
  pond_name,
  ph_level,
  oxygen_level,
  temperature,
  timestamp,
}: WaterQualityItemProps) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>{pond_name}</Text>
        <Icon name="fish" size={50} color="#6C63FF" />
      </View>

      <View style={styles.content}>
        <View style={styles.row}>
          <Icon name="test-tube" size={50} color="#42A5F5" />
          <Text style={styles.label}>pH</Text>
          <Text style={styles.value}>{ph_level}</Text>
        </View>

        <View style={styles.row}>
          <Icon name="weather-windy" size={50} color="#66BB6A" />
          <Text style={styles.label}>Oxígeno</Text>
          <Text style={styles.value}>{oxygen_level} mg/L</Text>
        </View>

        <View style={styles.row}>
          <Icon name="thermometer" size={50} color="#EF5350" />
          <Text style={styles.label}>Temp</Text>
          <Text style={styles.value}>{temperature}°C</Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Icon name="calendar-clock" size={45} color="#FFCA28" />
        <Text style={styles.timestamp}>{new Date(timestamp).toLocaleString()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginVertical: 15,
    width: 340,
    borderColor:"yellow",
    borderWidth:2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6C63FF",
  },
  content: {
    backgroundColor: "#F5F5F5",
    borderRadius: 15,
    padding: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  label: {
    fontSize: 18,
    color: "#555",
    flex: 1,
    marginLeft: 10,
  },
  value: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  timestamp: {
    fontSize: 16,
    color: "#888",
    marginLeft: 12,
  },
});
