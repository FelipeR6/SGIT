"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
  TextInput,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import type { RouteScreenProps } from "../types/navigation"
import { equiposService, categoriasService, modelosService } from "../services/api"
import { Picker } from "@react-native-picker/picker"

// Definir interfaces para los datos
interface Equipment {
  Id_Equipos: string
  Marca_Equipo: string
  Año_Equipo: number
  Id_Categoria: string
  Id_Modelo: string
  Id_Usuario: string
  Nombre_Categoria?: string
  Caracteristicas_Modelo?: string
  Accesorios_Modelo?: string
  Nombre_Usuario_1?: string
  Apellidos_Usuario_1?: string
  Estado_Entregado?: string
  Estado_Recibido?: string
  mantenimientos?: Maintenance[]
  prestamos?: Loan[]
  hojaVida?: LifeCycle[]
}

interface Maintenance {
  Id_Mantenimiento: string
  Fecha_Inicio_mantenimiento: string
  Fecha_fin_mantenimiento: string
  Observaciones: string
  Id_Equipos: string
  Id_Usuario: string
  Nombre_Usuario_1?: string
  Apellidos_Usuario_1?: string
}

interface Loan {
  Id_Prestamo_Equipo: string
  Fecha_Prestamo_Equipo: string
  Fecha_entrega_prestamo: string
  Id_Usuario: string
  Id_Equipos: string
  Id_Ubicacion: string
  Id_Estado_Equipo: string
  Nombre_Usuario_1?: string
  Apellidos_Usuario_1?: string
  Nombre_Ubicacion?: string
}

interface LifeCycle {
  Id_Hoja_vida_equipo: string
  Estado_Equipo: string
  Fecha_ingreso: string
  Id_usuario: string
  Nombre_Usuario_1?: string
  Apellidos_Usuario_1?: string
}

interface Category {
  Id_Categoria: string
  Nombre_Categoria: string
}

interface Model {
  Id_Modelo: string
  Caracteristicas_Modelo: string
  Accesorios_Modelo: string
}

