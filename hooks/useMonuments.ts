import { useState, useEffect } from 'react';
import { monumentService } from '../services/monumentService';
import { Monument } from '../types';

/**
 * Hook para gerenciar monumentos
 */
export function useMonuments() {
  const [monuments, setMonuments] = useState<Monument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMonuments();
  }, []);

  const loadMonuments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await monumentService.getAllMonuments();
      setMonuments(data);
    } catch (err) {
      setError('Erro ao carregar monumentos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    monuments,
    loading,
    error,
    reload: loadMonuments,
  };
}