import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

/**
 * Layout principal do app
 * IMPORTANTE: headerShown: false para remover barra padrão
 */
export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      
      <Stack
        screenOptions={{
          headerShown: false,              // IMPORTANTE: Desliga header padrão
          contentStyle: { 
            backgroundColor: 'white' 
          },
        }}
      >
        {/* Tela de login */}
        <Stack.Screen 
          name="index" 
          options={{
            headerShown: false,            // Confirma que não tem header
          }}
        />
        
        {/* Grupo de abas */}
        <Stack.Screen 
          name="(tabs)" 
          options={{
            headerShown: false,            // Confirma que não tem header
          }}
        />
        
        {/* Modal de detalhes */}
        <Stack.Screen
          name="modal"
          options={{
            presentation: 'modal',
            headerShown: false,            // Confirma que não tem header
          }}
        />
      </Stack>
    </>
  );
}