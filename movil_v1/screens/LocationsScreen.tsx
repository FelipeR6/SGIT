"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ActivityIndicator, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import type { ScreenProps } from "../types/navigation"
import { ubicacionesService } from "../services/api"

// Definir la interfaz para las ubicaciones
interface Location {
  Id_Ubicacion: string
  Nombre_Ubicacion: string
  Prestamo_disponible: string
}

const LocationsScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [locations, setLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchLocations()

    // Agregar un listener para recargar los datos cuando la pantalla vuelva a estar en foco
    const unsubscribe = navigation.addListener("focus", () => {
      fetchLocations()
    })

    // Limpiar el listener cuando el componente se desmonte
    return unsubscribe
  }, [navigation])

  // Función para cargar ubicaciones desde la API
  const fetchLocations = async () => {
    try {
      setLoading(true)
      const response = await ubicacionesService.getAll()
      if (response.success) {
        setLocations(response.data)
        setError(null)
      } else {
        setError("Error al cargar los datos")
      }
    } catch (error) {
      console.error("Error al cargar ubicaciones:", error)
      setError("Error de conexión al servidor")
      Alert.alert("Error", "No se pudieron cargar las ubicaciones. Verifica tu conexión a internet.", [{ text: "OK" }])
    } finally {
      setLoading(false)
    }
  }

  const filteredLocations = searchQuery
    ? locations.filter(
        (location) =>
          location.Nombre_Ubicacion.toLowerCase().includes(searchQuery.toLowerCase()) ||
          location.Prestamo_disponible.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : locations

  const getStatusColor = (prestamoDisponible: string) => {
    return prestamoDisponible.toLowerCase() === "si" ? "#4CAF50" : "#F44336"
  }

  const renderItem = ({ item }: { item: Location }) => (
    <TouchableOpacity
      style={styles.locationCard}
      onPress={() => {
        // Navegar a la pantalla de detalle o edición
        navigation.navigate("LocationForm", { locationId: item.Id_Ubicacion })
      }}
    >
      <View style={styles.locationCardHeader}>
        <View style={styles.locationIconContainer}>
          <Ionicons name="location-outline" size={24} color="#FFFFFF" />
        </View>
        <View style={styles.locationInfo}>
          <Text style={styles.locationName}>{item.Nombre_Ubicacion}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.Prestamo_disponible) }]}>
            <Text style={styles.statusText}>
              Préstamo {item.Prestamo_disponible.toLowerCase() === "si" ? "Disponible" : "No Disponible"}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.locationCardMenu}
          onPress={() => {
            Alert.alert("Opciones", "Seleccione una acción", [
              {
                text: "Editar",
                onPress: () => navigation.navigate("LocationForm", { locationId: item.Id_Ubicacion }),
              },
              {
                text: "Eliminar",
                onPress: () => {
                  Alert.alert(
                    "Confirmar eliminación",
                    `¿Está seguro de eliminar la ubicación ${item.Nombre_Ubicacion}?`,
                    [
                      { text: "Cancelar", style: "cancel" },
                      {
                        text: "Eliminar",
                        style: "destructive",
                        onPress: async () => {
                          try {
                            const response = await ubicacionesService.delete(item.Id_Ubicacion)
                            if (response.success) {
                              Alert.alert("Éxito", "Ubicación eliminada correctamente")
                              fetchLocations() // Recargar la lista
                            } else {
                              Alert.alert("Error", response.message || "No se pudo eliminar la ubicación")
                            }
                          } catch (error) {
                            console.error("Error al eliminar:", error)
                            Alert.alert("Error", "Ocurrió un error al intentar eliminar la ubicación")
                          }
                        },
                      },
                    ],
                  )
                },
              },
              { text: "Cancelar", style: "cancel" },
            ])
          }}
        >
          <Ionicons name="ellipsis-vertical" size={20} color="#666666" />
        </TouchableOpacity>
      </View>

      <View style={styles.locationCardFooter}>
        <TouchableOpacity
          style={styles.locationCardAction}
          onPress={() => {
            // Aquí podrías navegar a una lista filtrada de equipos por ubicación
            Alert.alert("Ver Equipos", `Ver equipos en ${item.Nombre_Ubicacion}`)
          }}
        >
          <Ionicons name="list-outline" size={16} color="#007AFF" />
          <Text style={styles.locationCardActionText}>Ver Equipos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.locationCardAction}
          onPress={() => {
            navigation.navigate("LocationForm", { locationId: item.Id_Ubicacion })
          }}
        >
          <Ionicons name="create-outline" size={16} color="#007AFF" />
          <Text style={styles.locationCardActionText}>Editar</Text>
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
          placeholder="Buscar por nombre o disponibilidad"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color="#666666" />
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton} onPress={fetchLocations}>
          <Ionicons name="refresh" size={16} color="#007AFF" />
          <Text style={styles.filterButtonText}>Actualizar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options" size={16} color="#007AFF" />
          <Text style={styles.filterButtonText}>Ordenar</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Cargando ubicaciones...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={48} color="#F44336" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchLocations}>
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredLocations}
          renderItem={renderItem}
          keyExtractor={(item) => item.Id_Ubicacion.toString()}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="location-outline" size={48} color="#CCCCCC" />
              <Text style={styles.emptyText}>No se encontraron ubicaciones</Text>
            </View>
          }
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          navigation.navigate("LocationForm")
        }}
      >
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
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  filterButtonText: {
    fontSize: 14,
    color: "#007AFF",
    marginLeft: 4,
  },
  listContainer: {
    padding: 16,
    flexGrow: 1,
  },
  locationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  locationCardHeader: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  locationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  statusText: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  locationCardMenu: {
    padding: 4,
  },
  locationCardFooter: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  locationCardAction: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
  },
  locationCardActionText: {
    fontSize: 14,
    color: "#007AFF",
    marginLeft: 4,
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

export default LocationsScreen

