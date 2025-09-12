import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile,
  sendPasswordResetEmail,
  confirmPasswordReset,
  verifyPasswordResetCode
} from 'firebase/auth';
import { auth } from './index';

// Auth providers
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

// Email/Password Authentication
export const signUpWithEmail = async (email: string, password: string, displayName?: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    if (displayName && result.user) {
      await updateProfile(result.user, { displayName });
    }
    
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Social Authentication
export const signInWithGoogle = async () => {
  try {
    return await signInWithPopup(auth, googleProvider);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const signInWithGithub = async () => {
  try {
    return await signInWithPopup(auth, githubProvider);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Sign Out
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Password Reset
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const confirmPasswordResetCode = async (code: string, newPassword: string) => {
  try {
    await confirmPasswordReset(auth, code, newPassword);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const verifyResetCode = async (code: string) => {
  try {
    return await verifyPasswordResetCode(auth, code);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Auth State Observer
export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};