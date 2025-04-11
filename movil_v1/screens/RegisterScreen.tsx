"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { usuariosService } from "../services/api"
import type { AuthScreenProps } from "../types/navigation"

const RegisterScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  const [formData, setFormData] = useState({
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
    Id_Rol: "3", // Por defecto, rol de usuario normal (Docente)
  })

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [generalError, setGeneralError] = useState("")

  useEffect(() => {
    // Limpiar el error general cuando cambia el formulario
    if (generalError) setGeneralError("")
  }, [formData])

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })

    // Limpiar error cuando el usuario escribe
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: "",
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
    if (!formData.Contraseña.trim()) {
      newErrors.Contraseña = "La contraseña es obligatoria"
    } else if (formData.Contraseña.length < 6) {
      newErrors.Contraseña = "La contraseña debe tener al menos 6 caracteres"
    }
    if (formData.Contraseña !== formData.confirmarContraseña) {
      newErrors.confirmarContraseña = "Las contraseñas no coinciden"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRegister = async () => {
    if (!validateForm()) {
      return
    }

    try {
      setLoading(true)
      setGeneralError("")

      // Eliminar el campo de confirmar contraseña antes de enviar
      const { confirmarContraseña, ...userData } = formData

      // Llamada al servicio de registro
      const response = await usuariosService.register(userData)

      if (response.success) {
        Alert.alert("Registro exitoso", "Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión.", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login"),
          },
        ])
      } else {
        setGeneralError(response.message || "No se pudo completar el registro")
      }
    } catch (error) {
      console.error("Error en registro:", error)
      try {
        // algo que puede lanzar error
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
        setGeneralError("Ocurrió un error durante el registro. Por favor, inténtalo de nuevo.")
      }
     }
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Crear una cuenta</Text>
            <Text style={styles.subtitle}>Completa el formulario para registrarte en el sistema</Text>
          </View>

          {generalError ? (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={20} color="#FF3B30" />
              <Text style={styles.errorGeneralText}>{generalError}</Text>
            </View>
          ) : null}

          <View style={styles.formContainer}>
            {/* Usuario */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Usuario *</Text>
              <View style={[styles.inputContainer, errors.Usuario ? styles.inputContainerError : null]}>
                <Ionicons name="person-outline" size={20} color="#666666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Nombre de usuario"
                  value={formData.Usuario}
                  onChangeText={(value) => handleChange("Usuario", value)}
                  autoCapitalize="none"
                  testID="username-input"
                />
              </View>
              {errors.Usuario ? <Text style={styles.errorText}>{errors.Usuario}</Text> : null}
            </View>

            {/* Nombre_Usuario_1 */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Primer Nombre *</Text>
              <View style={[styles.inputContainer, errors.Nombre_Usuario_1 ? styles.inputContainerError : null]}>
                <Ionicons name="person-outline" size={20} color="#666666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Primer nombre"
                  value={formData.Nombre_Usuario_1}
                  onChangeText={(value) => handleChange("Nombre_Usuario_1", value)}
                  testID="firstname-input"
                />
              </View>
              {errors.Nombre_Usuario_1 ? <Text style={styles.errorText}>{errors.Nombre_Usuario_1}</Text> : null}
            </View>

            {/* Nombre_Usuario_2 */}
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

            {/* Apellidos_Usuario_1 */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Primer Apellido *</Text>
              <View style={[styles.inputContainer, errors.Apellidos_Usuario_1 ? styles.inputContainerError : null]}>
                <Ionicons name="person-outline" size={20} color="#666666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Primer apellido"
                  value={formData.Apellidos_Usuario_1}
                  onChangeText={(value) => handleChange("Apellidos_Usuario_1", value)}
                  testID="lastname-input"
                />
              </View>
              {errors.Apellidos_Usuario_1 ? <Text style={styles.errorText}>{errors.Apellidos_Usuario_1}</Text> : null}
            </View>

            {/* Apellidos_Usuario_2 */}
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

            {/* Telefono_1_Usuario */}
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

            {/* Telefono_2_Usuario */}
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

            {/* Correo_Usuario */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Correo Electrónico *</Text>
              <View style={[styles.inputContainer, errors.Correo_Usuario ? styles.inputContainerError : null]}>
                <Ionicons name="mail-outline" size={20} color="#666666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="correo@ejemplo.com"
                  value={formData.Correo_Usuario}
                  onChangeText={(value) => handleChange("Correo_Usuario", value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  testID="email-input"
                />
              </View>
              {errors.Correo_Usuario ? <Text style={styles.errorText}>{errors.Correo_Usuario}</Text> : null}
            </View>

            {/* Contraseña */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Contraseña *</Text>
              <View style={[styles.inputContainer, errors.Contraseña ? styles.inputContainerError : null]}>
                <Ionicons name="lock-closed-outline" size={20} color="#666666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Contraseña"
                  value={formData.Contraseña}
                  onChangeText={(value) => handleChange("Contraseña", value)}
                  secureTextEntry={!showPassword}
                  testID="password-input"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                  <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#666666" />
                </TouchableOpacity>
              </View>
              {errors.Contraseña ? <Text style={styles.errorText}>{errors.Contraseña}</Text> : null}
            </View>

            {/* Confirmar Contraseña */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Confirmar Contraseña *</Text>
              <View style={[styles.inputContainer, errors.confirmarContraseña ? styles.inputContainerError : null]}>
                <Ionicons name="lock-closed-outline" size={20} color="#666666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirmar contraseña"
                  value={formData.confirmarContraseña}
                  onChangeText={(value) => handleChange("confirmarContraseña", value)}
                  secureTextEntry={!showConfirmPassword}
                  testID="confirm-password-input"
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                  <Ionicons name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#666666" />
                </TouchableOpacity>
              </View>
              {errors.confirmarContraseña ? <Text style={styles.errorText}>{errors.confirmarContraseña}</Text> : null}
            </View>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}
              disabled={loading}
              testID="register-button"
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.registerButtonText}>Registrarse</Text>
              )}
            </TouchableOpacity>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>¿Ya tienes una cuenta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")} testID="login-link">
                <Text style={styles.loginLink}>Iniciar Sesión</Text>
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
    paddingBottom: 24,
  },
  header: {
    padding: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFEEEE",
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 24,
    marginBottom: 16,
  },
  errorGeneralText: {
    color: "#FF3B30",
    marginLeft: 8,
    flex: 1,
  },
  formContainer: {
    paddingHorizontal: 24,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333333",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputContainerError: {
    borderWidth: 1,
    borderColor: "#FF3B30",
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 8,
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  registerButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 24,
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  loginText: {
    fontSize: 14,
    color: "#666666",
  },
  loginLink: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "bold",
  },
})

export default RegisterScreen

