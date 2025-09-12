'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { onAuthChange } from '@/lib/firebase/auth';
import { FirebaseUser, getUser, createUser } from '@/lib/firebase/firestore';

interface AuthContextType {
  user: User | null;
  userProfile: FirebaseUser | null;
  loading: boolean;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  refreshUserProfile: async () => {}
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUserProfile = async () => {
    if (user) {
      try {
        let profile = await getUser(user.uid);
        
        // Create user profile if it doesn't exist
        if (!profile) {
          const userData = {
            uid: user.uid,
            email: user.email!,
            firstName: user.displayName?.split(' ')[0] || '',
            lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
            displayName: user.displayName || '',
            photoURL: user.photoURL || ''
          };
          
          await createUser(user.uid, userData);
          profile = await getUser(user.uid);
        }
        
        setUserProfile(profile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setUserProfile(null);
      }
    } else {
      setUserProfile(null);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      setUser(user);
      setLoading(true);
      
      if (user) {
        await refreshUserProfile();
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Refresh profile when user changes
  useEffect(() => {
    if (user) {
      refreshUserProfile();
    }
  }, [user]);

  const value = {
    user,
    userProfile,
    loading,
    refreshUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};