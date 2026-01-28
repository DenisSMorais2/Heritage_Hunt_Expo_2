import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { colors } from "../../constants/theme";

/**
 * Layout das abas principais
 * IMPORTANTE: headerShown: false para usar nosso Header customizado
 */
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // IMPORTANTE: Desliga header das tabs
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      {/* Scanner */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Scanner",
          headerShown: false, // Confirma que não tem header
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="qr-code" size={size} color={color} />
          ),
        }}
      />

      {/* Mapa */}
      <Tabs.Screen
        name="map"
        options={{
          title: "Mapa",
          headerShown: false, // Confirma que não tem header
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" size={size} color={color} />
          ),
        }}
      />

      {/* Perfil */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          headerShown: false, // Confirma que não tem header
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
