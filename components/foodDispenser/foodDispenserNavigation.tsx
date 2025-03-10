import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // Importa los íconos

// PANTALLAS
import FoodDispenserView from "./screens/foodDispenserForm/foodDispenserView";
import Pantalla from "./screens/foodDispenserList/FoodDispenserList";
import FoodDispenserListView from "./screens/foodDispenserList/FoodDispenserList";

// Crear el Tab Navigator
const Tab = createBottomTabNavigator();

export const TabNavigatorFoodDispenser = () => {
  // Mapeo de iconos según el nombre de la pantalla
  const iconNames: Record<string, keyof typeof Ionicons.glyphMap> = {
    "Dispensador": "fish", // Icono de pez para la pantalla Dispensador
    "Registro": "clipboard",    // Icono para la pantalla Registro
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Oculta el header
        tabBarStyle: {
          backgroundColor: "#1a1a2e", // Color de fondo de la barra de pestañas
        },
        tabBarActiveTintColor: "white", // Color cuando está activo
        tabBarInactiveTintColor: "gray", // Color cuando está inactivo
        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name={iconNames[route.name] || "help-circle"} // Asignación de iconos
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen name="Dispensador" component={FoodDispenserView} />
      <Tab.Screen name="Registro" component={FoodDispenserListView} />
    </Tab.Navigator>
  );
};
