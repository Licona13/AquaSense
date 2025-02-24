import { signInWithEmailAndPassword } from 'firebase/auth'; 
//Función de Firebase para autenticar usuarios con correo y contraseña.
import { auth } from '../firebaseConfig'; 
//Se importa donde se inicializó la autenticación de Firebase.


// Función de login
export const login = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log('Usuario autenticado');
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw new Error('Error al iniciar sesión');
  }
};
