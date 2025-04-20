"use client"

import type React from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import type { ScreenProps } from "../types/navigation"
import { useTheme } from "../context/ThemeContext"
import { createThemedStyles } from "../style/theme"
import { usuariosService } from "../services/api"
import { CommonActions } from "@react-navigation/native"
import CustomAlert from "../components/CustomAlert"
import { useAlert } from "../hooks/useAlert"

// Definir interfaces para los elementos de configuración
interface SettingItem {
  icon: string
  label: string
  type: "switch" | "info" | "button"
  value?: boolean | string
  onValueChange?: (value: boolean) => void
  onPress?: () => void
}

interface SettingSection {
  title: string
  items: SettingItem[]
}

const SettingsScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const { theme, isDarkMode, toggleTheme } = useTheme()
  const styles = getStyles(isDarkMode)
  const { alertVisible, alertConfig, showSuccess, showError, hideAlert } = useAlert()

  const handleLogout = async () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro que deseas cerrar sesión?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Cerrar sesión",
        style: "destructive",
        onPress: async () => {
          try {
            await usuariosService.logout()
            showSuccess("Sesión cerrada", "Has cerrado sesión correctamente")

            // Esperar un momento antes de navegar
            setTimeout(() => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "Auth" }],
                }),
              )
            }, 1000)
          } catch (error) {
            console.error("Error al cerrar sesión:", error)
            showError("Error", "No se pudo cerrar la sesión")
          }
        },
      },
    ])
  }

  const handleAbout = () => {
    Alert.alert(
      "Acerca de SGIT",
      "Sistema de Gestión de Inventario Tecnológico\nVersión 1.0.0\n\nDesarrollado para gestionar equipos tecnológicos, mantenimientos y préstamos.",
      [{ text: "Aceptar", style: "default" }],
    )
  }

  // Simplificar la pantalla de configuración para mostrar solo las opciones esenciales y funcionales
  const settingsSections: SettingSection[] = [
    {
      title: "Apariencia",
      items: [
        {
          icon: "moon-outline",
          label: "Modo Oscuro",
          type: "switch",
          value: isDarkMode,
          onValueChange: (value) => {
            toggleTheme()
            showSuccess(
              value ? "Modo oscuro activado" : "Modo claro activado",
              value ? "Has cambiado a modo oscuro" : "Has cambiado a modo claro",
              true,
              1500,
            )
          },
        },
      ],
    },
    {
      title: "Información",
      items: [
        {
          icon: "information-circle-outline",
          label: "Acerca de la Aplicación",
          type: "button",
          onPress: handleAbout,
        },
      ],
    },
  ]

  const renderSettingItem = (item: SettingItem, index: number) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.settingItem}
        disabled={item.type === "switch" || item.type === "info"}
        onPress={item.type === "button" ? item.onPress : undefined}
      >
        <View style={styles.settingItemIcon}>
          <Ionicons name={item.icon as any} size={22} color={isDarkMode ? "#0A84FF" : "#007AFF"} />
        </View>
        <Text style={styles.settingItemLabel}>{item.label}</Text>

        {item.type === "switch" && (
          <Switch
            value={item.value as boolean}
            onValueChange={item.onValueChange}
            trackColor={{
              false: isDarkMode ? "#3A3A3C" : "#D1D1D6",
              true: isDarkMode ? "#0A84FF" : "#007AFF",
            }}
            thumbColor={"#FFFFFF"}
          />
        )}

        {item.type === "info" && <Text style={styles.settingItemValue}>{item.value}</Text>}

        {item.type === "button" && (
          <Ionicons name="chevron-forward" size={20} color={isDarkMode ? "#555555" : "#CCCCCC"} />
        )}
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.settingSection}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.settingsList}>
              {section.items.map((item, itemIndex) => renderSettingItem(item, itemIndex))}
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>

      <CustomAlert
        visible={alertVisible}
        type={alertConfig.type}
        title={alertConfig.title}
        message={alertConfig.message}
        onClose={hideAlert}
        autoClose={alertConfig.autoClose}
        duration={alertConfig.duration}
      />
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
    settingSection: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.textSecondary,
      marginHorizontal: 16,
      marginBottom: 8,
    },
    settingsList: {
      backgroundColor: colors.card,
      borderRadius: 8,
      marginHorizontal: 16,
      shadowColor: isDarkMode ? "#000000" : "#000000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: isDarkMode ? 0.3 : 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    settingItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    settingItemIcon: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: isDarkMode ? "rgba(10, 132, 255, 0.1)" : "#F0F8FF",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
    },
    settingItemLabel: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
    },
    settingItemValue: {
      fontSize: 14,
      color: colors.textSecondary,
      marginRight: 8,
    },
    logoutButton: {
      backgroundColor: colors.danger,
      borderRadius: 8,
      padding: 16,
      alignItems: "center",
      marginHorizontal: 16,
      marginBottom: 24,
    },
    logoutButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "bold",
    },
  })
}

export default SettingsScreen
