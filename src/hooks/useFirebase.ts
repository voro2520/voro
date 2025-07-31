import { getFirebaseAuth, getFirebaseDB, getFirebaseStorage } from '@/lib/firebase';
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { 
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  DocumentData
} from 'firebase/firestore';
import { 
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage';
import { useState, useEffect } from 'react';

// Auth Hook
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (email: string, password: string) => {
    const auth = getFirebaseAuth();
    return signInWithEmailAndPassword(auth, email, password);
  };

  const register = (email: string, password: string) => {
    const auth = getFirebaseAuth();
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    const auth = getFirebaseAuth();
    return signOut(auth);
  };

  return {
    user,
    loading,
    login,
    register,
    logout
  };
};

// Firestore Hook
export const useFirestore = () => {
  // eslint-disable-next-line
  const addDocument = (collectionName: string, data: any) => {
    const db = getFirebaseDB();
    return addDoc(collection(db, collectionName), data);
  };

  const getDocuments = (collectionName: string) => {
    const db = getFirebaseDB();
    return getDocs(collection(db, collectionName));
  };

  const getDocument = (collectionName: string, id: string) => {
    const db = getFirebaseDB();
    return getDoc(doc(db, collectionName, id));
  };

  // eslint-disable-next-line
  const updateDocument = (collectionName: string, id: string, data: any) => {
    const db = getFirebaseDB();
    return updateDoc(doc(db, collectionName, id), data);
  };

  const deleteDocument = (collectionName: string, id: string) => {
    const db = getFirebaseDB();
    return deleteDoc(doc(db, collectionName, id));
  };

  return {
    addDocument,
    getDocuments,
    getDocument,
    updateDocument,
    deleteDocument
  };
};

// Storage Hook
export const useStorage = () => {
  const uploadFile = (path: string, file: File) => {
    const storage = getFirebaseStorage();
    const storageRef = ref(storage, path);
    return uploadBytes(storageRef, file);
  };

  const getFileURL = (path: string) => {
    const storage = getFirebaseStorage();
    const storageRef = ref(storage, path);
    return getDownloadURL(storageRef);
  };

  const deleteFile = (path: string) => {
    const storage = getFirebaseStorage();
    const storageRef = ref(storage, path);
    return deleteObject(storageRef);
  };

  return {
    uploadFile,
    getFileURL,
    deleteFile
  };
}; 