const EquipmentDetailScreen: React.FC<RouteScreenProps<"EquipmentDetail">> = ({ route, navigation }) => {
  const { itemId, tab } = route.params || {}
  const [activeTab, setActiveTab] = useState(tab || "info")
  const [equipment, setEquipment] = useState<Equipment | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [editFormData, setEditFormData] = useState<Partial<Equipment>>({})
  const [categories, setCategories] = useState<Category[]>([])
  const [models, setModels] = useState<Model[]>([])
  const [savingChanges, setSavingChanges] = useState(false)
  // Agregar un estado para el modal de cambio de estado
  const [statusModalVisible, setStatusModalVisible] = useState(false)
  const [newStatus, setNewStatus] = useState("")

  // Cargar datos del equipo
  useEffect(() => {
    if (itemId && itemId !== "new") {
      fetchEquipmentData()
    } else {
      setLoading(false)
    }
  }, [itemId])

  // Cargar categorías y modelos para el formulario de edición
  useEffect(() => {
    const loadFormData = async () => {
      try {
        const [categoriesResponse, modelsResponse] = await Promise.all([
          categoriasService.getAll(),
          modelosService.getAll(),
        ])

        if (categoriesResponse.success) {
          setCategories(categoriesResponse.data)
        }

        if (modelsResponse.success) {
          setModels(modelsResponse.data)
        }
      } catch (error) {
        console.error("Error al cargar datos para el formulario:", error)
      }
    }

    loadFormData()
  }, [])

  // Cuando se abre el modal de edición, inicializar el formulario con los datos actuales
  useEffect(() => {
    if (equipment && editModalVisible) {
      setEditFormData({
        Marca_Equipo: equipment.Marca_Equipo,
        Año_Equipo: equipment.Año_Equipo,
        Id_Categoria: equipment.Id_Categoria,
        Id_Modelo: equipment.Id_Modelo,
        Id_Usuario: equipment.Id_Usuario,
      })
    }
  }, [equipment, editModalVisible])

  // Modificar la función fetchEquipmentData para manejar mejor los errores
  const fetchEquipmentData = async () => {
    try {
      setLoading(true)
      setError(null)

      try {
        const response = await equiposService.getById(itemId)

        if (response.success) {
          setEquipment(response.data)
        } else {
          setError("No se pudo cargar la información del equipo: " + (response.message || "Error desconocido"))
        }
      } catch (error) {
        console.error("Error al cargar datos del equipo:", error)

        // Intentar mostrar un mensaje más específico
        let errorMessage = "Error de conexión al servidor."

        if (error.message) {
          errorMessage = error.message
        }

        setError(`${errorMessage} Verifica que el servidor esté en ejecución y que la URL de la API sea correcta.`)
      }
    } catch (error) {
      console.error("Error general:", error)
      setError("Error inesperado al cargar los datos")
    } finally {
      setLoading(false)
    }
  }

  const handleSaveChanges = async () => {
    if (!editFormData.Marca_Equipo || !editFormData.Año_Equipo) {
      Alert.alert("Error", "Por favor complete todos los campos obligatorios")
      return
    }

    try {
      setSavingChanges(true)

      const response = await equiposService.update(itemId, editFormData)

      if (response.success) {
        Alert.alert("Éxito", "Equipo actualizado correctamente")
        setEditModalVisible(false)
        fetchEquipmentData() // Recargar los datos
      } else {
        Alert.alert("Error", response.message || "No se pudo actualizar el equipo")
      }
    } catch (error) {
      console.error("Error al actualizar equipo:", error)
      Alert.alert("Error", "Ocurrió un error al guardar los cambios")
    } finally {
      setSavingChanges(false)
    }
  }

  const handleDeleteEquipment = () => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Está seguro que desea eliminar este equipo? Esta acción no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true)
              const response = await equiposService.delete(itemId)

              if (response.success) {
                Alert.alert("Éxito", "Equipo eliminado correctamente", [
                  { text: "OK", onPress: () => navigation.goBack() },
                ])
              } else {
                Alert.alert("Error", response.message || "No se pudo eliminar el equipo")
                setLoading(false)
              }
            } catch (error) {
              console.error("Error al eliminar equipo:", error)
              Alert.alert("Error", "Ocurrió un error al eliminar el equipo")
              setLoading(false)
            }
          },
        },
      ],
    )
  }

  // Agregar esta función después de handleDeleteEquipment
  const handleChangeStatus = async () => {
    if (!newStatus) {
      Alert.alert("Error", "Por favor seleccione un estado")
      return
    }

    try {
      setLoading(true)

      // Crear un objeto con los datos actualizados
      const updatedEquipment = {
        ...equipment,
        Estado_Recibido: newStatus,
      }

      // Llamar al servicio para actualizar el equipo
      const response = await equiposService.update(itemId, updatedEquipment)

      if (response.success) {
        Alert.alert("Éxito", "Estado del equipo actualizado correctamente")
        // Actualizar el estado local
        setEquipment({
          ...equipment,
          Estado_Recibido: newStatus,
        })
        setStatusModalVisible(false)
      } else {
        Alert.alert("Error", response.message || "No se pudo actualizar el estado del equipo")
      }
    } catch (error) {
      console.error("Error al cambiar el estado del equipo:", error)
      Alert.alert("Error", "Ocurrió un error al cambiar el estado del equipo")
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    if (status.includes("Funcionamiento") || status.includes("Optimo")) {
      return "#4CAF50"
    } else if (status.includes("Bajo rendimiento") || status.includes("cable")) {
      return "#FFC107"
    } else if (status.includes("Dañado") || status.includes("Fuera de servicio")) {
      return "#F44336"
    } else {
      return "#757575"
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

  const renderInfoTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.specificationContainer}>
        <Text style={styles.sectionTitle}>Información General</Text>
        <View style={styles.specificationItem}>
          <Text style={styles.specificationLabel}>ID:</Text>
          <Text style={styles.specificationValue}>{equipment?.Id_Equipos}</Text>
        </View>
        <View style={styles.specificationItem}>
          <Text style={styles.specificationLabel}>Marca:</Text>
          <Text style={styles.specificationValue}>{equipment?.Marca_Equipo}</Text>
        </View>
        <View style={styles.specificationItem}>
          <Text style={styles.specificationLabel}>Año:</Text>
          <Text style={styles.specificationValue}>{equipment?.Año_Equipo}</Text>
        </View>
        <View style={styles.specificationItem}>
          <Text style={styles.specificationLabel}>Categoría:</Text>
          <Text style={styles.specificationValue}>{equipment?.Nombre_Categoria || "No especificada"}</Text>
        </View>
        <View style={styles.specificationItem}>
          <Text style={styles.specificationLabel}>Estado Actual:</Text>
          <View style={styles.statusContainer}>
            <Text style={styles.specificationValue}>{equipment?.Estado_Recibido || "No especificado"}</Text>
            <TouchableOpacity
              style={styles.changeStatusButton}
              onPress={() => {
                setNewStatus(equipment?.Estado_Recibido || "")
                setStatusModalVisible(true)
              }}
            >
              <Text style={styles.changeStatusButtonText}>Cambiar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.specificationItem}>
          <Text style={styles.specificationLabel}>Responsable:</Text>
          <Text style={styles.specificationValue}>
            {equipment?.Nombre_Usuario_1
              ? `${equipment.Nombre_Usuario_1} ${equipment.Apellidos_Usuario_1 || ""}`
              : "No asignado"}
          </Text>
        </View>
      </View>

      <View style={styles.specificationContainer}>
        <Text style={styles.sectionTitle}>Especificaciones Técnicas</Text>
        <View style={styles.specificationItem}>
          <Text style={styles.specificationLabel}>Características:</Text>
          <Text style={styles.specificationValue}>{equipment?.Caracteristicas_Modelo || "No especificadas"}</Text>
        </View>
        <View style={styles.specificationItem}>
          <Text style={styles.specificationLabel}>Accesorios:</Text>
          <Text style={styles.specificationValue}>{equipment?.Accesorios_Modelo || "No especificados"}</Text>
        </View>
      </View>
    </View>
  )

  const renderMaintenanceTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Historial de Mantenimiento</Text>
      {equipment?.mantenimientos && equipment.mantenimientos.length > 0 ? (
        equipment.mantenimientos.map((maintenance, index) => (
          <View key={index} style={styles.historyCard}>
            <View style={styles.historyCardHeader}>
              <View>
                <Text style={styles.historyCardTitle}>Mantenimiento #{maintenance.Id_Mantenimiento}</Text>
                <Text style={styles.historyCardSubtitle}>
                  Técnico:{" "}
                  {maintenance.Nombre_Usuario_1
                    ? `${maintenance.Nombre_Usuario_1} ${maintenance.Apellidos_Usuario_1 || ""}`
                    : `ID: ${maintenance.Id_Usuario}`}
                </Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: "#4CAF50" }]}>
                <Text style={styles.statusText}>Completado</Text>
              </View>
            </View>
            <View style={styles.historyCardContent}>
              <View style={styles.historyCardItem}>
                <Ionicons name="calendar-outline" size={16} color="#666666" />
                <Text style={styles.historyCardItemText}>
                  Inicio: {formatDate(maintenance.Fecha_Inicio_mantenimiento)}
                </Text>
              </View>
              <View style={styles.historyCardItem}>
                <Ionicons name="calendar-outline" size={16} color="#666666" />
                <Text style={styles.historyCardItemText}>Fin: {formatDate(maintenance.Fecha_fin_mantenimiento)}</Text>
              </View>
              <View style={styles.historyCardItem}>
                <Ionicons name="document-text-outline" size={16} color="#666666" />
                <Text style={styles.historyCardItemText}>{maintenance.Observaciones}</Text>
              </View>
            </View>
          </View>
        ))
      ) : (
        <View style={styles.emptyStateContainer}>
          <Ionicons name="construct-outline" size={48} color="#CCCCCC" />
          <Text style={styles.emptyStateText}>No hay registros de mantenimiento</Text>
        </View>
      )}
    </View>
  )

  const renderLoansTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Historial de Préstamos</Text>
      {equipment?.prestamos && equipment.prestamos.length > 0 ? (
        equipment.prestamos.map((loan, index) => (
          <View key={index} style={styles.historyCard}>
            <View style={styles.historyCardHeader}>
              <View>
                <Text style={styles.historyCardTitle}>
                  {loan.Nombre_Usuario_1
                    ? `${loan.Nombre_Usuario_1} ${loan.Apellidos_Usuario_1 || ""}`
                    : `Usuario ID: ${loan.Id_Usuario}`}
                </Text>
                <Text style={styles.historyCardSubtitle}>
                  Ubicación: {loan.Nombre_Ubicacion || `ID: ${loan.Id_Ubicacion}`}
                </Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: "#9E9E9E" }]}>
                <Text style={styles.statusText}>Completado</Text>
              </View>
            </View>
            <View style={styles.historyCardContent}>
              <View style={styles.historyCardItem}>
                <Ionicons name="calendar-outline" size={16} color="#666666" />
                <Text style={styles.historyCardItemText}>Desde: {formatDate(loan.Fecha_Prestamo_Equipo)}</Text>
              </View>
              <View style={styles.historyCardItem}>
                <Ionicons name="calendar-outline" size={16} color="#666666" />
                <Text style={styles.historyCardItemText}>Hasta: {formatDate(loan.Fecha_entrega_prestamo)}</Text>
              </View>
            </View>
          </View>
        ))
      ) : (
        <View style={styles.emptyStateContainer}>
          <Ionicons name="swap-horizontal-outline" size={48} color="#CCCCCC" />
          <Text style={styles.emptyStateText}>No hay registros de préstamos</Text>
        </View>
      )}
    </View>
  )

  const renderEditModal = () => (
    <Modal
      visible={editModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setEditModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Editar Equipo</Text>
            <TouchableOpacity onPress={() => setEditModalVisible(false)}>
              <Ionicons name="close" size={24} color="#333333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Marca *</Text>
              <TextInput
                style={styles.formInput}
                value={editFormData.Marca_Equipo?.toString()}
                onChangeText={(text) => setEditFormData({ ...editFormData, Marca_Equipo: text })}
                placeholder="Ingrese la marca"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Año *</Text>
              <TextInput
                style={styles.formInput}
                value={editFormData.Año_Equipo?.toString()}
                onChangeText={(text) => setEditFormData({ ...editFormData, Año_Equipo: Number.parseInt(text) || 0 })}
                placeholder="Ingrese el año"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Categoría *</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={editFormData.Id_Categoria}
                  onValueChange={(itemValue) => setEditFormData({ ...editFormData, Id_Categoria: itemValue })}
                >
                  <Picker.Item label="Seleccione una categoría" value="" />
                  {categories.map((category) => (
                    <Picker.Item
                      key={category.Id_Categoria}
                      label={category.Nombre_Categoria}
                      value={category.Id_Categoria}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Modelo *</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={editFormData.Id_Modelo}
                  onValueChange={(itemValue) => setEditFormData({ ...editFormData, Id_Modelo: itemValue })}
                >
                  <Picker.Item label="Seleccione un modelo" value="" />
                  {models.map((model) => (
                    <Picker.Item key={model.Id_Modelo} label={`Modelo #${model.Id_Modelo}`} value={model.Id_Modelo} />
                  ))}
                </Picker>
              </View>
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalCancelButton]}
              onPress={() => setEditModalVisible(false)}
              disabled={savingChanges}
            >
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalSaveButton]}
              onPress={handleSaveChanges}
              disabled={savingChanges}
            >
              {savingChanges ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.modalButtonText}>Guardar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )

  // Definir los posibles estados para un equipo
  const ESTADOS_EQUIPO = [
    "Óptimo funcionamiento",
    "En uso",
    "Bajo rendimiento",
    "Dañado",
    "Fuera de servicio",
    "En mantenimiento",
    "Actualizado",
  ]
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image source={{ uri: "https://via.placeholder.com/400x300" }} style={styles.equipmentImage} />
          <View style={styles.headerOverlay}>
            <Text style={styles.equipmentName}>{equipment?.Marca_Equipo || "Nuevo Equipo"}</Text>
            {equipment?.Estado_Recibido && (
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(equipment.Estado_Recibido) }]}>
                <Text style={styles.statusText}>{equipment.Estado_Recibido}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === "info" && styles.activeTabButton]}
            onPress={() => setActiveTab("info")}
          >
            <Text style={[styles.tabButtonText, activeTab === "info" && styles.activeTabButtonText]}>Información</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === "maintenance" && styles.activeTabButton]}
            onPress={() => setActiveTab("maintenance")}
          >
            <Text style={[styles.tabButtonText, activeTab === "maintenance" && styles.activeTabButtonText]}>
              Mantenimiento
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === "loans" && styles.activeTabButton]}
            onPress={() => setActiveTab("loans")}
          >
            <Text style={[styles.tabButtonText, activeTab === "loans" && styles.activeTabButtonText]}>Préstamos</Text>
          </TouchableOpacity>
        </View>

        {activeTab === "info" && renderInfoTab()}
        {activeTab === "maintenance" && renderMaintenanceTab()}
        {activeTab === "loans" && renderLoansTab()}
      </ScrollView>

      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={() => setEditModalVisible(true)}>
          <Ionicons name="create-outline" size={20} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.actionButtonDanger]} onPress={handleDeleteEquipment}>
          <Ionicons name="trash-outline" size={20} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>

      {renderEditModal()}
      {/* Modal para cambiar el estado del equipo */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={statusModalVisible}
        onRequestClose={() => setStatusModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cambiar Estado del Equipo</Text>
            <Text style={styles.modalSubtitle}>{equipment?.Marca_Equipo || "Equipo"}</Text>

            <View style={styles.statusOptions}>
              {ESTADOS_EQUIPO.map((estado) => (
                <TouchableOpacity
                  key={estado}
                  style={[styles.statusOption, newStatus === estado && styles.statusOptionSelected]}
                  onPress={() => setNewStatus(estado)}
                >
                  <Text style={[styles.statusOptionText, newStatus === estado && styles.statusOptionTextSelected]}>
                    {estado}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setStatusModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.saveButton]} onPress={handleChangeStatus}>
                <Text style={styles.saveButtonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    position: "relative",
  },
  equipmentImage: {
    width: "100%",
    height: 200,
  },
  headerOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  equipmentName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
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
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 16,
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
  tabContent: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 12,
  },
  specificationContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  specificationItem: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  specificationLabel: {
    width: "40%",
    fontSize: 14,
    color: "#666666",
  },
  specificationValue: {
    flex: 1,
    fontSize: 14,
    color: "#333333",
    fontWeight: "500",
  },
  historyCard: {
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
  historyCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  historyCardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  historyCardSubtitle: {
    fontSize: 14,
    color: "#666666",
  },
  historyCardContent: {
    marginTop: 4,
  },
  historyCardItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  historyCardItemText: {
    fontSize: 14,
    color: "#666666",
    marginLeft: 8,
  },
  emptyStateContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  emptyStateText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginRight: 8,
  },
  actionButtonDanger: {
    backgroundColor: "#F44336",
    marginRight: 0,
    marginLeft: 8,
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    padding: 16,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    width: "90%",
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  modalContent: {
    padding: 16,
    maxHeight: 400,
  },
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: "#F9F9F9",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333333",
  },
  pickerContainer: {
    backgroundColor: "#F9F9F9",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 8,
  },
  modalCancelButton: {
    backgroundColor: "#F5F5F5",
  },
  modalSaveButton: {
    backgroundColor: "#007AFF",
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  statusContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  changeStatusButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  changeStatusButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
    textAlign: "center",
  },
  modalSubtitle: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 16,
    textAlign: "center",
  },
  statusOptions: {
    marginBottom: 20,
  },
  statusOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#F0F0F0",
  },
  statusOptionSelected: {
    backgroundColor: "#007AFF",
  },
  statusOptionText: {
    fontSize: 16,
    color: "#333333",
  },
  statusOptionTextSelected: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#F0F0F0",
    marginRight: 8,
  },
  cancelButtonText: {
    color: "#666666",
    fontSize: 16,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#007AFF",
    marginLeft: 8,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default EquipmentDetailScreen
