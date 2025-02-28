// lib/types.ts

export type WaterQualityItemProps = {
  pond_name: string;
  ph_level: number;
  oxygen_level: number;
  temperature: number;
  timestamp: string; // Si prefieres trabajar con un tipo de fecha, puedes usar Date
};
