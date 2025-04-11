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
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { usuariosService } from "../services/api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import type { AuthScreenProps } from "../types/navigation"
import { useTheme } from "../context/ThemeContext"
import { createThemedStyles } from "../style/theme"

const LoginScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const { isDarkMode } = useTheme()
  const styles = getStyles(isDarkMode)

  useEffect(() => {
    // Limpiar el error cuando cambian las credenciales
    if (error) setError("")
  }, [username, password])

  const handleLogin = async () => {
    // Validación básica
    if (!username.trim()) {
      setError("Por favor ingresa tu nombre de usuario")
      return
    }

    if (!password.trim()) {
      setError("Por favor ingresa tu contraseña")
      return
    }

    try {
      setLoading(true)
      setError("")

      // Llamada al servicio de login
      const response = await usuariosService.login({
        Usuario: username,
        Contraseña: password,
      })

      if (response.success) {
        console.log("Usuario autenticado:", response.data)

        // Guardar los datos del usuario en AsyncStorage
        await AsyncStorage.setItem("userData", JSON.stringify(response.data))
        await AsyncStorage.setItem("token", "dummy-token")

      } else {
        setError(response.message || "Credenciales inválidas")
      }
    } catch (error) {
      console.error("Error en inicio de sesión:", error)

      try {
        // algo que puede lanzar error
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
        setError("Error de conexión. Verifica tu conexión a internet o la dirección del servidor.")
      }
     }
    } finally {
      setLoading(false)
    }
  }

  const navigateToRegister = () => {
    navigation.navigate("Register")
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.logoContainer}>
            <Image source={require("../assets/logo.png")} style={styles.logo} resizeMode="contain" />
            <Text style={styles.title}>Sistema de Gestión de Inventario Tecnologico</Text>
          </View>

          <View style={styles.formContainer}>
            {error ? (
              <View style={styles.errorContainer}>
                <Ionicons name="alert-circle" size={20} color={isDarkMode ? "#FF453A" : "#FF3B30"} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color={isDarkMode ? "#AAAAAA" : "#666666"} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Usuario"
                placeholderTextColor={isDarkMode ? "#777777" : "#999999"}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                testID="username-input"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color={isDarkMode ? "#AAAAAA" : "#666666"} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor={isDarkMode ? "#777777" : "#999999"}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                testID="password-input"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color={isDarkMode ? "#AAAAAA" : "#666666"} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading} testID="login-button">
              {loading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgotPasswordLink}>
              <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>¿No tienes una cuenta? </Text>
              <TouchableOpacity onPress={navigateToRegister} testID="register-link">
                <Text style={styles.registerLink}>Regístrate</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>© 2025 Sistema de Gestión de Inventario Tecnologico</Text>
            <Text style={styles.footerText}>Versión 1.0.0</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const getStyles = (isDarkMode: boolean) => {
  const themed = createThemedStyles(isDarkMode);
  const colors = themed.colors;
  
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    keyboardAvoidingView: {
      flex: 1,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: "space-between",
      padding: 24,
    },
    logoContainer: {
      alignItems: "center",
      marginTop: 40,
      marginBottom: 40,
    },
    logo: {
      width: 120,
      height: 120,
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
      textAlign: "center",
    },
    formContainer: {
      width: "100%",
    },
    errorContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: isDarkMode ? "rgba(255, 69, 58, 0.2)" : "#FFEEEE",
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
    },
    errorText: {
      color: isDarkMode ? "#FF453A" : "#FF3B30",
      marginLeft: 8,
      flex: 1,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.inputBackground,
      borderRadius: 8,
      marginBottom: 16,
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderWidth: 1,
      borderColor: colors.border,
    },
    inputIcon: {
      marginRight: 8,
    },
    input: {
      flex: 1,
      height: 50,
      fontSize: 16,
      color: colors.text,
    },
    eyeIcon: {
      padding: 8,
    },
    loginButton: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingVertical: 16,
      alignItems: "center",
      marginTop: 8,
    },
    loginButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "bold",
    },
    forgotPasswordLink: {
      alignItems: "center",
      marginTop: 16,
      padding: 8,
    },
    forgotPasswordText: {
      color: colors.primary,
      fontSize: 14,
    },
    registerContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 16,
    },
    registerText: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    registerLink: {
      fontSize: 14,
      color: colors.primary,
      fontWeight: "bold",
    },
    footer: {
      alignItems: "center",
      marginTop: 40,
    },
    footerText: {
      color: colors.textSecondary,
      fontSize: 12,
      marginBottom: 4,
    },
  });
};

export default LoginScreen