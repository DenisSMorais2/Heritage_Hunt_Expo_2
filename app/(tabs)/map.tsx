import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Header from '../../components/Header';
import { borderRadius, colors, spacing } from '../../constants/theme';
import { useAuth } from '../../hooks/useAuth';
import { monumentService } from '../../services/monumentService';
import { Monument } from '../../types';

/**
 * Tela do Mapa
 */
export default function MapScreen() {
  const { userProfile } = useAuth();
  
  // Estados
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [monuments, setMonuments] = useState<Monument[]>([]);
  const [loading, setLoading] = useState(true);

  // Carrega dados ao montar
  useEffect(() => {
    requestPermission();
    loadMonuments();
  }, []);

  // Pede permissão de localização
  const requestPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Não foi possível acessar sua localização');
      setLoading(false);
      return;
    }
    
    setHasPermission(true);
    
    // Obtém localização
    const userLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    
    setLocation(userLocation);
    setLoading(false);
  };

  // Carrega monumentos do Firebase
  const loadMonuments = async () => {
    try {
      const data = await monumentService.getAllMonuments();
      setMonuments(data);
    } catch (error) {
      console.error('Erro ao carregar monumentos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os monumentos');
    }
  };

  // Verifica se monumento foi escaneado
  const isScanned = (monumentId: string): boolean => {
    return userProfile?.scannedMonuments.includes(monumentId) || false;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header 
          title="Mapa de Monumentos"
          points={userProfile?.points}
          userName={userProfile?.displayName}
        />
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.message}>Carregando mapa...</Text>
        </View>
      </View>
    );
  }

  if (!hasPermission || !location) {
    return (
      <View style={styles.container}>
        <Header 
          title="Mapa de Monumentos"
          points={userProfile?.points}
          userName={userProfile?.displayName}
        />
        <View style={styles.centerContent}>
          <Ionicons name="location-off" size={64} color={colors.gray} />
          <Text style={styles.message}>Sem acesso à localização</Text>
          <TouchableOpacity style={styles.button} onPress={requestPermission}>
            <Text style={styles.buttonText}>Solicitar Permissão</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header 
        title="Mapa de Monumentos"
        subtitle={`${userProfile?.scannedMonuments.length || 0} de ${monuments.length} descobertos`}
        points={userProfile?.points}
        userName={userProfile?.displayName}
      />

      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          showsUserLocation
          showsMyLocationButton
        >
          {/* Marcadores dos monumentos */}
          {monuments.map((monument) => {
            const discovered = isScanned(monument.id);
            
            return (
              <Marker
                key={monument.id}
                coordinate={{
                  latitude: monument.latitude,
                  longitude: monument.longitude,
                }}
                pinColor={discovered ? colors.success : colors.danger}
                title={monument.name}
                description={discovered ? 'Descoberto' : 'Bloqueado'}
              />
            );
          })}
        </MapView>

        {/* Legenda */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.success }]} />
            <Text style={styles.legendText}>Descoberto</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.danger }]} />
            <Text style={styles.legendText}>Bloqueado</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  message: {
    fontSize: 16,
    color: colors.gray,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  legend: {
    position: 'absolute',
    bottom: spacing.md,
    left: spacing.md,
    backgroundColor: 'white',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    flexDirection: 'row',
    gap: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 12,
    color: colors.dark,
    fontWeight: '600',
  },
});