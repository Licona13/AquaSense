// HomeScreen.js o HomeScreen.tsx
import React from 'react';
import { StatusBar } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeView(){
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" hidden={false} />
      <Text style={styles.title}>Bienvenido a AquaSense</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding:20,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color:"white",
  },
});


