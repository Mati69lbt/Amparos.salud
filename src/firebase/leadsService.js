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
    utm_source: lead.utm_source ?? "",
    utm_medium: lead.utm_medium ?? "",
    utm_campaign: lead.utm_campaign ?? "",
    utm_content: lead.utm_content ?? "",
    utm_term: lead.utm_term ?? "",
    fbclid: lead.fbclid ?? "",
    fbp: lead.fbp ?? "",
    fbc: lead.fbc ?? "",
    eventId: lead.eventId ?? "",
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
