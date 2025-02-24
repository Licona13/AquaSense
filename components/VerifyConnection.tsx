import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';

const UserListScreen = () => {
  const [users, setUsers] = useState<{ id: string; email: string; password: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      if (!querySnapshot.empty) {
        const usersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          email: doc.data().email || 'Sin email',
          password: doc.data().password || 'Sin contraseña',
        }));
        setUsers(usersData);
      } else {
        setUsers([]);
        Alert.alert('Información', 'No hay usuarios en la colección.');
      }
    } catch (error) {
      console.error('❌ Error al obtener usuarios:', error);
      Alert.alert('Error', 'No se pudo obtener los usuarios.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Lista de Usuarios</Text>

      {loading ? <Text>Cargando...</Text> : null}

      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>📧 Email: {item.email}</Text>
            <Text>🔑 Contraseña: {item.password}</Text>
          </View>
        )}
      />

      <Button title="Recargar Datos" onPress={fetchUsers} />
    </View>
  );
};

export default UserListScreen;
