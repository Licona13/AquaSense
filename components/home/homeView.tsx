import React, { useState, useEffect } from "react";
import { StatusBar, TouchableOpacity } from "react-native";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";


const HomeView = () => {
  const [time, setTime] = useState(new Date());
  const navigation = useNavigation<any>();

  useEffect(() => {
    // Actualizar la hora cada segundo
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, []);

  return (
    <ImageBackground style={styles.fondo} source={require("../../assets/images/descarga (1).jpg")} >
      {/* Contenedor de la hora */}
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" hidden={false} />
        <Text style={styles.welcome}>Bienvenido a AquaSense</Text>
        <Text style={styles.timeText}>
          {time.toLocaleTimeString()}
        </Text>
      </View>

       <View style={styles.containerButtom}>
       <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Calidad del agua")}>
          <Text style={styles.btnText}>Informacion del agua</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}  onPress={() => navigation.navigate("Dispensador de comida")}>
          <Text style={styles.btnText}>Administrar comida</Text>
        </TouchableOpacity>
       </View>
    </ImageBackground>
   
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:100,
  },
  welcome:{
    textAlign:"center",
    color:"white",
    fontSize:30,
  },
  fondo: {
    alignItems: "center",
    flex:1,
    width:"100%",
    height:"100%",
  },
  timeText: {
    textAlign:"center",
    fontSize: 48,
    color: "white",
    fontWeight: "bold",
  },
  containerButtom:{
    marginTop:100,
    // borderWidth:1,
    // borderColor:"yellow",
    width:"90%",
    alignItems:"center",
    gap:40,
  },
  btn:{
    borderRadius:10,
    backgroundColor:"#1a1a2e",
    width:250,
    height:60,
    justifyContent:"center",
    alignItems:"center",
    borderWidth:1,
    borderColor:"white",
  },
  btnText:{
    color:"white",
    fontSize:20,
  }
});

export default HomeView;
