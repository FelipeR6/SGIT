"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { Picker } from "@react-native-picker/picker"
import type { RouteScreenProps } from "../types/navigation"
import { equiposService, categoriasService, modelosService, usuariosService } from "../services/api"
import { useTheme } from "../context/ThemeContext"
import { createThemedScreenStyles } from "../style/theme-utils"

interface EquipmentFormData {
  Marca_Equipo: string
  Año_Equipo: number
  Id_Categoria: string
  Id_Modelo: string
  Id_Usuario: string
  Estado_Entregado?: string
  Estado_Recibido?: string
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

interface User {
  Id_Usuario: string
  Nombre_Usuario_1: string
  Apellidos_Usuario_1: string
}

const EquipmentFormScreen: React.FC<RouteScreenProps<"EquipmentForm">> = ({ route, navigation }) => {
  const { equipmentId } = route.params || {}
  const isEditing = !!equipmentId
  const { isDarkMode } = useTheme()
  const themedStyles = createThemedScreenStyles(isDarkMode)

  const [formData, setFormData] = useState<EquipmentFormData>({
    Marca_Equipo: "",
    Año_Equipo: new Date().getFullYear(),
    Id_Categoria: "",
    Id_Modelo: "",
    Id_Usuario: "",
    Estado_Entregado: "Óptimo funcionamiento",
    Estado_Recibido: "Óptimo funcionamiento",
  })

  const [categories, setCategories] = useState<Category[]>([])
  const [models, setModels] = useState<Model[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Estados para equipos
  const EQUIPMENT_STATES = [
    "Óptimo funcionamiento",
    "En uso",
    "Bajo rendimiento",
    "Dañado",
    "Fuera de servicio",
    "En mantenimiento",
    "Actualizado",
  ]

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const [categoriesResponse, modelsResponse, usersResponse] = await Promise.all([
          categoriasService.getAll(),
          modelosService.getAll(),
          usuariosService.getAll(),
        ])

        if (categoriesResponse.success) {
          setCategories(categoriesResponse.data)
        }

        if (modelsResponse.success) {
          setModels(modelsResponse.data)
        }

        if (usersResponse.success) {
          setUsers(usersResponse.data)
        }

        if (isEditing) {
          const equipmentResponse = await equiposService.getById(equipmentId)
          if (equipmentResponse.success) {
            setFormData({
              Marca_Equipo: equipmentResponse.data.Marca_Equipo || "",
              Año_Equipo: equipmentResponse.data.Año_Equipo || new Date().getFullYear(),
              Id_Categoria: equipmentResponse.data.Id_Categoria || "",
              Id_Modelo: equipmentResponse.data.Id_Modelo || "",
              Id_Usuario: equipmentResponse.data.Id_Usuario || "",
              Estado_Entregado: equipmentResponse.data.Estado_Entregado || "Óptimo funcionamiento",
              Estado_Recibido: equipmentResponse.data.Estado_Recibido || "Óptimo funcionamiento",
            })
          } else {
            Alert.alert("Error", "No se pudo cargar la información del equipo")
            navigation.goBack()
          }
        }
      } catch (error) {
        console.error("Error al cargar datos:", error)
        Alert.alert("Error", "Ocurrió un error al cargar los datos necesarios")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [isEditing, equipmentId])

  const handleChange = (field: keyof EquipmentFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Limpiar error cuando el usuario escribe
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.Marca_Equipo.trim()) {
      newErrors.Marca_Equipo = "La marca del equipo es requerida"
    }

    if (!formData.Año_Equipo || formData.Año_Equipo < 1990 || formData.Año_Equipo > new Date().getFullYear() + 1) {
      newErrors.Año_Equipo = "El año debe estar entre 1990 y " + (new Date().getFullYear() + 1)
    }

    if (!formData.Id_Categoria) {
      newErrors.Id_Categoria = "Debe seleccionar una categoría"
    }

    if (!formData.Id_Modelo) {
      newErrors.Id_Modelo = "Debe seleccionar un modelo"
    }

    if (!formData.Id_Usuario) {
      newErrors.Id_Usuario = "Debe seleccionar un usuario responsable"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert("Error", "Por favor complete todos los campos requeridos correctamente")
      return
    }

    try {
      setSaving(true)
      let response

      if (isEditing) {
        response = await equiposService.update(equipmentId, formData)
      } else {
        response = await equiposService.create(formData)
      }

      if (response.success) {
        Alert.alert("Éxito", isEditing ? "Equipo actualizado correctamente" : "Equipo registrado correctamente", [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ])
      } else {
        Alert.alert("Error", response.message || "No se pudo guardar el equipo")
      }
    } catch (error) {
      console.error("Error al guardar equipo:", error)
      Alert.alert("Error", "Ocurrió un error al guardar el equipo")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Cargando información...</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={[styles.container, themedStyles.container]}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={[styles.scrollContainer, themedStyles.scrollContainer]}>
          <View style={[styles.formContainer, themedStyles.formContainer]}>
            <View style={[styles.formGroup, themedStyles.formGroup]}>
              <Text style={[styles.label, themedStyles.label]}>Marca del Equipo *</Text>
              <View
                style={[
                  styles.inputContainer,
                  themedStyles.inputContainer,
                  errors.Marca_Equipo ? styles.inputError : null,
                ]}
              >
                <Ionicons
                  name="hardware-chip-outline"
                  size={20}
                  color={isDarkMode ? "#AAAAAA" : "#666666"}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, themedStyles.input]}
                  placeholder="Ingrese la marca del equipo"
                  placeholderTextColor={isDarkMode ? "#777777" : "#999999"}
                  value={formData.Marca_Equipo}
                  onChangeText={(value) => handleChange("Marca_Equipo", value)}
                />
              </View>
              {errors.Marca_Equipo ? <Text style={styles.errorText}>{errors.Marca_Equipo}</Text> : null}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Año del Equipo *</Text>
              <View style={[styles.inputContainer, errors.Año_Equipo ? styles.inputError : null]}>
                <Ionicons name="calendar-outline" size={20} color="#666666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Ingrese el año del equipo"
                  value={formData.Año_Equipo.toString()}
                  onChangeText={(value) => handleChange("Año_Equipo", Number.parseInt(value) || 0)}
                  keyboardType="numeric"
                />
              </View>
              {errors.Año_Equipo ? <Text style={styles.errorText}>{errors.Año_Equipo}</Text> : null}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Categoría *</Text>
              <View style={[styles.pickerContainer, errors.Id_Categoria ? styles.inputError : null]}>
                <Picker
                  selectedValue={formData.Id_Categoria}
                  onValueChange={(value) => handleChange("Id_Categoria", value)}
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
              {errors.Id_Categoria ? <Text style={styles.errorText}>{errors.Id_Categoria}</Text> : null}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Modelo *</Text>
              <View style={[styles.pickerContainer, errors.Id_Modelo ? styles.inputError : null]}>
                <Picker selectedValue={formData.Id_Modelo} onValueChange={(value) => handleChange("Id_Modelo", value)}>
                  <Picker.Item label="Seleccione un modelo" value="" />
                  {models.map((model) => (
                    <Picker.Item
                      key={model.Id_Modelo}
                      label={`Modelo #${model.Id_Modelo} - ${model.Caracteristicas_Modelo.substring(0, 30)}...`}
                      value={model.Id_Modelo}
                    />
                  ))}
                </Picker>
              </View>
              {errors.Id_Modelo ? <Text style={styles.errorText}>{errors.Id_Modelo}</Text> : null}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Usuario Responsable *</Text>
              <View style={[styles.pickerContainer, errors.Id_Usuario ? styles.inputError : null]}>
                <Picker
                  selectedValue={formData.Id_Usuario}
                  onValueChange={(value) => handleChange("Id_Usuario", value)}
                >
                  <Picker.Item label="Seleccione un usuario" value="" />
                  {users.map((user) => (
                    <Picker.Item
                      key={user.Id_Usuario}
                      label={`${user.Nombre_Usuario_1} ${user.Apellidos_Usuario_1}`}
                      value={user.Id_Usuario}
                    />
                  ))}
                </Picker>
              </View>
              {errors.Id_Usuario ? <Text style={styles.errorText}>{errors.Id_Usuario}</Text> : null}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Estado Inicial</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.Estado_Entregado}
                  onValueChange={(value) => handleChange("Estado_Entregado", value)}
                >
                  {EQUIPMENT_STATES.map((state) => (
                    <Picker.Item key={state} label={state} value={state} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Estado Actual</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.Estado_Recibido}
                  onValueChange={(value) => handleChange("Estado_Recibido", value)}
                >
                  {EQUIPMENT_STATES.map((state) => (
                    <Picker.Item key={state} label={state} value={state} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()} disabled={saving}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={saving}>
                {saving ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={styles.submitButtonText}>{isEditing ? "Actualizar" : "Guardar"}</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333333",
  },
  pickerContainer: {
    backgroundColor: "#F9F9F9",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
  },
  inputError: {
    borderColor: "#F44336",
  },
  errorText: {
    color: "#F44336",
    fontSize: 14,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
  submitButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 12,
    marginLeft: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
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
})

export default EquipmentFormScreen
