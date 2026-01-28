import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../constants/theme';

/**
 * Tipo do Monumento
 */
type Monument = {
  id: string;
  name: string;
  description: string;
  points: number;
  latitude: number;
  longitude: number;
  imageUrl: string;
  qrCode: string;
  category: string;
};

/**
 * Props do componente MonumentCard
 */
type MonumentCardProps = {
  monument: Monument;
  onPress?: () => void;
  compact?: boolean; // Versão compacta do card
};

/**
 * Componente de Card de Monumento
 * 
 * Uso:
 * <MonumentCard 
 *   monument={monumentData} 
 *   onPress={() => router.push(`/monument/${id}`)}
 * />
 * 
 * <MonumentCard 
 *   monument={monumentData} 
 *   compact={true}
 * />
 */
export default function MonumentCard({ 
  monument, 
  onPress,
  compact = false 
}: MonumentCardProps) {
  if (compact) {
    // Versão compacta (horizontal)
    return (
      <TouchableOpacity
        style={styles.compactContainer}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {/* Imagem pequena */}
        <Image
          source={{ uri: monument.imageUrl }}
          style={styles.compactImage}
          defaultSource={require('../assets/images/placeholder.png')}
        />
        
        {/* Info compacta */}
        <View style={styles.compactContent}>
          <Text style={styles.compactName} numberOfLines={1}>
            {monument.name}
          </Text>
          <Text style={styles.compactDescription} numberOfLines={1}>
            {monument.description}
          </Text>
          <View style={styles.compactFooter}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{monument.category}</Text>
            </View>
            <View style={styles.pointsBadge}>
              <Ionicons name="star" size={12} color={colors.warning} />
              <Text style={styles.pointsText}>+{monument.points}</Text>
            </View>
          </View>
        </View>
        
        <Ionicons name="chevron-forward" size={16} color={colors.gray} />
      </TouchableOpacity>
    );
  }

  // Versão padrão (vertical)
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Imagem */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: monument.imageUrl }}
          style={styles.image}
          defaultSource={require('../assets/images/placeholder.png')}
        />
        
        {/* Badge de categoria sobre a imagem */}
        <View style={styles.categoryBadgeOverlay}>
          <Text style={styles.categoryTextOverlay}>{monument.category}</Text>
        </View>
      </View>
      
      {/* Conteúdo */}
      <View style={styles.content}>
        {/* Nome e pontos */}
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={2}>
            {monument.name}
          </Text>
          <View style={styles.pointsBadgeLarge}>
            <Ionicons name="star" size={16} color={colors.warning} />
            <Text style={styles.pointsTextLarge}>+{monument.points}</Text>
          </View>
        </View>
        
        {/* Descrição */}
        <Text style={styles.description} numberOfLines={3}>
          {monument.description}
        </Text>
        
        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.statusBadge}>
            <Ionicons name="checkmark-circle" size={16} color={colors.success} />
            <Text style={styles.statusText}>Descoberto</Text>
          </View>
          
          <Ionicons name="chevron-forward" size={16} color={colors.gray} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Versão padrão (vertical)
  container: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  categoryBadgeOverlay: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  categoryTextOverlay: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
  content: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  name: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark,
    marginRight: spacing.sm,
  },
  pointsBadgeLarge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.warning + '20',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    gap: 4,
  },
  pointsTextLarge: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.warning,
  },
  description: {
    fontSize: 14,
    color: colors.gray,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.light,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  statusText: {
    fontSize: 12,
    color: colors.success,
    fontWeight: '600',
  },

  // Versão compacta (horizontal)
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    padding: spacing.sm,
  },
  compactImage: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.sm,
    marginRight: spacing.sm,
  },
  compactContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  compactName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: 4,
  },
  compactDescription: {
    fontSize: 12,
    color: colors.gray,
    marginBottom: spacing.xs,
  },
  compactFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  categoryBadge: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  categoryText: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: '600',
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.warning + '20',
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    gap: 2,
  },
  pointsText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.warning,
  },
});