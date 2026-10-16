import { db } from './firebase-config.js';
import {
  collection, addDoc, serverTimestamp, onSnapshot, query, orderBy
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// Add a study material. Firestore Rules must restrict writes to the admin UID.
export async function addStudyMaterial(title, category, link, createdByUid) {
  const cleanTitle = String(title || '').trim();
  const cleanCategory = String(category || '').trim();
  const cleanLink = String(link || '').trim();
  if (!cleanTitle || !cleanCategory || !/^https:\/\//i.test(cleanLink)) {
    throw new Error('Title, category aur valid HTTPS link zaroori hain.');
  }
  return addDoc(collection(db, 'materials'), {
    title: cleanTitle.slice(0, 100),
    category: cleanCategory.slice(0, 60),
    link: cleanLink,
    createdByUid: String(createdByUid || ''),
    createdAt: serverTimestamp()
  });
}

// Real-time material listener. Returns unsubscribe() for cleanup.
export function listenToMaterials(callback, onError = console.error) {
  const q = query(collection(db, 'materials'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, snapshot => {
    const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(list);
  }, onError);
}
