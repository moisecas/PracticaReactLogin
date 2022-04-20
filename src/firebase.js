//inicializando la base de datos y el metodo autenticación de firebase 

import app from 'firebase/app'
import 'firebase/firestore' //importamos o traemos todo lo que requerimos para la conexión a la base de datos 
import 'firebase/auth' 


//traemos de la configuración de firebase del proyecto lo siguiente
const firebaseConfig = {
    apiKey: "AIzaSyCAcbs3b5kwADIIut7-KmtpJUS9k9aRU6c",
    authDomain: "crud-eventos-react.firebaseapp.com",
    projectId: "crud-eventos-react",
    storageBucket: "crud-eventos-react.appspot.com",
    messagingSenderId: "1087123225752",
    appId: "1:1087123225752:web:ceb57517016475f59224ed"
  };
  
  // Initialize Firebase
  app.initializeApp(firebaseConfig); 

  const db = app.firestore() 
  const auth = app.auth() 

  export {db, auth} 