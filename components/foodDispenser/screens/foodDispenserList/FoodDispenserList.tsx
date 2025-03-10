// FoodDispenserListScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground, Alert, TouchableOpacity } from 'react-native';
import { getFoodDispensers, deleteFoodDispenserData } from '@/lib/foodDispenser/foodDispenserService'; // Importa el servicio
import FoodDispenserItem from './FoodDispenserItem';

const FoodDispenserListScreen = () => {
  const [dispensers, setDispensers] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = getFoodDispensers((dispensersData) => {
      setDispensers(dispensersData);
    });

    // Limpiar el listener cuando el componente se desmonte
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    Alert.alert(
      'Eliminar Dispensador',
      '¿Estás seguro de que deseas eliminar este dispensador de comida?',
      [
        { text: 'Cancelar' },
        { 
          text: 'Eliminar', 
          onPress: async () => {
            const response = await deleteFoodDispenserData(id);
            if (response.success) {
              Alert.alert('Éxito', 'Dispensador eliminado correctamente');
            } else {
              Alert.alert('Error', 'Hubo un problema al eliminar el dispensador');
            }
          }
        }
      ]
    );
  };

  return (
    <ImageBackground
      source={require("../../../../assets/images/descarga (4).jpg")}
      style={styles.background}
    >
      <Text style={styles.title}>Dispensadores de Comida</Text>
      <FlatList
        data={dispensers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <FoodDispenserItem data={item} />
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.deleteButtonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    padding: 20,
  },
  deleteButton: {
    backgroundColor: 'red', // Color rojo para el botón de eliminar
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 5, // Reducido el margen superior para acercar el botón
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:20,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FoodDispenserListScreen;
