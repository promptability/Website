import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from './index';

// Firestore Collections
export const COLLECTIONS = {
  USERS: 'users',
  SUBSCRIPTIONS: 'subscriptions',
  PAYMENTS: 'payments',
  WEBHOOK_EVENTS: 'webhook_events'
};

// User Interface
export interface FirebaseUser {
  uid: string;
  email: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  photoURL?: string;
  stripeCustomerId?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Subscription Interface
export interface FirebaseSubscription {
  id: string;
  userId: string;
  stripeSubscriptionId: string;
  stripePriceId: string;
  status: string; // active, canceled, past_due, etc.
  planType: string; // starter, pro, team
  billingCycle: string; // monthly, yearly
  quantity: number;
  currentPeriodStart: Timestamp;
  currentPeriodEnd: Timestamp;
  cancelAtPeriodEnd: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Payment Interface
export interface FirebasePayment {
  id: string;
  userId: string;
  stripePaymentIntentId: string;
  amount: number; // in cents
  currency: string;
  status: string; // succeeded, failed, processing
  description?: string;
  createdAt: Timestamp;
}

// Webhook Event Interface
export interface FirebaseWebhookEvent {
  id: string;
  stripeEventId: string;
  type: string;
  processed: boolean;
  error?: string;
  createdAt: Timestamp;
}

// User Operations
export const createUser = async (uid: string, userData: Partial<FirebaseUser>): Promise<void> => {
  const userRef = doc(db, COLLECTIONS.USERS, uid);
  await setDoc(userRef, {
    uid,
    ...userData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
};

export const getUser = async (uid: string): Promise<FirebaseUser | null> => {
  const userRef = doc(db, COLLECTIONS.USERS, uid);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    return userSnap.data() as FirebaseUser;
  }
  
  return null;
};

export const updateUser = async (uid: string, userData: Partial<FirebaseUser>): Promise<void> => {
  const userRef = doc(db, COLLECTIONS.USERS, uid);
  await updateDoc(userRef, {
    ...userData,
    updatedAt: serverTimestamp()
  });
};

export const getUserByEmail = async (email: string): Promise<FirebaseUser | null> => {
  const usersRef = collection(db, COLLECTIONS.USERS);
  const q = query(usersRef, where('email', '==', email), limit(1));
  const querySnapshot = await getDocs(q);
  
  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].data() as FirebaseUser;
  }
  
  return null;
};

export const getUserByStripeCustomerId = async (customerId: string): Promise<FirebaseUser | null> => {
  const usersRef = collection(db, COLLECTIONS.USERS);
  const q = query(usersRef, where('stripeCustomerId', '==', customerId), limit(1));
  const querySnapshot = await getDocs(q);
  
  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].data() as FirebaseUser;
  }
  
  return null;
};

// Subscription Operations
export const createSubscription = async (subscriptionData: Omit<FirebaseSubscription, 'createdAt' | 'updatedAt'>): Promise<string> => {
  const subscriptionsRef = collection(db, COLLECTIONS.SUBSCRIPTIONS);
  const docRef = await addDoc(subscriptionsRef, {
    ...subscriptionData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return docRef.id;
};

export const getSubscription = async (id: string): Promise<FirebaseSubscription | null> => {
  const subscriptionRef = doc(db, COLLECTIONS.SUBSCRIPTIONS, id);
  const subscriptionSnap = await getDoc(subscriptionRef);
  
  if (subscriptionSnap.exists()) {
    return { id: subscriptionSnap.id, ...subscriptionSnap.data() } as FirebaseSubscription;
  }
  
  return null;
};

export const getSubscriptionByStripeId = async (stripeSubscriptionId: string): Promise<FirebaseSubscription | null> => {
  const subscriptionsRef = collection(db, COLLECTIONS.SUBSCRIPTIONS);
  const q = query(subscriptionsRef, where('stripeSubscriptionId', '==', stripeSubscriptionId), limit(1));
  const querySnapshot = await getDocs(q);
  
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as FirebaseSubscription;
  }
  
  return null;
};

export const updateSubscription = async (id: string, subscriptionData: Partial<FirebaseSubscription>): Promise<void> => {
  const subscriptionRef = doc(db, COLLECTIONS.SUBSCRIPTIONS, id);
  await updateDoc(subscriptionRef, {
    ...subscriptionData,
    updatedAt: serverTimestamp()
  });
};

export const getUserSubscriptions = async (userId: string): Promise<FirebaseSubscription[]> => {
  const subscriptionsRef = collection(db, COLLECTIONS.SUBSCRIPTIONS);
  const q = query(subscriptionsRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FirebaseSubscription));
};

// Payment Operations
export const createPayment = async (paymentData: Omit<FirebasePayment, 'createdAt'>): Promise<string> => {
  const paymentsRef = collection(db, COLLECTIONS.PAYMENTS);
  const docRef = await addDoc(paymentsRef, {
    ...paymentData,
    createdAt: serverTimestamp()
  });
  return docRef.id;
};

export const getUserPayments = async (userId: string): Promise<FirebasePayment[]> => {
  const paymentsRef = collection(db, COLLECTIONS.PAYMENTS);
  const q = query(paymentsRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FirebasePayment));
};

// Webhook Event Operations
export const createWebhookEvent = async (eventData: Omit<FirebaseWebhookEvent, 'id' | 'createdAt'>): Promise<string> => {
  const eventsRef = collection(db, COLLECTIONS.WEBHOOK_EVENTS);
  const docRef = await addDoc(eventsRef, {
    ...eventData,
    createdAt: serverTimestamp()
  });
  return docRef.id;
};

export const getWebhookEvent = async (stripeEventId: string): Promise<FirebaseWebhookEvent | null> => {
  const eventsRef = collection(db, COLLECTIONS.WEBHOOK_EVENTS);
  const q = query(eventsRef, where('stripeEventId', '==', stripeEventId), limit(1));
  const querySnapshot = await getDocs(q);
  
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as FirebaseWebhookEvent;
  }
  
  return null;
};

export const updateWebhookEvent = async (id: string, eventData: Partial<FirebaseWebhookEvent>): Promise<void> => {
  const eventRef = doc(db, COLLECTIONS.WEBHOOK_EVENTS, id);
  await updateDoc(eventRef, eventData);
};

// Real-time subscriptions
export const subscribeToUser = (uid: string, callback: (user: FirebaseUser | null) => void) => {
  const userRef = doc(db, COLLECTIONS.USERS, uid);
  return onSnapshot(userRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data() as FirebaseUser);
    } else {
      callback(null);
    }
  });
};

export const subscribeToUserSubscriptions = (userId: string, callback: (subscriptions: FirebaseSubscription[]) => void) => {
  const subscriptionsRef = collection(db, COLLECTIONS.SUBSCRIPTIONS);
  const q = query(subscriptionsRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));
  
  return onSnapshot(q, (snapshot) => {
    const subscriptions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FirebaseSubscription));
    callback(subscriptions);
  });
};