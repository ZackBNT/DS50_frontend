import firebase from "firebase/compat/app"
import "firebase/compat/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyAV_N30NXID1nF08hgZNUdJYpPxtuhCMYQ",

    authDomain: "bookstore-bf6df.firebaseapp.com",
  
    projectId: "bookstore-bf6df",
  
    storageBucket: "bookstore-bf6df.appspot.com",
  
    messagingSenderId: "463083347796",
  
    appId: "1:463083347796:web:873067d7051726db8f72c1",
  
    measurementId: "G-9E2896KG85"
  })

export const auth = app.auth()
export default app