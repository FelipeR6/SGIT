"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import type { ScreenProps } from "../types/navigation"
import { useTheme } from "../context/ThemeContext"
import { createThemedStyles } from "../style/theme"

const ReportsScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("inventory")

  const renderInventoryReports = () => (
    <View style={styles.reportsContainer}>
      <Text style={styles.sectionTitle}>Reportes de Inventario</Text>

      <TouchableOpacity style={styles.reportCard}>
        <View style={styles.reportCardIcon}>
          <Ionicons name="list" size={24} color="#FFFFFF" />
        </View>
        <View style={styles.reportCardContent}>
          <Text style={styles.reportCardTitle}>Inventario Completo</Text>
          <Text style={styles.reportCardDescription}>
            Lista detallada de todos los equipos registrados en el sistema.
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.reportCard}>
        <View style={[styles.reportCardIcon, { backgroundColor: "#4CAF50" }]}>
          <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />
        </View>
        <View style={styles.reportCardContent}>
          <Text style={styles.reportCardTitle}>Equipos Disponibles</Text>
          <Text style={styles.reportCardDescription}>Lista de equipos que están disponibles para préstamo.</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.reportCard}>
        <View style={[styles.reportCardIcon, { backgroundColor: "#FFC107" }]}>
          <Ionicons name="swap-horizontal" size={24} color="#FFFFFF" />
        </View>
        <View style={styles.reportCardContent}>
          <Text style={styles.reportCardTitle}>Equipos en Préstamo</Text>
          <Text style={styles.reportCardDescription}>Lista de equipos que están actualmente prestados.</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.reportCard}>
        <View style={[styles.reportCardIcon, { backgroundColor: "#F44336" }]}>
          <Ionicons name="construct" size={24} color="#FFFFFF" />
        </View>
        <View style={styles.reportCardContent}>
          <Text style={styles.reportCardTitle}>Equipos en Mantenimiento</Text>
          <Text style={styles.reportCardDescription}>Lista de equipos que están en mantenimiento.</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.reportCard}>
        <View style={[styles.reportCardIcon, { backgroundColor: "#9C27B0" }]}>
          <Ionicons name="location" size={24} color="#FFFFFF" />
        </View>
        <View style={styles.reportCardContent}>
          <Text style={styles.reportCardTitle}>Equipos por Ubicación</Text>
          <Text style={styles.reportCardDescription}>Distribución de equipos por ubicación.</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
      </TouchableOpacity>
    </View>
  )

  const renderMaintenanceReports = () => (
    <View style={styles.reportsContainer}>
      <Text style={styles.sectionTitle}>Reportes de Mantenimiento</Text>

      <TouchableOpacity style={styles.reportCard}>
        <View style={[styles.reportCardIcon, { backgroundColor: "#2196F3" }]}>
          <Ionicons name="calendar" size={24} color="#FFFFFF" />
        </View>
        <View style={styles.reportCardContent}>
          <Text style={styles.reportCardTitle}>Mantenimientos Programados</Text>
          <Text style={styles.reportCardDescription}>Lista de mantenimientos programados para los próximos días.</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.reportCard}>
        <View style={[styles.reportCardIcon, { backgroundColor: "#4CAF50" }]}>
          <Ionicons name="checkmark-done" size={24} color="#FFFFFF" />
        </View>
        <View style={styles.reportCardContent}>
          <Text style={styles.reportCardTitle}>Mantenimientos Completados</Text>
          <Text style={styles.reportCardDescription}>Historial de mantenimientos completados.</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.reportCard}>
        <View style={[styles.reportCardIcon, { backgroundColor: "#FF9800" }]}>
          <Ionicons name="time" size={24} color="#FFFFFF" />
        </View>
        <View style={styles.reportCardContent}>
          <Text style={styles.reportCardTitle}>Mantenimientos en Proceso</Text>
          <Text style={styles.reportCardDescription}>Lista de mantenimientos que están en proceso.</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.reportCard}>
        <View style={[styles.reportCardIcon, { backgroundColor: "#795548" }]}>
          <Ionicons name="hardware-chip" size={24} color="#FFFFFF" />
        </View>
        <View style={styles.reportCardContent}>
          <Text style={styles.reportCardTitle}>Equipos con Más Mantenimientos</Text>
          <Text style={styles.reportCardDescription}>Ranking de equipos que han requerido más mantenimientos.</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
      </TouchableOpacity>
    </View>
  )

  const renderLoanReports = () => (
    <View style={styles.reportsContainer}>
      <Text style={styles.sectionTitle}>Reportes de Préstamos</Text>

      <TouchableOpacity style={styles.reportCard}>
        <View style={[styles.reportCardIcon, { backgroundColor: "#4CAF50" }]}>
          <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />
        </View>
        <View style={styles.reportCardContent}>
          <Text style={styles.reportCardTitle}>Préstamos Activos</Text>
          <Text style={styles.reportCardDescription}>Lista de préstamos que están actualmente activos.</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.reportCard}>
        <View style={[styles.reportCardIcon, { backgroundColor: "#F44336" }]}>
          <Ionicons name="alert-circle" size={24} color="#FFFFFF" />
        </View>
        <View style={styles.reportCardContent}>
          <Text style={styles.reportCardTitle}>Préstamos Vencidos</Text>
          <Text style={styles.reportCardDescription}>Lista de préstamos que han excedido su fecha de devolución.</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.reportCard}>
        <View style={[styles.reportCardIcon, { backgroundColor: "#9E9E9E" }]}>
          <Ionicons name="archive" size={24} color="#FFFFFF" />
        </View>
        <View style={styles.reportCardContent}>
          <Text style={styles.reportCardTitle}>Historial de Préstamos</Text>
          <Text style={styles.reportCardDescription}>Registro completo de todos los préstamos realizados.</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.reportCard}>
        <View style={[styles.reportCardIcon, { backgroundColor: "#3F51B5" }]}>
          <Ionicons name="people" size={24} color="#FFFFFF" />
        </View>
        <View style={styles.reportCardContent}>
          <Text style={styles.reportCardTitle}>Préstamos por Usuario</Text>
          <Text style={styles.reportCardDescription}>Estadísticas de préstamos agrupados por usuario.</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.reportCard}>
        <View style={[styles.reportCardIcon, { backgroundColor: "#009688" }]}>
          <Ionicons name="business" size={24} color="#FFFFFF" />
        </View>
        <View style={styles.reportCardContent}>
          <Text style={styles.reportCardTitle}>Préstamos por Departamento</Text>
          <Text style={styles.reportCardDescription}>Estadísticas de préstamos agrupados por departamento.</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "inventory" && styles.activeTabButton]}
          onPress={() => setActiveTab("inventory")}
        >
          <Text style={[styles.tabButtonText, activeTab === "inventory" && styles.activeTabButtonText]}>
            Inventario
          </Text>
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

      <ScrollView>
        {activeTab === "inventory" && renderInventoryReports()}
        {activeTab === "maintenance" && renderMaintenanceReports()}
        {activeTab === "loans" && renderLoanReports()}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
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
  reportsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 16,
  },
  reportCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  reportCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  reportCardContent: {
    flex: 1,
  },
  reportCardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 4,
  },
  reportCardDescription: {
    fontSize: 14,
    color: "#666666",
  },
})

export default ReportsScreen

