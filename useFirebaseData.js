import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

const kolekcjaCollectionRef = collection(db, "kolekcja");

export async function getData() {
  const snapshot = await getDocs(kolekcjaCollectionRef);
  const kolekcja = snapshot.docs.map((doc) => ({
    ...doc.data(),
  }));

  return kolekcja;
}
