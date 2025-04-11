"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { CommonActions } from "@react-navigation/native"
import type { ScreenProps } from "../types/navigation"
import { useTheme } from "../context/ThemeContext"
import { createThemedStyles } from "../style/theme"

// Definir la interfaz para el usuario
interface UserProfile {
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
  profileImage?: string | null
}

const ProfileScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const { isDarkMode } = useTheme()
  const styles = getStyles(isDarkMode)

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData")
      if (userData) {
        setUser(JSON.parse(userData))
      }
    } catch (error) {
      console.error("Error loading user data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    Alert.alert("Cerrar Sesión", "¿Estás seguro que deseas cerrar sesión?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sí, cerrar sesión",
        onPress: async () => {
          try {
            // Limpiar AsyncStorage
            await AsyncStorage.removeItem("userData")
            await AsyncStorage.removeItem("token")

            // Navegar a la pantalla de login
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Auth" }],
              }),
            )
          } catch (error) {
            console.error("Error al cerrar sesión:", error)
            Alert.alert("Error", "No se pudo cerrar sesión correctamente")
          }
        },
      },
    ])
  }

  // Definir los elementos del menú
  const menuItems = [
    {
      title: "Información Personal",
      icon: "person",
      onPress: () => console.log("Personal Info"),
    },
    {
      title: "Mis Préstamos",
      icon: "swap-horizontal",
      onPress: () => navigation.navigate("Loans"),
    },
    {
      title: "Mis Mantenimientos",
      icon: "construct",
      onPress: () => navigation.navigate("Maintenance"),
    },
    {
      title: "Notificaciones",
      icon: "notifications",
      onPress: () => console.log("Notifications"),
    },
    {
      title: "Configuración",
      icon: "settings",
      onPress: () => navigation.navigate("Settings"),
    },
    {
      title: "Ayuda y Soporte",
      icon: "help-circle",
      onPress: () => console.log("Help"),
    },
    {
      title: "Cerrar Sesión",
      icon: "log-out",
      onPress: handleLogout,
      danger: true,
    },
  ]

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </View>
    )
  }

  if (!user) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.errorText}>No se pudo cargar la información del usuario</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadUserData}>
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            {user.profileImage ? (
              <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Text style={styles.profileImagePlaceholderText}>
                  {`${user.Nombre_Usuario_1.charAt(0)}${user.Apellidos_Usuario_1.charAt(0)}`}
                </Text>
              </View>
            )}
          </View>

          <Text style={styles.userName}>{`${user.Nombre_Usuario_1} ${user.Apellidos_Usuario_1}`}</Text>
          <Text style={styles.userRole}>
            {user.Nombre_Rol || "Usuario"} - ID: {user.Id_Usuario}
          </Text>

          <View style={styles.userInfoContainer}>
            <View style={styles.userInfoItem}>
              <Ionicons name="mail-outline" size={16} color={isDarkMode ? "#AAAAAA" : "#666666"} />
              <Text style={styles.userInfoText}>{user.Correo_Usuario}</Text>
            </View>
            {user.Telefono_1_Usuario && (
              <View style={styles.userInfoItem}>
                <Ionicons name="call-outline" size={16} color={isDarkMode ? "#AAAAAA" : "#666666"} />
                <Text style={styles.userInfoText}>{user.Telefono_1_Usuario}</Text>
              </View>
            )}
            <View style={styles.userInfoItem}>
              <Ionicons name="person-outline" size={16} color={isDarkMode ? "#AAAAAA" : "#666666"} />
              <Text style={styles.userInfoText}>@{user.Usuario}</Text>
            </View>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
              <View style={[styles.menuIconContainer, item.danger && styles.menuIconContainerDanger]}>
                <Ionicons
                  name={item.icon as any}
                  size={20}
                  color={item.danger ? "#F44336" : isDarkMode ? "#0A84FF" : "#007AFF"}
                />
              </View>
              <Text style={[styles.menuItemText, item.danger && styles.menuItemTextDanger]}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color={isDarkMode ? "#555555" : "#CCCCCC"} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const getStyles = (isDarkMode: boolean) => {
  const themed = createThemedStyles(isDarkMode)
  const colors = themed.colors

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    loadingContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    loadingText: {
      color: colors.text,
      fontSize: 16,
    },
    errorText: {
      color: colors.danger,
      fontSize: 16,
    },
    retryButton: {
      marginTop: 16,
      backgroundColor: colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },
    retryButtonText: {
      color: "#FFFFFF",
      fontWeight: "bold",
    },
    header: {
      backgroundColor: colors.card,
      padding: 20,
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    profileImageContainer: {
      marginBottom: 16,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    profileImagePlaceholder: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
    },
    profileImagePlaceholderText: {
      fontSize: 36,
      color: "#FFFFFF",
      fontWeight: "bold",
    },
    userName: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 4,
    },
    userRole: {
      fontSize: 16,
      color: colors.textSecondary,
      marginBottom: 16,
    },
    userInfoContainer: {
      width: "100%",
    },
    userInfoItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    userInfoText: {
      fontSize: 14,
      color: colors.textSecondary,
      marginLeft: 8,
    },
    menuContainer: {
      backgroundColor: colors.card,
      borderRadius: 8,
      margin: 16,
      shadowColor: isDarkMode ? "#000000" : "#000000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: isDarkMode ? 0.3 : 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    menuIconContainer: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: isDarkMode ? "rgba(10, 132, 255, 0.1)" : "#F0F8FF",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
    },
    menuIconContainerDanger: {
      backgroundColor: isDarkMode ? "rgba(255, 69, 58, 0.1)" : "#FFEBEE",
    },
    menuItemText: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
    },
    menuItemTextDanger: {
      color: colors.danger,
    },
  })
}

export default ProfileScreen
