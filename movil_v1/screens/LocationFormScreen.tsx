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
  Switch,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import type { RouteScreenProps } from "../types/navigation"
import { ubicacionesService } from "../services/api"

// Definir la interfaz para el formulario de ubicación
interface LocationFormData {
  Nombre_Ubicacion: string
  Prestamo_disponible: string
}

const LocationFormScreen: React.FC<RouteScreenProps<"LocationForm">> = ({ route, navigation }) => {
  const { locationId } = route.params || {}
  const isEditing = !!locationId

  const [formData, setFormData] = useState<LocationFormData>({
    Nombre_Ubicacion: "",
    Prestamo_disponible: "No",
  })

  const [prestamoDisponible, setPrestamoDisponible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fetchingData, setFetchingData] = useState(isEditing)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Si estamos editando, cargar los datos de la ubicación
  useEffect(() => {
    if (isEditing) {
      fetchLocationData()
    }
  }, [locationId])

  // Actualizar el formData cuando cambia prestamoDisponible
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      Prestamo_disponible: prestamoDisponible ? "Si" : "No",
    }))
  }, [prestamoDisponible])

  const fetchLocationData = async () => {
    try {
      setFetchingData(true)
      const response = await ubicacionesService.getById(locationId)
      if (response.success) {
        const { Nombre_Ubicacion, Prestamo_disponible } = response.data
        setFormData({
          Nombre_Ubicacion: Nombre_Ubicacion || "",
          Prestamo_disponible: Prestamo_disponible || "No",
        })
        setPrestamoDisponible(Prestamo_disponible?.toLowerCase() === "si")
      } else {
        Alert.alert("Error", "No se pudo cargar la información de la ubicación")
        navigation.goBack()
      }
    } catch (error) {
      console.error("Error al cargar ubicación:", error)
      Alert.alert("Error", "Ocurrió un error al cargar los datos de la ubicación")
      navigation.goBack()
    } finally {
      setFetchingData(false)
    }
  }

  const handleChange = (field: keyof LocationFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Limpiar el error del campo cuando el usuario escribe
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.Nombre_Ubicacion.trim()) {
      newErrors.Nombre_Ubicacion = "El nombre de la ubicación es requerido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }

    try {
      setLoading(true)
      let response

      if (isEditing) {
        response = await ubicacionesService.update(locationId, formData)
      } else {
        response = await ubicacionesService.create(formData)
      }

      if (response.success) {
        Alert.alert("Éxito", isEditing ? "Ubicación actualizada correctamente" : "Ubicación creada correctamente", [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ])
      } else {
        Alert.alert("Error", response.message || "No se pudo guardar la ubicación")
      }
    } catch (error) {
      console.error("Error al guardar ubicación:", error)
      Alert.alert("Error", "Ocurrió un error al guardar la ubicación")
    } finally {
      setLoading(false)
    }
  }

  if (fetchingData) {
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
              <Text style={styles.label}>Nombre de la Ubicación *</Text>
              <TextInput
                style={[styles.input, errors.Nombre_Ubicacion ? styles.inputError : null]}
                value={formData.Nombre_Ubicacion}
                onChangeText={(value) => handleChange("Nombre_Ubicacion", value)}
                placeholder="Ingrese el nombre de la ubicación"
              />
              {errors.Nombre_Ubicacion ? <Text style={styles.errorText}>{errors.Nombre_Ubicacion}</Text> : null}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Préstamo Disponible</Text>
              <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>{prestamoDisponible ? "Sí" : "No"}</Text>
                <Switch
                  value={prestamoDisponible}
                  onValueChange={setPrestamoDisponible}
                  trackColor={{ false: "#D1D1D6", true: "#4CAF50" }}
                  thumbColor={"#FFFFFF"}
                />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()} disabled={loading}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
                {loading ? (
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
  input: {
    backgroundColor: "#F9F9F9",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333333",
  },
  inputError: {
    borderColor: "#F44336",
  },
  errorText: {
    color: "#F44336",
    fontSize: 14,
    marginTop: 4,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F9F9F9",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
  },
  switchLabel: {
    fontSize: 16,
    color: "#333333",
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

export default LocationFormScreen

