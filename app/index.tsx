import React, { useState, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Text } from "react-native";
import { onAuthStateChanged } from "firebase/auth"; // Para escuchar cambios de sesión
import { auth } from "@/lib/firebaseConfig"; // Asegúrate de importar bien tu configuración de Firebase

// PANTALLAS
import Login from "./login/login";
import About from "./about/about";
import Profile from "./profile/profile";
import Home from "./home/home";
import waterQuality from "./waterQuality/water_quality";
import FoodDispenser from "./foodDispenser/foodDispenser";

const Drawer = createDrawerNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const Drawer = createDrawerNavigator<any>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Si hay usuario, está autenticado
    });

    return () => unsubscribe(); // Limpiar el listener al desmontar
  }, []);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#1a1a2e" },
        headerTintColor: "white",
        headerTitleStyle: { fontSize: 20, fontWeight: "bold" },
        drawerStyle: { backgroundColor: "#1a1a2e", width: 350 },
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#bbb",
        drawerLabelStyle: { fontSize: 20, marginTop: 10, fontWeight: "bold" },
      }}
    >
      {!isAuthenticated ? (
        <>
          <Drawer.Screen
            name="Login"
            component={Login}
            options={{ drawerIcon: () => <Text style={{ fontSize: 20 }}>📱</Text> }}
          />
          <Drawer.Screen
            name="Home"
            component={Home}
            options={{
              drawerIcon: () => <Text style={{ fontSize: 20 }}>🏚️</Text>,
              drawerItemStyle: { display: "none" } // Oculta el item del Drawer
            }}
          />

          <Drawer.Screen
            name="About"
            component={About}
            options={{ drawerIcon: () => <Text style={{ fontSize: 20 }}>🔎</Text> }}
          />
        </>
      ) : (
        <>
          <Drawer.Screen
            name="Home"
            component={Home}
            options={{ drawerIcon: () => <Text style={{ fontSize: 20 }}>🏚️</Text> }}
          />

          <Drawer.Screen
            name="Calidad del agua"
            component={waterQuality}
            options={{ drawerIcon: () => <Text style={{ fontSize: 20 }}>🤖</Text> }}
          />
             <Drawer.Screen
            name="Dispensador de comida"
            component={FoodDispenser}
            options={{ drawerIcon: () => <Text style={{ fontSize: 20 }}>🐟</Text> }}
          />
          <Drawer.Screen
            name="Perfil"
            component={Profile}
            options={{ drawerIcon: () => <Text style={{ fontSize: 20 }}>⚙️</Text> }}
          />
          <Drawer.Screen
            name="About"
            component={About}
            options={{ drawerIcon: () => <Text style={{ fontSize: 20 }}>🔎</Text> }}
          />
       
        </>
      )}
    </Drawer.Navigator>
  );
}
