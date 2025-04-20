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
import DateTimePicker from "@react-native-community/datetimepicker"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import type { RouteScreenProps } from "../types/navigation"
import { mantenimientosService, equiposService, usuariosService } from "../services/api"

interface MaintenanceFormData {
  Fecha_Inicio_mantenimiento: string
  Fecha_fin_mantenimiento: string
  Observaciones: string
  Id_Equipos: string
  Id_Usuario: string
}

interface Equipment {
  Id_Equipos: string
  Marca_Equipo: string
}

interface User {
  Id_Usuario: string
  Nombre_Usuario_1: string
  Apellidos_Usuario_1: string
}

const MaintenanceFormScreen: React.FC<RouteScreenProps<"MaintenanceForm">> = ({ route, navigation }) => {
  const { maintenanceId } = route.params || {}
  const isEditing = !!maintenanceId

  const [formData, setFormData] = useState<MaintenanceFormData>({
    Fecha_Inicio_mantenimiento: format(new Date(), "yyyy-MM-dd"),
    Fecha_fin_mantenimiento: format(new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"),
    Observaciones: "",
    Id_Equipos: "",
    Id_Usuario: "",
  })

  const [equipments, setEquipments] = useState<Equipment[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showStartDatePicker, setShowStartDatePicker] = useState(false)
  const [showEndDatePicker, setShowEndDatePicker] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const [equipmentsResponse, usersResponse] = await Promise.all([
          equiposService.getAll(),
          usuariosService.getAll(),
        ])

        if (equipmentsResponse.success) {
          setEquipments(equipmentsResponse.data)
        }

        if (usersResponse.success) {
          setUsers(usersResponse.data)
        }

        if (isEditing) {
          const maintenanceResponse = await mantenimientosService.getById(maintenanceId)
          if (maintenanceResponse.success) {
            setFormData({
              Fecha_Inicio_mantenimiento: maintenanceResponse.data.Fecha_Inicio_mantenimiento,
              Fecha_fin_mantenimiento: maintenanceResponse.data.Fecha_fin_mantenimiento,
              Observaciones: maintenanceResponse.data.Observaciones,
              Id_Equipos: maintenanceResponse.data.Id_Equipos,
              Id_Usuario: maintenanceResponse.data.Id_Usuario,
            })
          } else {
            Alert.alert("Error", "No se pudo cargar la información del mantenimiento")
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
  }, [isEditing, maintenanceId])

  const handleChange = (field: keyof MaintenanceFormData, value: string) => {
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

  const handleDateChange = (event: any, selectedDate?: Date, field?: keyof MaintenanceFormData) => {
    if (Platform.OS === "android") {
      setShowStartDatePicker(false)
      setShowEndDatePicker(false)
    }

    if (selectedDate && field) {
      handleChange(field, format(selectedDate, "yyyy-MM-dd"))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.Fecha_Inicio_mantenimiento) {
      newErrors.Fecha_Inicio_mantenimiento = "La fecha de inicio es requerida"
    }

    if (!formData.Fecha_fin_mantenimiento) {
      newErrors.Fecha_fin_mantenimiento = "La fecha de fin es requerida"
    }

    if (
      formData.Fecha_Inicio_mantenimiento &&
      formData.Fecha_fin_mantenimiento &&
      new Date(formData.Fecha_Inicio_mantenimiento) > new Date(formData.Fecha_fin_mantenimiento)
    ) {
      newErrors.Fecha_fin_mantenimiento = "La fecha de fin debe ser posterior a la fecha de inicio"
    }

    if (!formData.Observaciones.trim()) {
      newErrors.Observaciones = "Las observaciones son requeridas"
    }

    if (!formData.Id_Equipos) {
      newErrors.Id_Equipos = "Debe seleccionar un equipo"
    }

    if (!formData.Id_Usuario) {
      newErrors.Id_Usuario = "Debe seleccionar un técnico"
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
        response = await mantenimientosService.update(maintenanceId, formData)
      } else {
        response = await mantenimientosService.create(formData)
      }

      if (response.success) {
        Alert.alert(
          "Éxito",
          isEditing ? "Mantenimiento actualizado correctamente" : "Mantenimiento registrado correctamente",
          [
            {
              text: "OK",
              onPress: () => navigation.goBack(),
            },
          ],
        )
      } else {
        Alert.alert("Error", response.message || "No se pudo guardar el mantenimiento")
      }
    } catch (error) {
      console.error("Error al guardar mantenimiento:", error)
      Alert.alert("Error", "Ocurrió un error al guardar el mantenimiento")
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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.formContainer}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Equipo *</Text>
              <View style={[styles.pickerContainer, errors.Id_Equipos ? styles.inputError : null]}>
                <Picker
                  selectedValue={formData.Id_Equipos}
                  onValueChange={(value) => handleChange("Id_Equipos", value)}
                >
                  <Picker.Item label="Seleccione un equipo" value="" />
                  {equipments.map((equipment) => (
                    <Picker.Item
                      key={equipment.Id_Equipos}
                      label={`${equipment.Marca_Equipo} (ID: ${equipment.Id_Equipos})`}
                      value={equipment.Id_Equipos}
                    />
                  ))}
                </Picker>
              </View>
              {errors.Id_Equipos ? <Text style={styles.errorText}>{errors.Id_Equipos}</Text> : null}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Técnico Responsable *</Text>
              <View style={[styles.pickerContainer, errors.Id_Usuario ? styles.inputError : null]}>
                <Picker
                  selectedValue={formData.Id_Usuario}
                  onValueChange={(value) => handleChange("Id_Usuario", value)}
                >
                  <Picker.Item label="Seleccione un técnico" value="" />
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
              <Text style={styles.label}>Fecha de Inicio *</Text>
              <TouchableOpacity
                style={[styles.dateInput, errors.Fecha_Inicio_mantenimiento ? styles.inputError : null]}
                onPress={() => setShowStartDatePicker(true)}
              >
                <Text style={styles.dateText}>
                  {format(new Date(formData.Fecha_Inicio_mantenimiento), "dd/MM/yyyy", { locale: es })}
                </Text>
                <Ionicons name="calendar-outline" size={20} color="#666666" />
              </TouchableOpacity>
              {showStartDatePicker && (
                <DateTimePicker
                  value={new Date(formData.Fecha_Inicio_mantenimiento)}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={(event, date) => handleDateChange(event, date, "Fecha_Inicio_mantenimiento")}
                />
              )}
              {errors.Fecha_Inicio_mantenimiento ? (
                <Text style={styles.errorText}>{errors.Fecha_Inicio_mantenimiento}</Text>
              ) : null}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Fecha de Finalización *</Text>
              <TouchableOpacity
                style={[styles.dateInput, errors.Fecha_fin_mantenimiento ? styles.inputError : null]}
                onPress={() => setShowEndDatePicker(true)}
              >
                <Text style={styles.dateText}>
                  {format(new Date(formData.Fecha_fin_mantenimiento), "dd/MM/yyyy", { locale: es })}
                </Text>
                <Ionicons name="calendar-outline" size={20} color="#666666" />
              </TouchableOpacity>
              {showEndDatePicker && (
                <DateTimePicker
                  value={new Date(formData.Fecha_fin_mantenimiento)}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={(event, date) => handleDateChange(event, date, "Fecha_fin_mantenimiento")}
                />
              )}
              {errors.Fecha_fin_mantenimiento ? (
                <Text style={styles.errorText}>{errors.Fecha_fin_mantenimiento}</Text>
              ) : null}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Observaciones *</Text>
              <TextInput
                style={[styles.textArea, errors.Observaciones ? styles.inputError : null]}
                multiline
                numberOfLines={4}
                placeholder="Describa el mantenimiento a realizar"
                value={formData.Observaciones}
                onChangeText={(value) => handleChange("Observaciones", value)}
              />
              {errors.Observaciones ? <Text style={styles.errorText}>{errors.Observaciones}</Text> : null}
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
  pickerContainer: {
    backgroundColor: "#F9F9F9",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
  },
  dateInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
  },
  dateText: {
    fontSize: 16,
    color: "#333333",
  },
  textArea: {
    backgroundColor: "#F9F9F9",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333333",
    textAlignVertical: "top",
    minHeight: 100,
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

export default MaintenanceFormScreen
