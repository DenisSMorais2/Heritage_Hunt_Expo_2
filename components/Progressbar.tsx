import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '../constants/theme';

/**
 * Props do componente ProgressBar
 */
type ProgressBarProps = {
  current: number;           // Valor atual (ex: 5)
  total: number;             // Valor total (ex: 12)
  color?: string;            // Cor da barra (opcional)
  label?: string;            // Label customizado (opcional)
  showPercentage?: boolean;  // Mostra porcentagem (padrão: true)
  height?: number;           // Altura da barra (padrão: 8)
};

/**
 * Componente de Barra de Progresso
 * 
 * Uso:
 * <ProgressBar current={5} total={12} />
 * <ProgressBar current={3} total={10} color="#10B981" label="Monumentos" />
 */
export default function ProgressBar({ 
  current, 
  total, 
  color = colors.primary,
  label,
  showPercentage = true,
  height = 8,
}: ProgressBarProps) {
  // Calcula porcentagem (máximo 100%)
  const percentage = Math.min((current / total) * 100, 100);

  return (
    <View style={styles.container}>
      {/* Header com label e porcentagem */}
      <View style={styles.labelContainer}>
        <Text style={styles.label}>
          {label || `${current} / ${total}`}
        </Text>
        
        {showPercentage && (
          <Text style={[styles.percentage, { color }]}>
            {percentage.toFixed(0)}%
          </Text>
        )}
      </View>
      
      {/* Barra de progresso */}
      <View style={[styles.barContainer, { height }]}>
        <View
          style={[
            styles.barFill,
            {
              width: `${percentage}%`,
              backgroundColor: color,
              height,
            }
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  label: {
    fontSize: 14,
    color: colors.dark,
    fontWeight: '600',
  },
  percentage: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  barContainer: {
    backgroundColor: colors.light,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  barFill: {
    borderRadius: borderRadius.sm,
    // Transição suave (React Native Web)
    transition: 'width 0.3s ease-in-out',
  },
});