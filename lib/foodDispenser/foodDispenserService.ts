// src/services/foodDispenserService.ts
import { db } from '../firebaseConfig';
import { collection, query, onSnapshot, orderBy, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore'; // Importa Timestamp

interface FoodDispenserData {
  id: string;
  comment: string;
  foodLevel: string;
  interval: string;
  timestamp: Timestamp;
}

// Agregar un nuevo dispensador de comida a Firestore
export const addFoodDispenserData = async (comment: string, foodLevel: string, interval: string, timestamp: Timestamp) => {
  try {
    const newDocRef = doc(collection(db, 'foodDispenser'));
    await setDoc(newDocRef, {
      comment,
      foodLevel,
      interval,
      timestamp,
    });
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    console.error('Error al agregar el dispensador de comida:', errorMessage);
    return { success: false, error: errorMessage };
  }
};

// Eliminar un dispensador de comida
export const deleteFoodDispenserData = async (id: string) => {
  try {
    const docRef = doc(db, 'foodDispenser', id);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    console.error('Error al eliminar el dispensador de comida:', errorMessage);
    return { success: false, error: errorMessage };
  }
};

// Obtener los dispensadores de comida
export const getFoodDispensers = (callback: (dispensers: any[]) => void) => {
  const dispenserRef = collection(db, 'foodDispenser');
  const q = query(dispenserRef, orderBy('timestamp', 'desc'));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const dispenserData: any[] = [];
    querySnapshot.forEach((doc) => {
      dispenserData.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    callback(dispenserData); // Llama al callback para actualizar los datos
  });

  // Devuelve la función de cancelación para limpiar el listener cuando se desmonte el componente
  return unsubscribe;
};
