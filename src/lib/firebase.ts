// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v9-compat and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZ8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8", // 실제 API 키로 교체하세요
  authDomain: "voro-8cc03.firebaseapp.com",
  projectId: "voro-8cc03",
  storageBucket: "voro-8cc03.appspot.com",
  messagingSenderId: "919022056578",
  appId: "1:919022056578:web:3e146684e597e32128309b",
  measurementId: "G-XXXXXXXXXX" // Analytics를 사용한다면 실제 측정 ID로 교체하세요
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics (only in browser environment)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { analytics };
export default app; 