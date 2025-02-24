import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//CREDENCiALES
const firebaseConfig = {
    apiKey: "AIzaSyC2vKcJAd4P0_WUD9_x7D9Q5lJUtByR2eg",
    authDomain: "aquasense-95386.firebaseapp.com",
    projectId: "aquasense-95386",
    storageBucket: "aquasense-95386.firebasestorage.app",
    messagingSenderId: "224877155144",
    appId: "1:224877155144:web:ddc364911e0b672d1c597d",
    measurementId: "G-ESZTTZQ5MJ"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig); //conectar Firebase con la app.
const auth = getAuth(app); // Se inicializa la autenticación
const db = getFirestore(app); // Se inicializa Firestore (base de datos)

export { auth, db };  //Usar en otros archivos del pro yecto,
