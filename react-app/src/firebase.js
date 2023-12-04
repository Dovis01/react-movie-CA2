import firebase from 'firebase/compat/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// 这里填写你的 Firebase 配置信息
const firebaseConfig = {
    apiKey: "AIzaSyCwa2uw6EucB4davticSjBW3jhj9DCWqjQ",
    authDomain: "totemic-atom-399213.firebaseapp.com",
    databaseURL: "https://totemic-atom-399213-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "totemic-atom-399213",
    storageBucket: "totemic-atom-399213.appspot.com",
    messagingSenderId: "922992244790",
    appId: "1:922992244790:web:2d709a60cfaf8c2855c097",
    measurementId: "G-HKMP636QS0"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, GoogleAuthProvider };