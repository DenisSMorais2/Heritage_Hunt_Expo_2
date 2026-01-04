import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';
import { monumentService } from '../../services/monumentService';
import { userService } from '../../services/userService';
import Header from '../../components/Header';
import { colors, spacing, borderRadius } from '../../constants/theme';

/**
 * Tela do Scanner de QR Code
 */
export default function ScannerScreen() {
  const { user, userProfile, reloadProfile } = useAuth();
  
  // Estados
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [processing, setProcessing] = useState(false);

  // Pede permissão da câmera
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Processa QR code escaneado
  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    if (scanned || processing) return;
    
    setScanned(true);
    setProcessing(true);

    try {
      // Busca monumento no Firebase
      const monument = await monumentService.getMonumentByQRCode(data);

      if (!monument) {
        Alert.alert('QR Code Inválido', 'Este QR code não pertence ao Heritage Hunt CV');
        setTimeout(() => {
          setScanned(false);
          setProcessing(false);
        }, 2000);
        return;
      }

      // Adiciona monumento ao perfil
      if (user) {
        const result = await userService.addScannedMonument(
          user.uid,
          monument.id,
          monument.points
        );

        if (result.success) {
          // Recarrega perfil
          await reloadProfile();
          
          Alert.alert(
            'Parabéns! 🎉',
            `Você descobriu ${monument.name} e ganhou ${monument.points} pontos!`,
            [
              {
                text: 'Legal!',
                onPress: () => {
                  setScanning(false);
                  setScanned(false);
                  setProcessing(false);
                }
              }
            ]
          );
        } else {
          Alert.alert('Ops!', result.message);
          setScanning(false);
          setScanned(false);
          setProcessing(false);
        }
      }
    } catch (error) {
      console.error('Erro ao processar QR code:', error);
      Alert.alert('Erro', 'Não foi possível processar o QR code');
      setScanned(false);
      setProcessing(false);
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Header title="Scanner de Monumentos" userName={userProfile?.displayName} />
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.message}>Solicitando permissão...</Text>
        </View>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Header title="Scanner de Monumentos" userName={userProfile?.displayName} />
        <View style={styles.centerContent}>
          <Ionicons name="camera-off" size={64} color={colors.gray} />
          <Text style={styles.message}>Sem acesso à câmera</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header 
        title="Scanner de Monumentos"
        subtitle={`${userProfile?.scannedMonuments.length || 0} monumentos descobertos`}
        points={userProfile?.points}
        userName={userProfile?.displayName}
      />

      <View style={styles.content}>
        {!scanning ? (
          <View style={styles.initialView}>
            <Ionicons name="qr-code-outline" size={120} color={colors.primary} />
            <Text style={styles.title}>Descubra Monumentos</Text>
            <Text style={styles.description}>
              Aponte a câmera para o QR code nos monumentos
            </Text>
            
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => setScanning(true)}
            >
              <Ionicons name="camera" size={24} color="white" />
              <Text style={styles.startButtonText}>Iniciar Scanner</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.scannerContainer}>
            <CameraView
              style={StyleSheet.absoluteFillObject}
              facing="back"
              onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
              barcodeScannerSettings={{
                barcodeTypes: ['qr'],
              }}
            />

            <View style={styles.overlay}>
              <View style={styles.scanFrame}>
                <View style={[styles.corner, styles.topLeft]} />
                <View style={[styles.corner, styles.topRight]} />
                <View style={[styles.corner, styles.bottomLeft]} />
                <View style={[styles.corner, styles.bottomRight]} />
              </View>
              <Text style={styles.scanText}>
                {processing ? 'Processando...' : 'Procurando QR Code...'}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setScanning(false);
                setScanned(false);
              }}
            >
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
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
  },
  initialView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  startButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    gap: spacing.sm,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scannerContainer: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 280,
    height: 280,
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: 'white',
    borderWidth: 4,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  scanText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: spacing.lg,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: spacing.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.danger,
    justifyContent: 'center',
    alignItems: 'center',
  },
});