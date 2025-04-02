"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ActivityIndicator, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import type { ScreenProps } from "../types/navigation"
import { usuariosService } from "../services/api"

// Definir la interfaz para los usuarios
interface User {
  Id_Usuario: string
  Usuario: string
  Nombre_Usuario_1: string
  Nombre_Usuario_2?: string
  Apellidos_Usuario_1: string
  Apellidos_Usuario_2?: string
  Correo_Usuario: string
  Telefono_1_Usuario?: string
  Telefono_2_Usuario?: string
  Id_Rol: string
  Nombre_Rol?: string
  status?: string // Campo adicional para compatibilidad con la interfaz anterior
}

const UsersScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchUsers()
  }, [])

  // Función para cargar usuarios desde la API
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await usuariosService.getAll()
      if (response.success) {
        setUsers(response.data)
        setError(null)
      } else {
        setError("Error al cargar los datos")
      }
    } catch (error) {
      console.error("Error al cargar usuarios:", error)
      setError("Error de conexión al servidor")
      Alert.alert("Error", "No se pudieron cargar los usuarios. Verifica tu conexión a internet.", [{ text: "OK" }])
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = users.filter((user) => {
    // Filter by search query
    const matchesSearch = searchQuery
      ? user.Nombre_Usuario_1.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.Apellidos_Usuario_1.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.Correo_Usuario.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.Nombre_Rol && user.Nombre_Rol.toLowerCase().includes(searchQuery.toLowerCase()))
      : true

    // Filter by tab
    const matchesTab =
      activeTab === "all"
        ? true
        : activeTab === "admin"
          ? user.Nombre_Rol === "Administrador"
          : activeTab === "tech"
            ? user.Nombre_Rol === "Técnico"
            : activeTab === "user"
              ? user.Nombre_Rol === "Usuario"
              : activeTab === "inactive"
                ? user.status === "Inactivo" // Nota: Esto dependerá de cómo se maneje el estado en la base de datos
                : true

    return matchesSearch && matchesTab
  })

  const getRoleColor = (role?: string) => {
    switch (role) {
      case "Administrador":
        return "#F44336"
      case "Técnico":
        return "#2196F3"
      case "Usuario":
        return "#4CAF50"
      default:
        return "#757575"
    }
  }

  const renderItem = ({ item }: { item: User }) => (
    <TouchableOpacity style={styles.userCard}>
      <View style={styles.userCardHeader}>
        <View style={styles.userImagePlaceholder}>
          <Text style={styles.userImagePlaceholderText}>
            {`${item.Nombre_Usuario_1.charAt(0)}${item.Apellidos_Usuario_1.charAt(0)}`}
          </Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{`${item.Nombre_Usuario_1} ${item.Apellidos_Usuario_1}`}</Text>
          <Text style={styles.userEmail}>{item.Correo_Usuario}</Text>
          <View style={styles.userMetaContainer}>
            <View style={[styles.roleBadge, { backgroundColor: getRoleColor(item.Nombre_Rol) }]}>
              <Text style={styles.roleText}>{item.Nombre_Rol || "Sin rol"}</Text>
            </View>
            <Text style={styles.userDepartment}>ID: {item.Id_Usuario}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.userCardMenu}>
          <Ionicons name="ellipsis-vertical" size={20} color="#666666" />
        </TouchableOpacity>
      </View>

      <View style={styles.userCardFooter}>
        {item.Telefono_1_Usuario && (
          <TouchableOpacity style={styles.userCardAction}>
            <Ionicons name="call-outline" size={16} color="#007AFF" />
            <Text style={styles.userCardActionText}>Llamar</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.userCardAction}>
          <Ionicons name="mail-outline" size={16} color="#007AFF" />
          <Text style={styles.userCardActionText}>Email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.userCardAction}
          onPress={() => Alert.alert("Editar usuario", `Editar usuario ${item.Nombre_Usuario_1}`)}
        >
          <Ionicons name="create-outline" size={16} color="#007AFF" />
          <Text style={styles.userCardActionText}>Editar</Text>
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
          placeholder="Buscar por nombre, email, rol o departamento"
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
          style={[styles.tabButton, activeTab === "admin" && styles.activeTabButton]}
          onPress={() => setActiveTab("admin")}
        >
          <Text style={[styles.tabButtonText, activeTab === "admin" && styles.activeTabButtonText]}>
            Administradores
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "tech" && styles.activeTabButton]}
          onPress={() => setActiveTab("tech")}
        >
          <Text style={[styles.tabButtonText, activeTab === "tech" && styles.activeTabButtonText]}>Técnicos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "user" && styles.activeTabButton]}
          onPress={() => setActiveTab("user")}
        >
          <Text style={[styles.tabButtonText, activeTab === "user" && styles.activeTabButtonText]}>Usuarios</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "inactive" && styles.activeTabButton]}
          onPress={() => setActiveTab("inactive")}
        >
          <Text style={[styles.tabButtonText, activeTab === "inactive" && styles.activeTabButtonText]}>Inactivos</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Cargando usuarios...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={48} color="#F44336" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchUsers}>
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredUsers}
          renderItem={renderItem}
          keyExtractor={(item) => item.Id_Usuario.toString()}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="people-outline" size={48} color="#CCCCCC" />
              <Text style={styles.emptyText}>No se encontraron usuarios</Text>
            </View>
          }
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => Alert.alert("Crear usuario", "Funcionalidad para crear un nuevo usuario")}
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
  },
  userCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userCardHeader: {
    flexDirection: "row",
    padding: 16,
  },
  userImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  userImagePlaceholderText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  userEmail: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 4,
  },
  userMetaContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 8,
  },
  roleText: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  userDepartment: {
    fontSize: 12,
    color: "#666666",
  },
  userCardMenu: {
    padding: 4,
  },
  userCardFooter: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  userCardAction: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
  },
  userCardActionText: {
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

export default UsersScreen

