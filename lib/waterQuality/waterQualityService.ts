import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";// Asegúrate de importar correctamente la instancia de Firestore

// Definir el tipo de los datos que esperamos
export interface WaterQualityData {
  id: string;
  pond_name: string;
  oxygen_level: number;
  ph_level: number;
  timestamp: { seconds: number }; // o usa 'firebase.firestore.Timestamp' si usas Firestore Timestamp
}

export const getWaterQualityData = async (): Promise<WaterQualityData[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "water_quality"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as WaterQualityData[]; // Aseguramos que el tipo sea 'WaterQualityData[]'
    return data;
  } catch (error) {
    throw new Error("Error al obtener los datos");
  }
};
