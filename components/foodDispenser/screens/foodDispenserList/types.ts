// types.ts o foodDispenserTypes.ts
import { Timestamp } from 'firebase/firestore';

// Aquí definimos el tipo que describe los datos del dispensador de comida
export interface FoodDispenserItemProps {
  id: string; // Identificador único del dispensador de comida
  comment: string | null; // Comentario opcional, puede ser una cadena de texto o null si no se proporciona
  foodLevel: string; // Nivel de comida (por ejemplo, 'alto', 'medio', 'bajo')
  interval: string; // Intervalo de tiempo en horas ('4', '6', '8', etc.)
  timestamp: Timestamp; // Timestamp de Firebase, para almacenar la fecha y hora en que se crea el dispensador
}
