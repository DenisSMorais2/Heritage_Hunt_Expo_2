import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/authService';
import { monumentService } from '../../services/monumentService';
import { Monument } from '../../types';
import Header from '../../components/Header';
import { colors, spacing, borderRadius } from '../../constants/theme';

/**
 * Tela de Perfil
 */
export default function ProfileScreen() {
  const { user, userProfile, reloadProfile } = useAuth();
  
  // Estados
  const [monuments, setMonuments] = useState<Monument[]>([]);
  const [loading, setLoading] = useState(true);

  // Carrega monumentos ao montar
  useEffect(() => {
    loadMonuments();
  }, []);

  const loadMonuments = async () => {
    try {
      const data = await monumentService.getAllMonuments();
      setMonuments(data);
    } catch (error) {
      console.error('Erro ao carregar monumentos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Confirma logout
  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sair', 
          onPress: async () => {
            await authService.logout();
            router.replace('/');
          },
          style: 'destructive'
        },
      ]
    );
  };

  // Filtra monumentos descobertos
  const discoveredMonuments = monuments.filter(m => 
    userProfile?.scannedMonuments.includes(m.id)
  );

  // Calcula estatísticas
  const totalMonuments = monuments.length;
  const discoveredCount = discoveredMonuments.length;
  const percentage = totalMonuments > 0 
    ? (discoveredCount / totalMonuments) * 100 
    : 0;

  if (loading) {
    return (
      <View style={styles.container}>
        <Header 
          title="Meu Perfil"
          points={userProfile?.points}
          userName={userProfile?.displayName}
        />
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header 
        title="Meu Perfil"
        showLogout
        onLogout={handleLogout}
        points={userProfile?.points}
        userName={userProfile?.displayName}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Card de perfil */}
        <View style={styles.profileCard}>
          {/* Foto */}
          <View style={styles.photoContainer}>
            {userProfile?.photoURL ? (
              <Image 
                source={{ uri: userProfile.photoURL }} 
                style={styles.photo} 
              />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Ionicons name="person" size={48} color="white" />
              </View>
            )}
          </View>

          {/* Nome e email */}
          <Text style={styles.userName}>{userProfile?.displayName}</Text>
          <Text style={styles.userEmail}>{userProfile?.email}</Text>

          {/* Estatísticas */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userProfile?.points || 0}</Text>
              <Text style={styles.statLabel}>Pontos</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{discoveredCount}</Text>
              <Text style={styles.statLabel}>Descobertos</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {userProfile?.unlockedBadges.length || 0}
              </Text>
              <Text style={styles.statLabel}>Conquistas</Text>
            </View>
          </View>
        </View>

        {/* Progresso */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progresso Geral</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressInfo}>
              <Text style={styles.progressLabel}>
                {discoveredCount} de {totalMonuments} monumentos
              </Text>
              <Text style={styles.progressPercentage}>
                {percentage.toFixed(0)}%
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${percentage}%` }
                ]} 
              />
            </View>
          </View>
        </View>

        {/* Monumentos descobertos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Monumentos Descobertos ({discoveredCount})
          </Text>
          
          {discoveredMonuments.length > 0 ? (
            discoveredMonuments.map((monument) => (
              <View key={monument.id} style={styles.monumentCard}>
                <Image 
                  source={{ uri: monument.imageUrl }} 
                  style={styles.monumentImage}
                />
                <View style={styles.monumentInfo}>
                  <Text style={styles.monumentName} numberOfLines={1}>
                    {monument.name}
                  </Text>
                  <Text style={styles.monumentDescription} numberOfLines={2}>
                    {monument.description}
                  </Text>
                  <View style={styles.pointsBadge}>
                    <Ionicons name="star" size={14} color={colors.warning} />
                    <Text style={styles.pointsText}>+{monument.points}</Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="scan-outline" size={64} color={colors.gray} />
              <Text style={styles.emptyTitle}>Nenhum monumento ainda</Text>
              <Text style={styles.emptyDescription}>
                Escaneie QR codes para descobrir monumentos!
              </Text>
            </View>
          )}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: 'white',
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  photoContainer: {
    marginBottom: spacing.md,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: colors.primary,
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: colors.primary,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: spacing.xs,
  },
  userEmail: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.light,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    width: '100%',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.gray,
    marginTop: spacing.xs,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.gray + '40',
  },
  section: {
    backgroundColor: 'white',
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: spacing.md,
  },
  progressContainer: {
    width: '100%',
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  progressLabel: {
    fontSize: 14,
    color: colors.dark,
    fontWeight: '600',
  },
  progressPercentage: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.light,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.success,
    borderRadius: borderRadius.sm,
  },
  monumentCard: {
    flexDirection: 'row',
    backgroundColor: colors.light,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  monumentImage: {
    width: 80,
    height: 80,
  },
  monumentInfo: {
    flex: 1,
    padding: spacing.sm,
    justifyContent: 'space-between',
  },
  monumentName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.dark,
  },
  monumentDescription: {
    fontSize: 12,
    color: colors.gray,
    lineHeight: 16,
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
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
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  emptyDescription: {
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
  },
});