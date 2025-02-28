import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // Crea una pantalla de ajustes

//PANTALLAS
import ParticlesView from "./screens/particlesView";
import TemperatureView from "./screens/temperatureView";
import WaterQualityView from "./screens/waterQuality/waterQualityView";



const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
   const Tab = createBottomTabNavigator <any>(); 
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
      <Tab.Screen name="Calidad del agua" component={WaterQualityView} />
      <Tab.Screen name="Particulas" component={ParticlesView} />
      <Tab.Screen name="Temperatura" component={TemperatureView} />
    </Tab.Navigator>
  );
};
