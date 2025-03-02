import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { WaterQualityItemProps } from "@/components/waterQualityNavigation/screens/waterQuality/types";

export interface WaterQualityData {
  id: string;
  pond_name: string;
  oxygen_level: number;
  ph_level: number;
  temperature: number;
  timestamp: { seconds: number }; // Formato Firestore
}

export const getWaterQualityData = async (): Promise<WaterQualityItemProps[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "water_quality"));
    const data = querySnapshot.docs.map((doc) => {
      const docData = doc.data();
      
      return {
        pond_name: docData.pond_name,
        oxygen_level: docData.oxygen_level,
        ph_level: docData.ph_level,
        temperature: docData.temperature,
        timestamp: new Date(docData.timestamp.seconds * 1000), // Convertimos a Date
      };
    });

    return data;
  } catch (error) {
    throw new Error("Error al obtener los datos");
  }
};
