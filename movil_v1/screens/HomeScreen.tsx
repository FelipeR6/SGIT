import type React from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import type { ScreenProps } from "../types/navigation"
import type { RootStackParamList, RootTabParamList } from "../types/navigation"

// Definir los tipos para los elementos del menú
type MenuItem = {
  title: string
  icon: string
  screen: keyof RootStackParamList | keyof RootTabParamList
  description: string
}

const HomeScreen: React.FC<ScreenProps> = ({ navigation }) => {
  // Definir los elementos del menú con tipos correctos
  const menuItems: MenuItem[] = [
    {
      title: "Inventario",
      icon: "list",
      screen: "Inventory",
      description: "Gestionar equipos registrados",
    },
    {
      title: "Mantenimiento",
      icon: "construct",
      screen: "Maintenance",
      description: "Registro y seguimiento de mantenimientos",
    },
    {
      title: "Préstamos",
      icon: "swap-horizontal",
      screen: "Loans",
      description: "Gestión de préstamos de equipos",
    },
    {
      title: "Usuarios",
      icon: "people",
      screen: "Users",
      description: "Administrar usuarios del sistema",
    },
    {
      title: "Ubicaciones",
      icon: "location",
      screen: "Locations",
      description: "Gestionar espacios de equipos",
    },
    {
      title: "Reportes",
      icon: "bar-chart",
      screen: "Reports",
      description: "Generar informes y estadísticas",
    },
    {
      title: "Configuración",
      icon: "settings",
      screen: "Settings",
      description: "Ajustes de la aplicación",
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sistema de Gestión de Equipos</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>156</Text>
            <Text style={styles.statLabel}>Equipos</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Mantenimientos</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Préstamos</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Accesos Rápidos</Text>

        <View style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => {
                // Usar una aserción de tipo para indicar a TypeScript que este es un nombre de ruta válido
                navigation.navigate(item.screen as any)
              }}
            >
              <View style={styles.menuIconContainer}>
                <Ionicons name={item.icon as any} size={24} color="#007AFF" />
              </View>
              <Text style={styles.menuItemTitle}>{item.title}</Text>
              <Text style={styles.menuItemDescription}>{item.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
  scrollView: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  statCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    width: "30%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
  },
  statLabel: {
    fontSize: 12,
    color: "#666666",
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    color: "#333333",
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 8,
  },
  menuItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    margin: 8,
    width: "45%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0F8FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 12,
    color: "#666666",
  },
})

export default HomeScreen

