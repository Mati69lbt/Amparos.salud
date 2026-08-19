import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

const LEADS_COLLECTION = "leads";

export const addLead = (lead) => {
  return addDoc(collection(db, LEADS_COLLECTION), {
    name: lead.name ?? "",
    email: lead.email ?? "",
    phone: lead.phone ?? "",
    prepaga: lead.prepaga ?? "",
    message: lead.message ?? "",
    status: lead.status ?? "Nuevo",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const subscribeToLeads = (onChange, onError) => {
  const leadsQuery = query(
    collection(db, LEADS_COLLECTION),
    orderBy("createdAt", "desc"),
  );

  return onSnapshot(
    leadsQuery,
    (snapshot) => {
      const leads = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      onChange(leads);
    },
    onError,
  );
};

export const updateLead = (id, changes) => {
  return updateDoc(doc(db, LEADS_COLLECTION, id), {
    ...changes,
    updatedAt: serverTimestamp(),
  });
};

export const deleteLead = (id) => {
  return deleteDoc(doc(db, LEADS_COLLECTION, id));
};
