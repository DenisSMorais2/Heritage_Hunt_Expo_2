/**
 * Tipos TypeScript para todo o app
 * Garantem type-safety e autocompletar
 */

// Usuário do app
export interface User {
  uid: string;                    // ID único do Firebase
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Dados do perfil do usuário (Firestore)
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  points: number;                 // Pontos totais
  scannedMonuments: string[];     // IDs dos monumentos descobertos
  unlockedBadges: string[];       // IDs dos badges desbloqueados
  createdAt: any;                 // Timestamp do Firestore
  updatedAt: any;
}

// Monumento
export interface Monument {
  id: string;
  name: string;
  description: string;
  points: number;
  latitude: number;
  longitude: number;
  imageUrl: string;
  qrCode: string;
  category: string;
  createdAt: any;
}

// Badge/Conquista
export interface Badge {
  id: string;
  name: string;
  description: string;
  threshold: number;              // Valor necessário para desbloquear
  type: 'count' | 'points';       // Tipo de condição
  icon: string;
  color: string;
  message: string;
}

// Estado de autenticação
export interface AuthState {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

// Resultado de operações
export interface OperationResult {
  success: boolean;
  message?: string;
  data?: any;
}