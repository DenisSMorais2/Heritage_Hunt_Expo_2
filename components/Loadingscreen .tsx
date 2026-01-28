import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from "react-native";
import { colors, spacing } from "../constants/theme";

/**
 * Props do componente LoadingScreen
 */
type LoadingScreenProps = {
  message?: string; // Mensagem customizada
  showIcon?: boolean; // Mostra ícone (padrão: false)
  iconName?: string; // Nome do ícone (ex: 'rocket')
  backgroundColor?: string; // Cor de fundo
  size?: "small" | "large"; // Tamanho do spinner
  fullScreen?: boolean; // Ocupa tela inteira (padrão: true)
};

/**
 * Componente de Tela de Carregamento
 *
 * Uso básico:
 * <LoadingScreen />
 *
 * Com mensagem:
 * <LoadingScreen message="Carregando monumentos..." />
 *
 * Com ícone:
 * <LoadingScreen
 *   message="Preparando tudo para você"
 *   showIcon
 *   iconName="rocket"
 * />
 *
 * Inline (não fullscreen):
 * <LoadingScreen
 *   message="Carregando..."
 *   fullScreen={false}
 * />
 */
export default function LoadingScreen({
  message = "Carregando...",
  showIcon = false,
  iconName = "time",
  backgroundColor = "white",
  size = "large",
  fullScreen = true,
}: LoadingScreenProps) {
  const containerStyle: ViewStyle = fullScreen
    ? styles.fullScreenContainer
    : styles.inlineContainer;

  return (
    <View style={[containerStyle, { backgroundColor }]}>
      {/* Ícone opcional */}
      {showIcon && (
        <Ionicons
          name={iconName as any}
          size={64}
          color={colors.primary}
          style={styles.icon}
        />
      )}

      {/* Spinner */}
      <ActivityIndicator
        size={size}
        color={colors.primary}
        style={styles.spinner}
      />

      {/* Mensagem */}
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

/**
 * Variantes específicas para uso comum
 */

/**
 * Loading para autenticação
 */
export function AuthLoadingScreen() {
  return (
    <LoadingScreen
      message="Verificando autenticação..."
      showIcon
      iconName="lock-closed"
    />
  );
}

/**
 * Loading para dados do Firebase
 */
export function DataLoadingScreen() {
  return (
    <LoadingScreen
      message="Carregando dados..."
      showIcon
      iconName="cloud-download"
    />
  );
}

/**
 * Loading para upload
 */
export function UploadLoadingScreen() {
  return (
    <LoadingScreen message="Enviando..." showIcon iconName="cloud-upload" />
  );
}

/**
 * Loading para localização
 */
export function LocationLoadingScreen() {
  return (
    <LoadingScreen
      message="Obtendo sua localização..."
      showIcon
      iconName="location"
    />
  );
}

/**
 * Loading inline (para usar dentro de telas)
 */
export function InlineLoading({
  message = "Carregando...",
}: {
  message?: string;
}) {
  return <LoadingScreen message={message} fullScreen={false} size="small" />;
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },
  inlineContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
    minHeight: 200,
  },
  icon: {
    marginBottom: spacing.lg,
    opacity: 0.8,
  },
  spinner: {
    marginBottom: spacing.md,
  },
  message: {
    fontSize: 16,
    color: colors.gray,
    textAlign: "center",
    marginTop: spacing.sm,
  },
});
