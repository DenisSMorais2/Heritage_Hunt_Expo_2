import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../constants/theme';

type HeaderProps = {
  title: string;
  subtitle?: string;
  points?: number;
  showLogout?: boolean;
  onLogout?: () => void;
  userName?: string;
};

/**
 * Cabeçalho reutilizável
 */
export default function Header({ 
  title, 
  subtitle,
  points = 0,
  showLogout = false,
  onLogout,
  userName 
}: HeaderProps) {
  return (
    <LinearGradient
      colors={[colors.secondary, colors.primary]}
      style={styles.header}
    >
      <View style={styles.topRow}>
        <View style={styles.leftSection}>
          {userName && (
            <Text style={styles.greeting}>Olá, {userName}!</Text>
          )}
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        
        <View style={styles.rightSection}>
          {/* Badge de pontos */}
          {points > 0 && (
            <View style={styles.pointsBadge}>
              <Ionicons name="star" size={16} color={colors.warning} />
              <Text style={styles.pointsText}>{points}</Text>
            </View>
          )}
          
          {/* Botão de logout */}
          {showLogout && onLogout && (
            <TouchableOpacity 
              style={styles.logoutButton}
              onPress={onLogout}
            >
              <Ionicons name="log-out-outline" size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderBottomLeftRadius: borderRadius.lg,
    borderBottomRightRadius: borderRadius.lg,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  leftSection: {
    flex: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  greeting: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: spacing.xs,
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    gap: 4,
  },
  pointsText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});