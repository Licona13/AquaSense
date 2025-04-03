import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FoodDispenserItemProps } from './types'; // Ajusta la ruta a donde esté tu tipo
import Icon from 'react-native-vector-icons/FontAwesome'; // Asegúrate de tener instalada la librería

const FoodDispenserItem = ({ data }: { data: FoodDispenserItemProps }) => {
  const { comment, foodLevel, interval, timestamp } = data;

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Icon name="cutlery" size={30} color="#4CAF50" />
        <Text style={styles.cardTitle}>Nivel de Comida: {foodLevel}</Text>
      </View>
      <Text style={styles.cardText}>Comentario: {comment || 'No hay comentario'}</Text>
      <View style={styles.row}>
        <Icon name="hourglass-half" size={30} color="#FF9800" />
        <Text style={styles.cardText}>Tiempo: {interval} horas</Text>
      </View>
      <View style={styles.row}>
        <Icon name="calendar" size={30} color="#2196F3" />
        <Text style={styles.cardText}>Fecha: {timestamp.toDate().toLocaleString()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffffaa',
    borderRadius: 15, 
    padding: 20, 
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, 
  },
  cardTitle: {
    fontSize: 20, 
    fontWeight: 'bold',
    marginLeft: 15, 
  },
  cardText: {
    fontSize: 18, 
    color: '#333',
    marginBottom: 5, 
  },
});

export default FoodDispenserItem;
