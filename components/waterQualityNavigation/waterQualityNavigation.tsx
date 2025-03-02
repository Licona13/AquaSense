import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // Importa los íconos

// PANTALLAS
import ParticlesView from "./screens/particle/particlesView";
import TemperatureView from "./screens/temperature/temperatureView";
import WaterQualityView from "./screens/waterQuality/waterQualityView";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  // Mapeo de iconos según el nombre de la pantalla
  const iconNames: Record<string, keyof typeof Ionicons.glyphMap> = {
    "Calidad del agua": "water",
    "Particulas": "cloud",
    "Temperatura": "thermometer",
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Oculta el header para no mostar en name de la pantalla
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 18,
        },
        tabBarStyle: {
          backgroundColor: "#1a1a2e",
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={iconNames[route.name] || "help-circle"} size={size} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Calidad del agua" component={WaterQualityView} />
      <Tab.Screen name="Particulas" component={ParticlesView} />
      <Tab.Screen name="Temperatura" component={TemperatureView} />
    </Tab.Navigator>
  );
};
