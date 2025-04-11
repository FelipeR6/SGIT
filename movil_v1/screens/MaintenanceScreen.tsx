"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ActivityIndicator, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import type { ScreenProps } from "../types/navigation"
import { mantenimientosService } from "../services/api"

// Definir la interfaz para los registros de mantenimiento
interface MaintenanceRecord {
  Id_Mantenimiento: string
  Fecha_Inicio_mantenimiento: string
  Fecha_fin_mantenimiento: string
  Observaciones: string
  Id_Equipos: string
  Id_Usuario: string
  Marca_Equipo?: string
  Nombre_Usuario_1?: string
  Apellidos_Usuario_1?: string
}

const MaintenanceScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchMantenimientos()

    // Agregar un listener para recargar los datos cuando la pantalla vuelva a estar en foco
    const unsubscribe = navigation.addListener("focus", () => {
      fetchMantenimientos()
    })

    // Limpiar el listener cuando el componente se desmonte
    return unsubscribe
  }, [navigation])

  // Función para cargar mantenimientos desde la API
  const fetchMantenimientos = async () => {
    try {
      setLoading(true)
      const response = await mantenimientosService.getAll()
      if (response.success) {
        setMaintenanceRecords(response.data)
        setError(null)
      } else {
        setError("Error al cargar los datos")
      }
    } catch (error) {
      console.error("Error al cargar mantenimientos:", error)
      setError("Error de conexión al servidor")
      Alert.alert("Error", "No se pudieron cargar los mantenimientos. Verifica tu conexión a internet.", [
        { text: "OK" },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteMaintenance = (id: string) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Está seguro que desea eliminar este registro de mantenimiento? Esta acción no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true)
              const response = await mantenimientosService.delete(id)

              if (response.success) {
                Alert.alert("Éxito", "Mantenimiento eliminado correctamente")
                fetchMantenimientos() // Recargar la lista
              } else {
                Alert.alert("Error", response.message || "No se pudo eliminar el mantenimiento")
              }
            } catch (error) {
              console.error("Error al eliminar:", error)
              Alert.alert("Error", "Ocurrió un error al intentar eliminar el mantenimiento")
            } finally {
              setLoading(false)
            }
          },
        },
      ],
    )
  }

  const filteredRecords = maintenanceRecords.filter((record) => {
    // Filter by search query
    const matchesSearch = searchQuery
      ? (record.Marca_Equipo && record.Marca_Equipo.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (record.Nombre_Usuario_1 && record.Nombre_Usuario_1.toLowerCase().includes(searchQuery.toLowerCase())) ||
        record.Observaciones.toLowerCase().includes(searchQuery.toLowerCase())
      : true

    // Determinar el estado basado en las fechas
    const today = new Date()
    const startDate = new Date(record.Fecha_Inicio_mantenimiento)
    const endDate = new Date(record.Fecha_fin_mantenimiento)

    let status = "completed"
    if (today < startDate) {
      status = "scheduled"
    } else if (today >= startDate && today <= endDate) {
      status = "inProgress"
    }

    // Filter by tab
    const matchesTab = activeTab === "all" ? true : activeTab === status

    return matchesSearch && matchesTab
  })

  const getStatusColor = (record: MaintenanceRecord) => {
    const today = new Date()
    const startDate = new Date(record.Fecha_Inicio_mantenimiento)
    const endDate = new Date(record.Fecha_fin_mantenimiento)

    if (today < startDate) {
      return "#FFC107" // Programado
    } else if (today >= startDate && today <= endDate) {
      return "#2196F3" // En proceso
    } else {
      return "#4CAF50" // Completado
    }
  }

  const getStatusText = (record: MaintenanceRecord) => {
    const today = new Date()
    const startDate = new Date(record.Fecha_Inicio_mantenimiento)
    const endDate = new Date(record.Fecha_fin_mantenimiento)

    if (today < startDate) {
      return "Programado"
    } else if (today >= startDate && today <= endDate) {
      return "En proceso"
    } else {
      return "Completado"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const renderItem = ({ item }: { item: MaintenanceRecord }) => (
    <TouchableOpacity
      style={styles.itemCard}
      onPress={() => navigation.navigate("MaintenanceForm", { maintenanceId: item.Id_Mantenimiento })}
    >
      <View style={styles.itemHeader}>
        <View>
          <Text style={styles.itemName}>{item.Marca_Equipo || `Equipo ID: ${item.Id_Equipos}`}</Text>
          <Text style={styles.itemSubtitle}>
            Técnico:{" "}
            {item.Nombre_Usuario_1
              ? `${item.Nombre_Usuario_1} ${item.Apellidos_Usuario_1 || ""}`
              : `ID: ${item.Id_Usuario}`}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item) }]}>
          <Text style={styles.statusText}>{getStatusText(item)}</Text>
        </View>
      </View>

      <View style={styles.itemDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="construct-outline" size={16} color="#666666" />
          <Text style={styles.detailText}>Mantenimiento #{item.Id_Mantenimiento}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="calendar-outline" size={16} color="#666666" />
          <Text style={styles.detailText}>Desde: {formatDate(item.Fecha_Inicio_mantenimiento)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="calendar-outline" size={16} color="#666666" />
          <Text style={styles.detailText}>Hasta: {formatDate(item.Fecha_fin_mantenimiento)}</Text>
        </View>
      </View>

      <View style={styles.notesContainer}>
        <Text style={styles.notesLabel}>Observaciones:</Text>
        <Text style={styles.notesText}>{item.Observaciones}</Text>
      </View>

      <View style={styles.actionButtonsRow}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("MaintenanceForm", { maintenanceId: item.Id_Mantenimiento })}
        >
          <Ionicons name="create-outline" size={16} color="#007AFF" />
          <Text style={styles.actionButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteMaintenance(item.Id_Mantenimiento)}
        >
          <Ionicons name="trash-outline" size={16} color="#F44336" />
          <Text style={[styles.actionButtonText, styles.deleteButtonText]}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por equipo, técnico u observaciones"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color="#666666" />
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "all" && styles.activeTabButton]}
          onPress={() => setActiveTab("all")}
        >
          <Text style={[styles.tabButtonText, activeTab === "all" && styles.activeTabButtonText]}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "scheduled" && styles.activeTabButton]}
          onPress={() => setActiveTab("scheduled")}
        >
          <Text style={[styles.tabButtonText, activeTab === "scheduled" && styles.activeTabButtonText]}>
            Programados
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "inProgress" && styles.activeTabButton]}
          onPress={() => setActiveTab("inProgress")}
        >
          <Text style={[styles.tabButtonText, activeTab === "inProgress" && styles.activeTabButtonText]}>
            En Proceso
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "completed" && styles.activeTabButton]}
          onPress={() => setActiveTab("completed")}
        >
          <Text style={[styles.tabButtonText, activeTab === "completed" && styles.activeTabButtonText]}>
            Completados
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Cargando mantenimientos...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={48} color="#F44336" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchMantenimientos}>
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredRecords}
          renderItem={renderItem}
          keyExtractor={(item) => item.Id_Mantenimiento.toString()}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="construct-outline" size={48} color="#CCCCCC" />
              <Text style={styles.emptyText}>No se encontraron mantenimientos</Text>
            </View>
          }
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("MaintenanceForm")}>
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    margin: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 8,
    flexWrap: "wrap",
  },
  tabButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  },
  activeTabButton: {
    backgroundColor: "#007AFF",
  },
  tabButtonText: {
    fontSize: 14,
    color: "#666666",
  },
  activeTabButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  listContainer: {
    padding: 16,
    flexGrow: 1,
  },
  itemCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  itemSubtitle: {
    fontSize: 14,
    color: "#666666",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  itemDetails: {
    marginTop: 4,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: "#666666",
    marginLeft: 8,
  },
  notesContainer: {
    marginTop: 8,
    backgroundColor: "#F5F5F5",
    padding: 8,
    borderRadius: 4,
  },
  notesLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#666666",
  },
  notesText: {
    fontSize: 14,
    color: "#333333",
  },
  actionButtonsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginLeft: 8,
  },
  actionButtonText: {
    fontSize: 14,
    color: "#007AFF",
    marginLeft: 4,
  },
  deleteButton: {
    backgroundColor: "#FFF5F5",
  },
  deleteButtonText: {
    color: "#F44336",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    marginTop: 12,
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginTop: 48,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
  },
  addButton: {
    position: "absolute",
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
})

export default MaintenanceScreen
