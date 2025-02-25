import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Asegúrate de importar correctamente la instancia de Firestore

export const addWaterQuality = async (data: { oxygen_level: number, ph_level: number, pond_name: string }) => {
  try {
    await addDoc(collection(db, "water_quality"), {
      ...data,
      timestamp: Timestamp.fromDate(new Date()),  // Usa Firebase Timestamp
    });
  } catch (error) {
    throw new Error('Error al agregar los datos');
  }
};
