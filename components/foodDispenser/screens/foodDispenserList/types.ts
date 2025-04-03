
import { Timestamp } from 'firebase/firestore';

// Aquí definimos el tipo que describe los datos del dispensador de comida
export interface FoodDispenserItemProps {
  id: string; // Identificador único del dispensador de comida
  comment: string | null; // Comentario opcional
  foodLevel: string; // Nivel de comida (por ejemplo, 'alto', 'medio', 'bajo')
  interval: string; // Intervalo de tiempo en horas ('4', '6', '8', etc.)
  timestamp: Timestamp; 
}
