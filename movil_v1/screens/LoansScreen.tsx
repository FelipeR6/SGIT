"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ActivityIndicator, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import type { ScreenProps } from "../types/navigation"
import { prestamosService } from "../services/api"

// Definir la interfaz para los registros de préstamos
interface LoanRecord {
  Id_Prestamo_Equipo: string
  Fecha_Prestamo_Equipo: string
  Fecha_entrega_prestamo: string
  Id_Usuario: string
  Id_Equipos: string
  Id_Ubicacion: string
  Id_Estado_Equipo: string
  Marca_Equipo?: string
  Nombre_Usuario_1?: string
  Apellidos_Usuario_1?: string
  Nombre_Ubicacion?: string
  Estado_Entregado?: string
  Estado_Recibido?: string
}

const LoansScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [loanRecords, setLoanRecords] = useState<LoanRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchPrestamos()

    // Agregar un listener para recargar los datos cuando la pantalla vuelva a estar en foco
    const unsubscribe = navigation.addListener("focus", () => {
      fetchPrestamos()
    })

    // Limpiar el listener cuando el componente se desmonte
    return unsubscribe
  }, [navigation])

  // Función para cargar préstamos desde la API
  const fetchPrestamos = async () => {
    try {
      setLoading(true)
      const response = await prestamosService.getAll()
      if (response.success) {
        setLoanRecords(response.data)
        setError(null)
      } else {
        setError("Error al cargar los datos")
      }
    } catch (error) {
      console.error("Error al cargar préstamos:", error)
      setError("Error de conexión al servidor")
      Alert.alert("Error", "No se pudieron cargar los préstamos. Verifica tu conexión a internet.", [{ text: "OK" }])
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteLoan = (id: string) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Está seguro que desea eliminar este préstamo? Esta acción no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true)
              const response = await prestamosService.delete(id)

              if (response.success) {
                Alert.alert("Éxito", "Préstamo eliminado correctamente")
                fetchPrestamos() // Recargar la lista
              } else {
                Alert.alert("Error", response.message || "No se pudo eliminar el préstamo")
              }
            } catch (error) {
              console.error("Error al eliminar:", error)
              Alert.alert("Error", "Ocurrió un error al intentar eliminar el préstamo")
            } finally {
              setLoading(false)
            }
          },
        },
      ],
    )
  }

  const filteredRecords = loanRecords.filter((record) => {
    // Filter by search query
    const matchesSearch = searchQuery
      ? (record.Marca_Equipo && record.Marca_Equipo.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (record.Nombre_Usuario_1 && record.Nombre_Usuario_1.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (record.Nombre_Ubicacion && record.Nombre_Ubicacion.toLowerCase().includes(searchQuery.toLowerCase()))
      : true

    // Determinar el estado basado en las fechas
    const today = new Date()
    const startDate = new Date(record.Fecha_Prestamo_Equipo)
    const endDate = new Date(record.Fecha_entrega_prestamo)

    let status = "returned"
    if (today < startDate) {
      status = "requested"
    } else if (today >= startDate && today <= endDate) {
      status = "active"
    } else if (today > endDate) {
      status = "overdue"
    }

    // Filter by tab
    const matchesTab = activeTab === "all" ? true : activeTab === status

    return matchesSearch && matchesTab
  })

  const getStatusColor = (record: LoanRecord) => {
    const today = new Date()
    const startDate = new Date(record.Fecha_Prestamo_Equipo)
    const endDate = new Date(record.Fecha_entrega_prestamo)

    if (today < startDate) {
      return "#2196F3" // Solicitado
    } else if (today >= startDate && today <= endDate) {
      return "#4CAF50" // Activo
    } else if (today > endDate) {
      return "#F44336" // Vencido
    } else {
      return "#9E9E9E" // Devuelto
    }
  }

  const getStatusText = (record: LoanRecord) => {
    const today = new Date()
    const startDate = new Date(record.Fecha_Prestamo_Equipo)
    const endDate = new Date(record.Fecha_entrega_prestamo)

    if (today < startDate) {
      return "Solicitado"
    } else if (today >= startDate && today <= endDate) {
      return "Activo"
    } else if (today > endDate) {
      return "Vencido"
    } else {
      return "Devuelto"
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

  const renderItem = ({ item }: { item: LoanRecord }) => (
    <TouchableOpacity
      style={styles.itemCard}
      onPress={() => navigation.navigate("LoanForm", { loanId: item.Id_Prestamo_Equipo })}
    >
      <View style={styles.itemHeader}>
        <View>
          <Text style={styles.itemName}>{item.Marca_Equipo || `Equipo ID: ${item.Id_Equipos}`}</Text>
          <Text style={styles.itemSubtitle}>
            Usuario:{" "}
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
          <Ionicons name="barcode-outline" size={16} color="#666666" />
          <Text style={styles.detailText}>Préstamo #{item.Id_Prestamo_Equipo}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="location-outline" size={16} color="#666666" />
          <Text style={styles.detailText}>{item.Nombre_Ubicacion || `Ubicación ID: ${item.Id_Ubicacion}`}</Text>
        </View>
        <View style={styles.dateContainer}>
          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={16} color="#666666" />
            <Text style={styles.detailText}>Desde: {formatDate(item.Fecha_Prestamo_Equipo)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={16} color="#666666" />
            <Text style={styles.detailText}>Hasta: {formatDate(item.Fecha_entrega_prestamo)}</Text>
          </View>
        </View>
      </View>

      {item.Estado_Entregado && (
        <View style={styles.notesContainer}>
          <Text style={styles.notesLabel}>Estado del equipo:</Text>
          <Text style={styles.notesText}>Entregado: {item.Estado_Entregado}</Text>
          {item.Estado_Recibido && <Text style={styles.notesText}>Recibido: {item.Estado_Recibido}</Text>}
        </View>
      )}

      <View style={styles.actionButtonsRow}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("LoanForm", { loanId: item.Id_Prestamo_Equipo })}
        >
          <Ionicons name="create-outline" size={16} color="#007AFF" />
          <Text style={styles.actionButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteLoan(item.Id_Prestamo_Equipo)}
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
          placeholder="Buscar por equipo, persona o ubicación"
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
          style={[styles.tabButton, activeTab === "active" && styles.activeTabButton]}
          onPress={() => setActiveTab("active")}
        >
          <Text style={[styles.tabButtonText, activeTab === "active" && styles.activeTabButtonText]}>Activos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "requested" && styles.activeTabButton]}
          onPress={() => setActiveTab("requested")}
        >
          <Text style={[styles.tabButtonText, activeTab === "requested" && styles.activeTabButtonText]}>
            Solicitados
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "overdue" && styles.activeTabButton]}
          onPress={() => setActiveTab("overdue")}
        >
          <Text style={[styles.tabButtonText, activeTab === "overdue" && styles.activeTabButtonText]}>Vencidos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "returned" && styles.activeTabButton]}
          onPress={() => setActiveTab("returned")}
        >
          <Text style={[styles.tabButtonText, activeTab === "returned" && styles.activeTabButtonText]}>Devueltos</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Cargando préstamos...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={48} color="#F44336" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchPrestamos}>
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredRecords}
          renderItem={renderItem}
          keyExtractor={(item) => item.Id_Prestamo_Equipo.toString()}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="swap-horizontal-outline" size={48} color="#CCCCCC" />
              <Text style={styles.emptyText}>No se encontraron préstamos</Text>
            </View>
          }
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("LoanForm")}>
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
  dateContainer: {
    marginTop: 4,
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

export default LoansScreen
