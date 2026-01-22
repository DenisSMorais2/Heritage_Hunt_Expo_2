import {
  collection,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Badge } from '../types';
import { userService } from './userService';

class BadgeService {
  /**
   * Busca todos os badges
   */
  async getAllBadges(): Promise<Badge[]> {
    try {
      const badgesRef = collection(db, 'badges');
      const q = query(badgesRef, orderBy('threshold'));
      const querySnapshot = await getDocs(q);

      const badges: Badge[] = [];
      querySnapshot.forEach((doc) => {
        badges.push({
          id: doc.id,
          ...doc.data(),
        } as Badge);
      });

      return badges;
    } catch (error) {
      console.error('Erro ao buscar badges:', error);
      return [];
    }
  }

  /**
   * Verifica e desbloqueia badges
   */
  async checkAndUnlockBadges(
    uid: string,
    monumentCount: number,
    totalPoints: number,
    currentBadges: string[]
  ): Promise<Badge[]> {
    try {
      const allBadges = await this.getAllBadges();
      const newlyUnlocked: Badge[] = [];

      for (const badge of allBadges) {
        // Pula se já desbloqueado
        if (currentBadges.includes(badge.id)) {
          continue;
        }

        // Verifica condição
        let shouldUnlock = false;

        if (badge.type === 'count') {
          shouldUnlock = monumentCount >= badge.threshold;
        } else if (badge.type === 'points') {
          shouldUnlock = totalPoints >= badge.threshold;
        }

        // Desbloqueia
        if (shouldUnlock) {
          await userService.unlockBadge(uid, badge.id);
          newlyUnlocked.push(badge);
        }
      }

      return newlyUnlocked;
    } catch (error) {
      console.error('Erro ao verificar badges:', error);
      return [];
    }
  }
}

export const badgeService = new BadgeService();