import { auth, db, storage } from '@/lib/firebase';
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
  deleteDoc
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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const register = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addDocument = (collectionName: string, data: any) => {
    return addDoc(collection(db, collectionName), data);
  };

  const getDocuments = (collectionName: string) => {
    return getDocs(collection(db, collectionName));
  };

  const getDocument = (collectionName: string, id: string) => {
    return getDoc(doc(db, collectionName, id));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateDocument = (collectionName: string, id: string, data: any) => {
    return updateDoc(doc(db, collectionName, id), data);
  };

  const deleteDocument = (collectionName: string, id: string) => {
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
  const uploadFile = async (file: File, path: string) => {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    return getDownloadURL(snapshot.ref);
  };

  const deleteFile = (path: string) => {
    const storageRef = ref(storage, path);
    return deleteObject(storageRef);
  };

  return {
    uploadFile,
    deleteFile
  };
}; 