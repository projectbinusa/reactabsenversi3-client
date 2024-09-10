import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAcMqSJJ_KGh1-YWGneFvhXDe07zWDvLDk",
    authDomain: "tugas-firebase-9dba4.firebaseapp.com",
    databaseURL: "https://tugas-firebase-9dba4-default-rtdb.firebaseio.com",
    projectId: "tugas-firebase-9dba4",
    storageBucket: "tugas-firebase-9dba4.appspot.com",
    messagingSenderId: "662462937351",
    appId: "1:662462937351:web:e0da51472e5d57fe4aeda2",
    measurementId: "G-MDVGC810ZG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { analytics };
