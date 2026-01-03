import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  increment,
  arrayUnion,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { UserProfile } from '../types';

/**
 * Serviço de Usuário
 * Gerencia dados do usuário no Firestore
 */
class UserService {
  /**
   * Cria perfil inicial do usuário no Firestore
   */
  async createUserProfile(
    uid: string,
    data: {
      email: string;
      displayName: string;
      photoURL: string | null;
    }
  ): Promise<void> {
    try {
      const userRef = doc(db, 'users', uid);
      
      const profileData: Partial<UserProfile> = {
        uid,
        email: data.email,
        displayName: data.displayName,
        photoURL: data.photoURL || '',
        points: 0,
        scannedMonuments: [],
        unlockedBadges: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await setDoc(userRef, profileData);
      console.log('Perfil criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar perfil:', error);
      throw error;
    }
  }

  /**
   * Busca perfil do usuário
   */
  async getUserProfile(uid: string): Promise<UserProfile | null> {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        return userSnap.data() as UserProfile;
      }

      return null;
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      return null;
    }
  }

  /**
   * Adiciona monumento escaneado
   */
  async addScannedMonument(
    uid: string,
    monumentId: string,
    points: number
  ): Promise<{ success: boolean; message: string }> {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        return { success: false, message: 'Usuário não encontrado' };
      }

      const userData = userSnap.data() as UserProfile;

      // Verifica se já foi escaneado
      if (userData.scannedMonuments.includes(monumentId)) {
        return { success: false, message: 'Monumento já descoberto!' };
      }

      // Atualiza Firestore
      await updateDoc(userRef, {
        scannedMonuments: arrayUnion(monumentId),
        points: increment(points),
        updatedAt: serverTimestamp(),
      });

      return { success: true, message: 'Monumento descoberto!' };
    } catch (error) {
      console.error('Erro ao adicionar monumento:', error);
      return { success: false, message: 'Erro ao salvar monumento' };
    }
  }

  /**
   * Desbloqueia badge
   */
  async unlockBadge(uid: string, badgeId: string): Promise<void> {
    try {
      const userRef = doc(db, 'users', uid);
      
      await updateDoc(userRef, {
        unlockedBadges: arrayUnion(badgeId),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Erro ao desbloquear badge:', error);
      throw error;
    }
  }

  /**
   * Atualiza foto do perfil
   */
  async updateProfilePhoto(uid: string, photoURL: string): Promise<void> {
    try {
      const userRef = doc(db, 'users', uid);
      
      await updateDoc(userRef, {
        photoURL,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Erro ao atualizar foto:', error);
      throw error;
    }
  }
}

export const userService = new UserService();