import { useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { userService } from '../services/userService';
import { UserProfile } from '../types';

/**
 * Hook customizado para gerenciar autenticação
 * Substitui o Context API, usando hook direto
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Observa mudanças no estado de autenticação
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        // Usuário logado - busca perfil do Firestore
        const profile = await userService.getUserProfile(firebaseUser.uid);
        setUserProfile(profile);
      } else {
        // Usuário deslogado
        setUserProfile(null);
      }

      setLoading(false);
    });

    // Cleanup: remove o observador quando componente desmonta
    return unsubscribe;
  }, []);

  /**
   * Recarrega perfil do usuário
   */
  const reloadProfile = async () => {
    if (user) {
      const profile = await userService.getUserProfile(user.uid);
      setUserProfile(profile);
    }
  };

  return {
    user,
    userProfile,
    loading,
    isAuthenticated: user !== null,
    reloadProfile,
  };
}