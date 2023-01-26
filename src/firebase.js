import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyChDiR_ZQoSb5bekGM4ZbYYUtEnoqr5iXI",
    authDomain: "practica-crud-react-firebasev1.firebaseapp.com",
    projectId: "practica-crud-react-firebasev1",
    storageBucket: "practica-crud-react-firebasev1.appspot.com",
    messagingSenderId: "407411080707",
    appId: "1:407411080707:web:5255d7a01b48bc0a2c5836",
    measurementId: "G-X8JTPVV3FN"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export {firebase}
