"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import type { RouteScreenProps } from "../types/navigation"

const EquipmentDetailScreen: React.FC<RouteScreenProps<"EquipmentDetail">> = ({ route, navigation }) => {
  const { itemId, tab } = route.params || {}
  const [activeTab, setActiveTab] = useState(tab || "info")

  // Mock equipment data
  const equipment = {
    id: "EQ-001",
    name: "Laptop Dell XPS 13",
    category: "Computadoras",
    status: "Disponible",
    location: "Oficina Principal",
    serialNumber: "SN-12345678",
    model: "XPS 13 9310",
    brand: "Dell",
    purchaseDate: "2022-01-15",
    warrantyExpiration: "2025-01-15",
    value: "$1,299.00",
    specifications: [
      { label: "Procesador", value: "Intel Core i7-1165G7" },
      { label: "RAM", value: "16GB LPDDR4x" },
      { label: "Almacenamiento", value: "512GB SSD" },
      { label: "Pantalla", value: '13.4" FHD+ (1920 x 1200)' },
      { label: "Sistema Operativo", value: "Windows 11 Pro" },
    ],
    maintenanceHistory: [
      {
        id: "M001",
        type: "Preventivo",
        date: "2022-07-15",
        technician: "Carlos Rodríguez",
        description: "Limpieza de ventiladores y actualización de software",
        status: "Completado",
      },
      {
        id: "M002",
        type: "Correctivo",
        date: "2022-11-10",
        technician: "Ana Martínez",
        description: "Reemplazo de batería",
        status: "Completado",
      },
      {
        id: "M003",
        type: "Preventivo",
        date: "2023-01-20",
        technician: "Carlos Rodríguez",
        description: "Actualización de BIOS y drivers",
        status: "Completado",
      },
    ],
    loanHistory: [
      {
        id: "L001",
        borrower: "Juan Pérez",
        department: "Desarrollo",
        startDate: "2022-03-10",
        endDate: "2022-03-25",
        status: "Devuelto",
      },
      {
        id: "L002",
        borrower: "María López",
        department: "Marketing",
        startDate: "2022-06-05",
        endDate: "2022-06-15",
        status: "Devuelto",
      },
      {
        id: "L003",
        borrower: "Juan Pérez",
        department: "Desarrollo",
        startDate: "2023-02-01",
        endDate: "2023-02-15",
        status: "Devuelto",
      },
    ],
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Disponible":
        return "#4CAF50"
      case "En préstamo":
        return "#FFC107"
      case "En mantenimiento":
        return "#F44336"
      default:
        return "#757575"
    }
  }

  const renderInfoTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.specificationContainer}>
        <Text style={styles.sectionTitle}>Información General</Text>
        <View style={styles.specificationItem}>
          <Text style={styles.specificationLabel}>ID:</Text>
          <Text style={styles.specificationValue}>{equipment.id}</Text>
        </View>
        <View style={styles.specificationItem}>
          <Text style={styles.specificationLabel}>Categoría:</Text>
          <Text style={styles.specificationValue}>{equipment.category}</Text>
        </View>
        <View style={styles.specificationItem}>
          <Text style={styles.specificationLabel}>Marca:</Text>
          <Text style={styles.specificationValue}>{equipment.brand}</Text>
        </View>
        <View style={styles.specificationItem}>
          <Text style={styles.specificationLabel}>Modelo:</Text>
          <Text style={styles.specificationValue}>{equipment.model}</Text>
        </View>
        <View style={styles.specificationItem}>
          <Text style={styles.specificationLabel}>Número de Serie:</Text>
          <Text style={styles.specificationValue}>{equipment.serialNumber}</Text>
        </View>
        <View style={styles.specificationItem}>
          <Text style={styles.specificationLabel}>Ubicación:</Text>
          <Text style={styles.specificationValue}>{equipment.location}</Text>
        </View>
        <View style={styles.specificationItem}>
          <Text style={styles.specificationLabel}>Fecha de Compra:</Text>
          <Text style={styles.specificationValue}>{equipment.purchaseDate}</Text>
        </View>
        <View style={styles.specificationItem}>
          <Text style={styles.specificationLabel}>Garantía hasta:</Text>
          <Text style={styles.specificationValue}>{equipment.warrantyExpiration}</Text>
        </View>
        <View style={styles.specificationItem}>
          <Text style={styles.specificationLabel}>Valor:</Text>
          <Text style={styles.specificationValue}>{equipment.value}</Text>
        </View>
      </View>

      <View style={styles.specificationContainer}>
        <Text style={styles.sectionTitle}>Especificaciones Técnicas</Text>
        {equipment.specifications.map((spec, index) => (
          <View key={index} style={styles.specificationItem}>
            <Text style={styles.specificationLabel}>{spec.label}:</Text>
            <Text style={styles.specificationValue}>{spec.value}</Text>
          </View>
        ))}
      </View>
    </View>
  )

  const renderMaintenanceTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Historial de Mantenimiento</Text>
      {equipment.maintenanceHistory.map((maintenance, index) => (
        <View key={index} style={styles.historyCard}>
          <View style={styles.historyCardHeader}>
            <View>
              <Text style={styles.historyCardTitle}>{maintenance.type}</Text>
              <Text style={styles.historyCardSubtitle}>ID: {maintenance.id}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: "#4CAF50" }]}>
              <Text style={styles.statusText}>{maintenance.status}</Text>
            </View>
          </View>
          <View style={styles.historyCardContent}>
            <View style={styles.historyCardItem}>
              <Ionicons name="calendar-outline" size={16} color="#666666" />
              <Text style={styles.historyCardItemText}>{maintenance.date}</Text>
            </View>
            <View style={styles.historyCardItem}>
              <Ionicons name="person-outline" size={16} color="#666666" />
              <Text style={styles.historyCardItemText}>{maintenance.technician}</Text>
            </View>
            <View style={styles.historyCardItem}>
              <Ionicons name="document-text-outline" size={16} color="#666666" />
              <Text style={styles.historyCardItemText}>{maintenance.description}</Text>
            </View>
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Programar Mantenimiento</Text>
      </TouchableOpacity>
    </View>
  )

  const renderLoansTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Historial de Préstamos</Text>
      {equipment.loanHistory.map((loan, index) => (
        <View key={index} style={styles.historyCard}>
          <View style={styles.historyCardHeader}>
            <View>
              <Text style={styles.historyCardTitle}>{loan.borrower}</Text>
              <Text style={styles.historyCardSubtitle}>{loan.department}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: "#9E9E9E" }]}>
              <Text style={styles.statusText}>{loan.status}</Text>
            </View>
          </View>
          <View style={styles.historyCardContent}>
            <View style={styles.historyCardItem}>
              <Ionicons name="calendar-outline" size={16} color="#666666" />
              <Text style={styles.historyCardItemText}>Desde: {loan.startDate}</Text>
            </View>
            <View style={styles.historyCardItem}>
              <Ionicons name="calendar-outline" size={16} color="#666666" />
              <Text style={styles.historyCardItemText}>Hasta: {loan.endDate}</Text>
            </View>
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Solicitar Préstamo</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image source={{ uri: "https://via.placeholder.com/400x300" }} style={styles.equipmentImage} />
          <View style={styles.headerOverlay}>
            <Text style={styles.equipmentName}>{equipment.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(equipment.status) }]}>
              <Text style={styles.statusText}>{equipment.status}</Text>
            </View>
          </View>
        </View>

        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === "info" && styles.activeTabButton]}
            onPress={() => setActiveTab("info")}
          >
            <Text style={[styles.tabButtonText, activeTab === "info" && styles.activeTabButtonText]}>Información</Text>
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

        {activeTab === "info" && renderInfoTab()}
        {activeTab === "maintenance" && renderMaintenanceTab()}
        {activeTab === "loans" && renderLoansTab()}
      </ScrollView>

      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="create-outline" size={20} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.actionButtonSecondary]}>
          <Ionicons name="qr-code-outline" size={20} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Ver QR</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    position: "relative",
  },
  equipmentImage: {
    width: "100%",
    height: 200,
  },
  headerOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  equipmentName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "bold",
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
  tabContent: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 12,
  },
  specificationContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  specificationItem: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  specificationLabel: {
    width: "40%",
    fontSize: 14,
    color: "#666666",
  },
  specificationValue: {
    flex: 1,
    fontSize: 14,
    color: "#333333",
    fontWeight: "500",
  },
  historyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  historyCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  historyCardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  historyCardSubtitle: {
    fontSize: 14,
    color: "#666666",
  },
  historyCardContent: {
    marginTop: 4,
  },
  historyCardItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  historyCardItemText: {
    fontSize: 14,
    color: "#666666",
    marginLeft: 8,
  },
  addButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginTop: 16,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginRight: 8,
  },
  actionButtonSecondary: {
    backgroundColor: "#4CAF50",
    marginRight: 0,
    marginLeft: 8,
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
})

export default EquipmentDetailScreen

