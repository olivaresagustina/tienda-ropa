import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB0AUy_O2St0qpDDEwJVmtJKZczF9aXEPw",
    authDomain: "tienda-ropa-cadfc.firebaseapp.com",
    projectId: "tienda-ropa-cadfc",
    storageBucket: "tienda-ropa-cadfc.firebasestorage.app",
    messagingSenderId: "814617240250",
    appId: "1:814617240250:web:da0d871eeda9dc0c5bd883"
  };



const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);