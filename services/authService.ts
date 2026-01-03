import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  User,
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { userService } from './userService';

/**
 * Serviço de Autenticação
 * Gerencia login, registro e logout
 */
class AuthService {
  /**
   * Registra novo usuário
   */
  async register(
    email: string,
    password: string,
    displayName: string
  ): Promise<{ success: boolean; message?: string; user?: User }> {
    try {
      // Valida dados
      if (!email || !password || !displayName) {
        return { success: false, message: 'Preencha todos os campos' };
      }

      if (password.length < 6) {
        return { success: false, message: 'Senha deve ter no mínimo 6 caracteres' };
      }

      // Cria usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Atualiza perfil com nome
      await updateProfile(userCredential.user, {
        displayName: displayName,
      });

      // Cria perfil no Firestore
      await userService.createUserProfile(userCredential.user.uid, {
        email,
        displayName,
        photoURL: null,
      });

      return {
        success: true,
        message: 'Conta criada com sucesso!',
        user: userCredential.user,
      };
    } catch (error: any) {
      console.error('Erro ao registrar:', error);
      
      // Traduz erros do Firebase
      let message = 'Erro ao criar conta';
      
      if (error.code === 'auth/email-already-in-use') {
        message = 'Este email já está em uso';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Email inválido';
      } else if (error.code === 'auth/weak-password') {
        message = 'Senha muito fraca';
      }

      return { success: false, message };
    }
  }

  /**
   * Faz login do usuário
   */
  async login(
    email: string,
    password: string
  ): Promise<{ success: boolean; message?: string; user?: User }> {
    try {
      // Valida dados
      if (!email || !password) {
        return { success: false, message: 'Preencha todos os campos' };
      }

      // Faz login no Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      return {
        success: true,
        message: 'Login realizado com sucesso!',
        user: userCredential.user,
      };
    } catch (error: any) {
      console.error('Erro ao fazer login:', error);

      // Traduz erros do Firebase
      let message = 'Erro ao fazer login';

      if (error.code === 'auth/user-not-found') {
        message = 'Usuário não encontrado';
      } else if (error.code === 'auth/wrong-password') {
        message = 'Senha incorreta';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Email inválido';
      } else if (error.code === 'auth/user-disabled') {
        message = 'Conta desabilitada';
      }

      return { success: false, message };
    }
  }

  /**
   * Faz logout do usuário
   */
  async logout(): Promise<{ success: boolean; message?: string }> {
    try {
      await firebaseSignOut(auth);
      return { success: true, message: 'Logout realizado com sucesso!' };
    } catch (error: any) {
      console.error('Erro ao fazer logout:', error);
      return { success: false, message: 'Erro ao fazer logout' };
    }
  }

  /**
   * Retorna o usuário atual
   */
  getCurrentUser(): User | null {
    return auth.currentUser;
  }
}

export const authService = new AuthService();