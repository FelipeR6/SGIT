"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import type { ScreenProps } from "../types/navigation"

// Definir interfaces para los elementos de configuración
interface SettingItem {
  icon: string
  label: string
  type: "switch" | "navigate" | "info"
  value?: boolean | string
  onValueChange?: (value: boolean) => void
}

interface SettingSection {
  title: string
  items: SettingItem[]
}

const SettingsScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [darkModeEnabled, setDarkModeEnabled] = useState(false)
  const [biometricEnabled, setBiometricEnabled] = useState(false)
  const [autoBackupEnabled, setAutoBackupEnabled] = useState(true)

  const settingsSections: SettingSection[] = [
    {
      title: "General",
      items: [
        {
          icon: "moon-outline",
          label: "Modo Oscuro",
          type: "switch",
          value: darkModeEnabled,
          onValueChange: setDarkModeEnabled,
        },
        {
          icon: "language-outline",
          label: "Idioma",
          type: "navigate",
          value: "Español",
        },
        {
          icon: "time-outline",
          label: "Formato de Fecha",
          type: "navigate",
          value: "DD/MM/YYYY",
        },
      ],
    },
    {
      title: "Notificaciones",
      items: [
        {
          icon: "notifications-outline",
          label: "Notificaciones",
          type: "switch",
          value: notificationsEnabled,
          onValueChange: setNotificationsEnabled,
        },
        {
          icon: "alert-circle-outline",
          label: "Alertas de Mantenimiento",
          type: "navigate",
        },
        {
          icon: "calendar-outline",
          label: "Recordatorios de Préstamos",
          type: "navigate",
        },
      ],
    },
    {
      title: "Seguridad",
      items: [
        {
          icon: "lock-closed-outline",
          label: "Cambiar Contraseña",
          type: "navigate",
        },
        {
          icon: "finger-print-outline",
          label: "Autenticación Biométrica",
          type: "switch",
          value: biometricEnabled,
          onValueChange: setBiometricEnabled,
        },
        {
          icon: "shield-outline",
          label: "Política de Privacidad",
          type: "navigate",
        },
      ],
    },
    {
      title: "Datos y Almacenamiento",
      items: [
        {
          icon: "cloud-upload-outline",
          label: "Copia de Seguridad Automática",
          type: "switch",
          value: autoBackupEnabled,
          onValueChange: setAutoBackupEnabled,
        },
        {
          icon: "cloud-download-outline",
          label: "Restaurar Datos",
          type: "navigate",
        },
        {
          icon: "trash-outline",
          label: "Limpiar Caché",
          type: "navigate",
        },
      ],
    },
    {
      title: "Acerca de",
      items: [
        {
          icon: "information-circle-outline",
          label: "Versión de la Aplicación",
          type: "info",
          value: "1.0.0",
        },
        {
          icon: "help-circle-outline",
          label: "Ayuda y Soporte",
          type: "navigate",
        },
        {
          icon: "star-outline",
          label: "Calificar la Aplicación",
          type: "navigate",
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
      >
        <View style={styles.settingItemIcon}>
          <Ionicons name={item.icon as any} size={22} color="#007AFF" />
        </View>
        <Text style={styles.settingItemLabel}>{item.label}</Text>

        {item.type === "switch" && (
          <Switch
            value={item.value as boolean}
            onValueChange={item.onValueChange}
            trackColor={{ false: "#D1D1D6", true: "#007AFF" }}
            thumbColor={"#FFFFFF"}
          />
        )}

        {item.type === "navigate" && (
          <View style={styles.settingItemRight}>
            {item.value && <Text style={styles.settingItemValue}>{item.value}</Text>}
            <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
          </View>
        )}

        {item.type === "info" && <Text style={styles.settingItemValue}>{item.value}</Text>}
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

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  settingSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666666",
    marginHorizontal: 16,
    marginBottom: 8,
  },
  settingsList: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  settingItemIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F0F8FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  settingItemLabel: {
    flex: 1,
    fontSize: 16,
    color: "#333333",
  },
  settingItemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingItemValue: {
    fontSize: 14,
    color: "#999999",
    marginRight: 8,
  },
  logoutButton: {
    backgroundColor: "#F44336",
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

export default SettingsScreen

