import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // Crea una pantalla de ajustes
import { Ionicons } from "@expo/vector-icons";

//PANTALLAS

import DispenserView from "./dispenser/dispenserView";
import ParticlesView from "./particles/particlesView";
import TemperatureView from "./temperature/temperatureView";
import { HomeScreen } from "./waterQuality/waterQualityView";



const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={{
                      headerStyle: {
                          backgroundColor: "#080e30",
                      },
                      headerTintColor: "#fff",
                      headerTitleStyle: {
                          fontWeight: "bold",
                          fontSize: 18,
                      },
                      tabBarStyle: {
                          backgroundColor: "#080e30",
                      },
                      tabBarActiveTintColor: "white",
                      tabBarInactiveTintColor: "gray",
                  }}
    >
      <Tab.Screen name="Calidad del agua" component={HomeScreen} />
      <Tab.Screen name="Dispensador" component={DispenserView} />
      <Tab.Screen name="Particulas" component={ParticlesView} />
      <Tab.Screen name="Temperatura" component={TemperatureView} />
    </Tab.Navigator>
  );
};
