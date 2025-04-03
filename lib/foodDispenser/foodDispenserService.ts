// src/services/foodDispenserService.ts
import { db } from '../firebaseConfig'; // Asegúrate de que este archivo esté configurado correctamente
import { collection, query, onSnapshot, orderBy, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore'; // Importa Timestamp

interface FoodDispenserData {
  id: string;
  comment: string;
  foodLevel: string;
  interval: string;
  timestamp: Timestamp;
}

// Agregar 
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

// Eliminar 
export const deleteFoodDispenserData = async (id: string) => {
  try {
    const docRef = doc(db, 'foodDispenser', id); // Usa doc para obtener el documento con su ID
    await deleteDoc(docRef); // Elimina el documento
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    console.error('Error al eliminar el dispensador de comida:', errorMessage);
    return { success: false, error: errorMessage };
  }
};

// Obtener los datos
export const getFoodDispensers = (callback: (dispensers: any[]) => void) => {
  const dispenserRef = collection(db, 'foodDispenser'); 
  const q = query(dispenserRef, orderBy('timestamp', 'desc')); // Consultar por timestamp

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

  return unsubscribe; // Devuelve el unsubscribe para cancelar el listener cuando se desmonte el componente
};
