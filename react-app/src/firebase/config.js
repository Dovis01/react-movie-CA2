// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCwa2uw6EucB4davticSjBW3jhj9DCWqjQ",
    authDomain: "totemic-atom-399213.firebaseapp.com",
    projectId: "totemic-atom-399213",
    storageBucket: "totemic-atom-399213.appspot.com",
    messagingSenderId: "922992244790",
    appId: "1:922992244790:web:5067fca9b1cadf4c55c097",
    measurementId: "G-MYWNW67JMD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);