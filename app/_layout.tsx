import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

/**
 * Layout principal do app
 * Define estrutura de navegação
 */
export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      >
        {/* Tela de login */}
        <Stack.Screen 
          name="index" 
          options={{
            title: 'Login',
          }}
        />
        
        {/* Grupo de abas */}
        <Stack.Screen 
          name="(tabs)" 
          options={{
            headerShown: false,
          }}
        />
        
        {/* Modal de detalhes */}
        <Stack.Screen
          name="modal"
          options={{
            presentation: 'modal',
            title: 'Detalhes',
          }}
        />
      </Stack>
    </>
  );
}