import { initializeApp } from "firebase/app"
import { getFirestore, setDoc, getDoc, doc, DocumentData } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
}

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const docRef = doc(db, "template", "data")

export const write = (value: DocumentData) => {
  setDoc(docRef, { data: value })
}

export const read = async () => {
  const snap = await getDoc(docRef)
  return snap.data()
}

export default db
