import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Monument } from '../types';

/**
 * Serviço de Monumentos
 * Gerencia dados dos monumentos
 */
class MonumentService {
  /**
   * Busca todos os monumentos
   */
  async getAllMonuments(): Promise<Monument[]> {
    try {
      const monumentsRef = collection(db, 'monuments');
      const q = query(monumentsRef, orderBy('name'));
      const querySnapshot = await getDocs(q);

      const monuments: Monument[] = [];
      querySnapshot.forEach((doc) => {
        monuments.push({
          id: doc.id,
          ...doc.data(),
        } as Monument);
      });

      return monuments;
    } catch (error) {
      console.error('Erro ao buscar monumentos:', error);
      return [];
    }
  }

  /**
   * Busca monumento por ID
   */
  async getMonumentById(id: string): Promise<Monument | null> {
    try {
      const monumentRef = doc(db, 'monuments', id);
      const monumentSnap = await getDoc(monumentRef);

      if (monumentSnap.exists()) {
        return {
          id: monumentSnap.id,
          ...monumentSnap.data(),
        } as Monument;
      }

      return null;
    } catch (error) {
      console.error('Erro ao buscar monumento:', error);
      return null;
    }
  }

  /**
   * Busca monumento por código QR
   */
  async getMonumentByQRCode(qrCode: string): Promise<Monument | null> {
    try {
      const monuments = await this.getAllMonuments();
      return monuments.find(m => m.qrCode === qrCode) || null;
    } catch (error) {
      console.error('Erro ao buscar monumento por QR:', error);
      return null;
    }
  }
}

export const monumentService = new MonumentService();