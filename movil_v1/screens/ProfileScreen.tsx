import type React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import type { ScreenProps } from "../types/navigation"

// Definir la interfaz para el usuario
interface UserProfile {
  id: string
  name: string
  email: string
  role: string
  department: string
  phone: string
  profileImage: string | null
  activeLoans: number
  pendingMaintenance: number
}

// Definir la interfaz para los elementos del menú
interface MenuItem {
  title: string
  icon: string
  onPress: () => void
  danger?: boolean
}

const ProfileScreen: React.FC<ScreenProps> = ({ navigation }) => {
  // Mock user data
  const user: UserProfile = {
    id: "USR-001",
    name: "Juan Pérez",
    email: "juan.perez@empresa.com",
    role: "Administrador",
    department: "Tecnología",
    phone: "+1 234 567 8901",
    profileImage: null, // We'll use a placeholder
    activeLoans: 2,
    pendingMaintenance: 1,
  }

  const menuItems: MenuItem[] = [
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
      onPress: () => console.log("Logout"),
      danger: true,
    },
  ]

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
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Text>
              </View>
            )}
          </View>

          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userRole}>
            {user.role} - {user.department}
          </Text>

          <View style={styles.userInfoContainer}>
            <View style={styles.userInfoItem}>
              <Ionicons name="mail-outline" size={16} color="#666666" />
              <Text style={styles.userInfoText}>{user.email}</Text>
            </View>
            <View style={styles.userInfoItem}>
              <Ionicons name="call-outline" size={16} color="#666666" />
              <Text style={styles.userInfoText}>{user.phone}</Text>
            </View>
            <View style={styles.userInfoItem}>
              <Ionicons name="id-card-outline" size={16} color="#666666" />
              <Text style={styles.userInfoText}>ID: {user.id}</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{user.activeLoans}</Text>
            <Text style={styles.statLabel}>Préstamos Activos</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{user.pendingMaintenance}</Text>
            <Text style={styles.statLabel}>Mantenimientos Pendientes</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
              <View style={[styles.menuIconContainer, item.danger && styles.menuIconContainerDanger]}>
                <Ionicons name={item.icon as any} size={20} color={item.danger ? "#F44336" : "#007AFF"} />
              </View>
              <Text style={[styles.menuItemText, item.danger && styles.menuItemTextDanger]}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
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
    backgroundColor: "#007AFF",
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
    color: "#333333",
    marginBottom: 4,
  },
  userRole: {
    fontSize: 16,
    color: "#666666",
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
    color: "#666666",
    marginLeft: 8,
  },
  statsContainer: {
    flexDirection: "row",
    padding: 16,
    justifyContent: "space-around",
  },
  statCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    width: "45%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
  },
  statLabel: {
    fontSize: 12,
    color: "#666666",
    marginTop: 4,
    textAlign: "center",
  },
  menuContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F0F8FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  menuIconContainerDanger: {
    backgroundColor: "#FFEBEE",
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: "#333333",
  },
  menuItemTextDanger: {
    color: "#F44336",
  },
})

export default ProfileScreen

