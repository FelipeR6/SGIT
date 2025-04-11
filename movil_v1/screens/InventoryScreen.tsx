"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import type { ScreenProps } from "../types/navigation"
import { equiposService, categoriasService } from "../services/api"
import { useTheme } from "../context/ThemeContext"
import { createThemedStyles } from "../style/theme"

// Definir la interfaz para los elementos de inventario
interface InventoryItem {
  Id_Equipos: string
  Marca_Equipo: string
  Año_Equipo: number
  Nombre_Categoria: string
  Estado_Entregado?: string
  Estado_Recibido?: string
}

const InventoryScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [categorias, setCategorias] = useState<any[]>([])
  const [selectedCategoria, setSelectedCategoria] = useState<string | null>(null)

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchEquipos()
    fetchCategorias()
  }, [])

  // Función para cargar equipos desde la API
  const fetchEquipos = async () => {
    try {
      setLoading(true)
      const response = await equiposService.getAll()
      if (response.success) {
        setInventoryItems(response.data)
        setError(null)
      } else {
        setError("Error al cargar los datos")
      }
    } catch (error) {
      console.error("Error al cargar equipos:", error)
      setError("Error de conexión al servidor")
      Alert.alert("Error", "No se pudieron cargar los equipos. Verifica tu conexión a internet.", [{ text: "OK" }])
    } finally {
      setLoading(false)
    }
  }

  // Función para cargar categorías
  const fetchCategorias = async () => {
    try {
      const response = await categoriasService.getAll()
      if (response.success) {
        setCategorias(response.data)
      }
    } catch (error) {
      console.error("Error al cargar categorías:", error)
    }
  }

  // Filtrar equipos por búsqueda y categoría
  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch = searchQuery
      ? item.Marca_Equipo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.Nombre_Categoria && item.Nombre_Categoria.toLowerCase().includes(searchQuery.toLowerCase()))
      : true

    const matchesCategoria = selectedCategoria ? item.Nombre_Categoria === selectedCategoria : true

    return matchesSearch && matchesCategoria
  })

  const getStatusColor = (estado?: string) => {
    if (!estado) return "#757575"

    if (estado.includes("Funcionamiento") || estado.includes("Optimo")) {
      return "#4CAF50"
    } else if (estado.includes("Bajo rendimiento") || estado.includes("cable")) {
      return "#FFC107"
    } else if (estado.includes("Dañado") || estado.includes("Fuera de servicio")) {
      return "#F44336"
    } else {
      return "#757575"
    }
  }

  const renderItem = ({ item }: { item: InventoryItem }) => (
    <TouchableOpacity
      style={styles.itemCard}
      onPress={() => navigation.navigate("EquipmentDetail", { itemId: item.Id_Equipos })}
    >
      <View style={styles.itemHeader}>
        <Text style={styles.itemName}>{item.Marca_Equipo}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.Estado_Recibido) }]}>
          <Text style={styles.statusText}>{item.Estado_Recibido || "Sin estado"}</Text>
        </View>
      </View>
      <View style={styles.itemDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="pricetag-outline" size={16} color="#666666" />
          <Text style={styles.detailText}>{item.Nombre_Categoria || "Sin categoría"}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="calendar-outline" size={16} color="#666666" />
          <Text style={styles.detailText}>Año: {item.Año_Equipo}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  const renderCategoriaFilter = () => (
    <View style={styles.categoriaFilterContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={[styles.categoriaItem, selectedCategoria === null && styles.categoriaItemSelected]}
          onPress={() => setSelectedCategoria(null)}
        >
          <Text style={[styles.categoriaItemText, selectedCategoria === null && styles.categoriaItemTextSelected]}>
            Todas
          </Text>
        </TouchableOpacity>

        {categorias.map((categoria) => (
          <TouchableOpacity
            key={categoria.Id_Categoria}
            style={[
              styles.categoriaItem,
              selectedCategoria === categoria.Nombre_Categoria && styles.categoriaItemSelected,
            ]}
            onPress={() =>
              setSelectedCategoria(selectedCategoria === categoria.Nombre_Categoria ? null : categoria.Nombre_Categoria)
            }
          >
            <Text
              style={[
                styles.categoriaItemText,
                selectedCategoria === categoria.Nombre_Categoria && styles.categoriaItemTextSelected,
              ]}
            >
              {categoria.Nombre_Categoria}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por marca o categoría"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color="#666666" />
          </TouchableOpacity>
        ) : null}
      </View>

      {renderCategoriaFilter()}

      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton} onPress={fetchEquipos}>
          <Ionicons name="refresh" size={16} color="#007AFF" />
          <Text style={styles.filterButtonText}>Actualizar</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Cargando equipos...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={48} color="#F44336" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchEquipos}>
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.Id_Equipos.toString()}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="search" size={48} color="#CCCCCC" />
              <Text style={styles.emptyText}>No se encontraron equipos</Text>
            </View>
          }
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("EquipmentDetail", { itemId: "new" })}
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
  categoriaFilterContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  categoriaItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  categoriaItemSelected: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  categoriaItemText: {
    fontSize: 14,
    color: "#666666",
  },
  categoriaItemTextSelected: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 8,
    flexWrap: "wrap",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
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
    alignItems: "center",
    marginBottom: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    flex: 1,
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

export default InventoryScreen

