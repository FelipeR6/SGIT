"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import type { ScreenProps } from "../types/navigation"
import type { RootStackParamList, RootTabParamList } from "../types/navigation"
import { equiposService, mantenimientosService, prestamosService } from "../services/api"
import { useTheme } from "../context/ThemeContext"
import { createThemedScreenStyles } from "../style/theme-utils"
import { lightColors, darkColors } from "../style/theme"

// Definir los tipos para los elementos del menú
type MenuItem = {
  title: string
  icon: string
  screen: keyof RootStackParamList | keyof RootTabParamList
  description: string
}

const HomeScreen: React.FC<ScreenProps> = ({ navigation }) => {
  // Estados para almacenar los conteos
  const [equipmentCount, setEquipmentCount] = useState<number | null>(null)
  const [maintenanceCount, setMaintenanceCount] = useState<number | null>(null)
  const [loanCount, setLoanCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isDarkMode } = useTheme()
  const themedStyles = createThemedScreenStyles(isDarkMode)

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchCounts()

    // Agregar un listener para recargar los datos cuando la pantalla vuelva a estar en foco
    const unsubscribe = navigation.addListener("focus", () => {
      fetchCounts()
    })

    // Limpiar el listener cuando el componente se desmonte
    return unsubscribe
  }, [navigation])

  // Función para cargar los conteos desde la API
  const fetchCounts = async () => {
    try {
      setLoading(true)
      setError(null)

      // Cargar datos en paralelo
      const [equiposResponse, mantenimientosResponse, prestamosResponse] = await Promise.all([
        equiposService.getAll(),
        mantenimientosService.getAll(),
        prestamosService.getAll(),
      ])

      if (equiposResponse.success) {
        setEquipmentCount(equiposResponse.data.length)
      }

      if (mantenimientosResponse.success) {
        setMaintenanceCount(mantenimientosResponse.data.length)
      }

      if (prestamosResponse.success) {
        setLoanCount(prestamosResponse.data.length)
      }
    } catch (error) {
      console.error("Error al cargar datos:", error)
      setError("No se pudieron cargar los datos. Verifica tu conexión a internet.")
    } finally {
      setLoading(false)
    }
  }

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
      title: "Configuración",
      icon: "settings",
      screen: "Settings",
      description: "Ajustes de la aplicación",
    },
  ]

  return (
    <SafeAreaView style={[styles.container, themedStyles.container]}>
      <View style={[styles.header, { backgroundColor: isDarkMode ? darkColors.card : lightColors.card }]}>
        <Text style={[styles.headerTitle, { color: isDarkMode ? "#FFFFFF" : "#333333" }]}>
          Sistema de Gestión de Inventario Tecnologico
        </Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={isDarkMode ? "#0A84FF" : "#007AFF"} />
            <Text style={[styles.loadingText, { color: isDarkMode ? "#AAAAAA" : "#666666" }]}>Cargando datos...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={48} color="#F44336" />
            <Text style={[styles.errorText, { color: isDarkMode ? "#AAAAAA" : "#666666" }]}>{error}</Text>
            <TouchableOpacity
              style={[styles.retryButton, { backgroundColor: isDarkMode ? "#0A84FF" : "#007AFF" }]}
              onPress={fetchCounts}
            >
              <Text style={styles.retryButtonText}>Reintentar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.statsContainer}>
              <View style={[styles.statCard, themedStyles.card]}>
                <Text style={[styles.statNumber, { color: isDarkMode ? "#0A84FF" : "#007AFF" }]}>
                  {equipmentCount !== null ? equipmentCount : "-"}
                </Text>
                <Text style={[styles.statLabel, { color: isDarkMode ? "#AAAAAA" : "#666666" }]}>Equipos</Text>
              </View>
              <View style={[styles.statCard, themedStyles.card]}>
                <Text style={[styles.statNumber, { color: isDarkMode ? "#0A84FF" : "#007AFF" }]}>
                  {maintenanceCount !== null ? maintenanceCount : "-"}
                </Text>
                <Text style={[styles.statLabel, { color: isDarkMode ? "#AAAAAA" : "#666666" }]}>Mantenimientos</Text>
              </View>
              <View style={[styles.statCard, themedStyles.card]}>
                <Text style={[styles.statNumber, { color: isDarkMode ? "#0A84FF" : "#007AFF" }]}>
                  {loanCount !== null ? loanCount : "-"}
                </Text>
                <Text style={[styles.statLabel, { color: isDarkMode ? "#AAAAAA" : "#666666" }]}>Préstamos</Text>
              </View>
            </View>

            <Text style={[styles.sectionTitle, { color: isDarkMode ? "#FFFFFF" : "#333333" }]}>Accesos Rápidos</Text>

            <View style={styles.menuGrid}>
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.menuItem, themedStyles.card]}
                  onPress={() => {
                    // Usar una aserción de tipo para indicar a TypeScript que este es un nombre de ruta válido
                    navigation.navigate(item.screen as any)
                  }}
                >
                  <View
                    style={[
                      styles.menuIconContainer,
                      { backgroundColor: isDarkMode ? "rgba(10, 132, 255, 0.1)" : "#F0F8FF" },
                    ]}
                  >
                    <Ionicons name={item.icon as any} size={24} color={isDarkMode ? "#0A84FF" : "#007AFF"} />
                  </View>
                  <Text style={[styles.menuItemTitle, { color: isDarkMode ? "#FFFFFF" : "#333333" }]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.menuItemDescription, { color: isDarkMode ? "#AAAAAA" : "#666666" }]}>
                    {item.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
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
