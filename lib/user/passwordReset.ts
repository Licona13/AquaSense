// utils/authUtils.ts
import { auth } from "@/lib/firebaseConfig"; // configuración de Firebase
import { sendPasswordResetEmail } from "firebase/auth"; //permite enviar correos de recuperación.

export const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email); 
    console.log('Correo de recuperación enviado');
    alert('Se ha enviado un correo para recuperar la contraseña.');
  } catch (error) {
    console.error('Error al enviar el correo de recuperación:', error);
    alert('Hubo un error al enviar el correo de recuperación.');
  }
};
