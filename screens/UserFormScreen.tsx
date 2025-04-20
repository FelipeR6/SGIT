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
import { usuariosService } from "../services/api"

interface UserFormData {
  Usuario: string
  Nombre_Usuario_1: string
  Nombre_Usuario_2: string
  Apellidos_Usuario_1: string
  Apellidos_Usuario_2: string
  Telefono_1_Usuario: string
  Telefono_2_Usuario: string
  Correo_Usuario: string
  Contraseña: string
  confirmarContraseña: string
  Id_Rol: string
}

interface Role {
  Id_Rol: string
  Nombre_Rol: string
}

const UserFormScreen: React.FC<RouteScreenProps<"UserForm">> = ({ route, navigation }) => {
  const { userId } = route.params || {}
  const isEditing = !!userId

  const [formData, setFormData] = useState<UserFormData>({
    Usuario: "",
    Nombre_Usuario_1: "",
    Nombre_Usuario_2: "",
    Apellidos_Usuario_1: "",
    Apellidos_Usuario_2: "",
    Telefono_1_Usuario: "",
    Telefono_2_Usuario: "",
    Correo_Usuario: "",
    Contraseña: "",
    confirmarContraseña: "",
    Id_Rol: "3", // Valor por defecto (Docente)
  })

  const [roles, setRoles] = useState<Role[]>([
    { Id_Rol: "1", Nombre_Rol: "Administrador" },
    { Id_Rol: "2", Nombre_Rol: "Técnico" },
    { Id_Rol: "3", Nombre_Rol: "Docente" },
  ])

  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    if (isEditing) {
      const loadUserData = async () => {
        try {
          setLoading(true)
          const response = await usuariosService.getById(userId)

          if (response.success) {
            const userData = response.data
            setFormData({
              Usuario: userData.Usuario || "",
              Nombre_Usuario_1: userData.Nombre_Usuario_1 || "",
              Nombre_Usuario_2: userData.Nombre_Usuario_2 || "",
              Apellidos_Usuario_1: userData.Apellidos_Usuario_1 || "",
              Apellidos_Usuario_2: userData.Apellidos_Usuario_2 || "",
              Telefono_1_Usuario: userData.Telefono_1_Usuario || "",
              Telefono_2_Usuario: userData.Telefono_2_Usuario || "",
              Correo_Usuario: userData.Correo_Usuario || "",
              Contraseña: "", // No mostrar la contraseña por seguridad
              confirmarContraseña: "",
              Id_Rol: userData.Id_Rol || "3",
            })
          } else {
            Alert.alert("Error", "No se pudo cargar la información del usuario")
            navigation.goBack()
          }
        } catch (error) {
          console.error("Error al cargar datos del usuario:", error)
          Alert.alert("Error", "Ocurrió un error al cargar los datos del usuario")
          navigation.goBack()
        } finally {
          setLoading(false)
        }
      }

      loadUserData()
    }
  }, [isEditing, userId, navigation])

  const handleChange = (field: keyof UserFormData, value: string) => {
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

    // Validar campos obligatorios
    if (!formData.Usuario.trim()) {
      newErrors.Usuario = "El nombre de usuario es obligatorio"
    }

    if (!formData.Nombre_Usuario_1.trim()) {
      newErrors.Nombre_Usuario_1 = "El primer nombre es obligatorio"
    }

    if (!formData.Apellidos_Usuario_1.trim()) {
      newErrors.Apellidos_Usuario_1 = "El primer apellido es obligatorio"
    }

    if (!formData.Correo_Usuario.trim()) {
      newErrors.Correo_Usuario = "El correo electrónico es obligatorio"
    } else if (!/\S+@\S+\.\S+/.test(formData.Correo_Usuario)) {
      newErrors.Correo_Usuario = "El formato del correo electrónico no es válido"
    }

    // Solo validar contraseña si es un nuevo usuario o si se está cambiando
    if (!isEditing || formData.Contraseña) {
      if (!isEditing && !formData.Contraseña.trim()) {
        newErrors.Contraseña = "La contraseña es obligatoria"
      } else if (formData.Contraseña && formData.Contraseña.length < 6) {
        newErrors.Contraseña = "La contraseña debe tener al menos 6 caracteres"
      }

      if (formData.Contraseña !== formData.confirmarContraseña) {
        newErrors.confirmarContraseña = "Las contraseñas no coinciden"
      }
    }

    if (!formData.Id_Rol) {
      newErrors.Id_Rol = "Debe seleccionar un rol"
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

      // Eliminar el campo de confirmar contraseña antes de enviar
      const { confirmarContraseña, ...userData } = formData

      // Si estamos editando y no se proporciona contraseña, eliminarla del objeto
      if (isEditing && !userData.Contraseña) {
        delete userData.Contraseña
      }

      let response
      if (isEditing) {
        response = await usuariosService.update(userId, userData)
      } else {
        response = await usuariosService.create(userData)
      }

      if (response.success) {
        Alert.alert("Éxito", isEditing ? "Usuario actualizado correctamente" : "Usuario creado correctamente", [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ])
      } else {
        Alert.alert("Error", response.message || "No se pudo guardar el usuario")
      }
    } catch (error) {
      console.error("Error al guardar usuario:", error)
      Alert.alert("Error", "Ocurrió un error al guardar el usuario")
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
              <Text style={styles.label}>Usuario *</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color="#666666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Nombre de usuario"
                  value={formData.Usuario}
                  onChangeText={(value) => handleChange("Usuario", value)}
                  autoCapitalize="none"
                  editable={!isEditing} // No permitir editar el nombre de usuario si estamos editando
                />
              </View>
              {errors.Usuario ? <Text style={styles.errorText}>{errors.Usuario}</Text> : null}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Primer Nombre *</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color="#666666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Primer nombre"
                  value={formData.Nombre_Usuario_1}
                  onChangeText={(value) => handleChange("Nombre_Usuario_1", value)}
                />
              </View>
              {errors.Nombre_Usuario_1 ? <Text style={styles.errorText}>{errors.Nombre_Usuario_1}</Text> : null}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Segundo Nombre</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color="#666666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Segundo nombre (opcional)"
                  value={formData.Nombre_Usuario_2}
                  onChangeText={(value) => handleChange("Nombre_Usuario_2", value)}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Primer Apellido *</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color="#666666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Primer apellido"
                  value={formData.Apellidos_Usuario_1}
                  onChangeText={(value) => handleChange("Apellidos_Usuario_1", value)}
                />
              </View>
              {errors.Apellidos_Usuario_1 ? <Text style={styles.errorText}>{errors.Apellidos_Usuario_1}</Text> : null}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Segundo Apellido</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color="#666666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Segundo apellido (opcional)"
                  value={formData.Apellidos_Usuario_2}
                  onChangeText={(value) => handleChange("Apellidos_Usuario_2", value)}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Teléfono Principal</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="call-outline" size={20} color="#666666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Teléfono principal"
                  value={formData.Telefono_1_Usuario}
                  onChangeText={(value) => handleChange("Telefono_1_Usuario", value)}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Teléfono Alternativo</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="call-outline" size={20} color="#666666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Teléfono alternativo (opcional)"
                  value={formData.Telefono_2_Usuario}
                  onChangeText={(value) => handleChange("Telefono_2_Usuario", value)}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Correo Electrónico *</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#666666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="correo@ejemplo.com"
                  value={formData.Correo_Usuario}
                  onChangeText={(value) => handleChange("Correo_Usuario", value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              {errors.Correo_Usuario ? <Text style={styles.errorText}>{errors.Correo_Usuario}</Text> : null}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>{isEditing ? "Nueva Contraseña" : "Contraseña *"}</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#666666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder={isEditing ? "Dejar en blanco para mantener la actual" : "Contraseña"}
                  value={formData.Contraseña}
                  onChangeText={(value) => handleChange("Contraseña", value)}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                  <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#666666" />
                </TouchableOpacity>
              </View>
              {errors.Contraseña ? <Text style={styles.errorText}>{errors.Contraseña}</Text> : null}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>{isEditing ? "Confirmar Nueva Contraseña" : "Confirmar Contraseña *"}</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#666666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder={isEditing ? "Confirmar nueva contraseña" : "Confirmar contraseña"}
                  value={formData.confirmarContraseña}
                  onChangeText={(value) => handleChange("confirmarContraseña", value)}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                  <Ionicons name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#666666" />
                </TouchableOpacity>
              </View>
              {errors.confirmarContraseña ? <Text style={styles.errorText}>{errors.confirmarContraseña}</Text> : null}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Rol *</Text>
              <View style={styles.pickerContainer}>
                <Picker selectedValue={formData.Id_Rol} onValueChange={(value) => handleChange("Id_Rol", value)}>
                  {roles.map((role) => (
                    <Picker.Item key={role.Id_Rol} label={role.Nombre_Rol} value={role.Id_Rol} />
                  ))}
                </Picker>
              </View>
              {errors.Id_Rol ? <Text style={styles.errorText}>{errors.Id_Rol}</Text> : null}
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
  eyeIcon: {
    padding: 8,
  },
  pickerContainer: {
    backgroundColor: "#F9F9F9",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
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

export default UserFormScreen
