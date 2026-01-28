import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../constants/theme';

/**
 * Tipo do Badge
 */
type Badge = {
  id: string;
  name: string;
  description: string;
  threshold: number;
  type: 'count' | 'points';
  icon: string;
  color: string;
  message: string;
};

/**
 * Props do componente BadgeCard
 */
type BadgeCardProps = {
  badge: Badge;
  unlocked: boolean;
  onPress?: () => void;
};

/**
 * Componente de Card de Badge/Conquista
 * 
 * Uso:
 * <BadgeCard 
 *   badge={badgeData} 
 *   unlocked={true} 
 *   onPress={() => console.log('Badge clicado')}
 * />
 */
export default function BadgeCard({ badge, unlocked, onPress }: BadgeCardProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { opacity: unlocked ? 1 : 0.5 }
      ]}
      onPress={onPress}
      disabled={!unlocked}
      activeOpacity={0.7}
    >
      {/* Ícone do badge */}
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: unlocked ? badge.color : colors.light }
        ]}
      >
        <Ionicons
          name={badge.icon as any}
          size={32}
          color={unlocked ? 'white' : colors.gray}
        />
      </View>
      
      {/* Informações do badge */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{badge.name}</Text>
        <Text style={styles.description}>{badge.description}</Text>
        
        {/* Badge de status */}
        {unlocked ? (
          <View style={styles.unlockedBadge}>
            <Ionicons name="checkmark-circle" size={16} color={colors.success} />
            <Text style={styles.unlockedText}>Conquistado!</Text>
          </View>
        ) : (
          <View style={styles.lockedBadge}>
            <Ionicons name="lock-closed" size={16} color={colors.gray} />
            <Text style={styles.lockedText}>Bloqueado</Text>
          </View>
        )}
      </View>
      
      {/* Seta indicadora (só se desbloqueado) */}
      {unlocked && (
        <Ionicons name="chevron-forward" size={20} color={colors.gray} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: spacing.xs,
  },
  unlockedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  unlockedText: {
    fontSize: 12,
    color: colors.success,
    fontWeight: '600',
  },
  lockedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  lockedText: {
    fontSize: 12,
    color: colors.gray,
    fontWeight: '600',
  },
});