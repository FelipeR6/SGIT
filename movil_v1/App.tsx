"use client"

import { useState, useEffect } from "react"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { StatusBar } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import type { RootStackParamList, RootTabParamList, AuthStackParamList } from "./types/navigation"

// Import screens
import HomeScreen from "./screens/HomeScreen"
import InventoryScreen from "./screens/InventoryScreen"
import MaintenanceScreen from "./screens/MaintenanceScreen"
import LoansScreen from "./screens/LoansScreen"
import ProfileScreen from "./screens/ProfileScreen"
import UsersScreen from "./screens/UsersScreen"
import LocationsScreen from "./screens/LocationsScreen"
import ReportsScreen from "./screens/ReportsScreen"
import EquipmentDetailScreen from "./screens/EquipmentDetailScreen"
import SettingsScreen from "./screens/SettingsScreen"
import LocationFormScreen from "./screens/LocationFormScreen"
import MaintenanceFormScreen from "./screens/MaintenanceFormScreen"
import LoanFormScreen from "./screens/LoanFormScreen"
import UserFormScreen from "./screens/UserFormScreen"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import SplashScreen from "./screens/SplashScreen"

// Import theme provider
import { ThemeProvider, useTheme } from "./context/ThemeContext"
import { lightColors, darkColors } from "./style/theme"

const Tab = createBottomTabNavigator<RootTabParamList>()
const Stack = createNativeStackNavigator<RootStackParamList>()
const AuthStack = createNativeStackNavigator<AuthStackParamList>()
const RootStack = createNativeStackNavigator()

// Stack navigators for each tab
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="HomeMain" component={HomeScreen} options={{ title: "Inicio" }} />
    <Stack.Screen name="EquipmentDetail" component={EquipmentDetailScreen} options={{ title: "Detalle de Equipo" }} />
    <Stack.Screen name="Users" component={UsersScreen} options={{ title: "Gestión de Usuarios" }} />
    <Stack.Screen
      name="UserForm"
      component={UserFormScreen}
      options={({ route }) => ({
        title: route.params?.userId ? "Editar Usuario" : "Nuevo Usuario",
      })}
    />
    <Stack.Screen name="Locations" component={LocationsScreen} options={{ title: "Ubicaciones" }} />
    <Stack.Screen
      name="LocationForm"
      component={LocationFormScreen}
      options={({ route }) => ({
        title: route.params?.locationId ? "Editar Ubicación" : "Nueva Ubicación",
      })}
    />
    <Stack.Screen name="Reports" component={ReportsScreen} options={{ title: "Reportes" }} />
    <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: "Configuraciones" }} />
  </Stack.Navigator>
)

const InventoryStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="InventoryMain" component={InventoryScreen} options={{ title: "Inventario" }} />
    <Stack.Screen name="EquipmentDetail" component={EquipmentDetailScreen} options={{ title: "Detalle de Equipo" }} />
  </Stack.Navigator>
)

const MaintenanceStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="MaintenanceMain" component={MaintenanceScreen} options={{ title: "Mantenimiento" }} />
    <Stack.Screen name="EquipmentDetail" component={EquipmentDetailScreen} options={{ title: "Detalle de Equipo" }} />
    <Stack.Screen
      name="MaintenanceForm"
      component={MaintenanceFormScreen}
      options={({ route }) => ({
        title: route.params?.maintenanceId ? "Editar Mantenimiento" : "Nuevo Mantenimiento",
      })}
    />
  </Stack.Navigator>
)

const LoansStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="LoansMain" component={LoansScreen} options={{ title: "Préstamos" }} />
    <Stack.Screen name="EquipmentDetail" component={EquipmentDetailScreen} options={{ title: "Detalle de Equipo" }} />
    <Stack.Screen
      name="LoanForm"
      component={LoanFormScreen}
      options={({ route }) => ({
        title: route.params?.loanId ? "Editar Préstamo" : "Nuevo Préstamo",
      })}
    />
  </Stack.Navigator>
)

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ProfileMain" component={ProfileScreen} options={{ title: "Perfil" }} />
    <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: "Configuraciones" }} />
  </Stack.Navigator>
)

// Auth navigator
const AuthStackNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
  </AuthStack.Navigator>
)

// Main tab navigator
const MainTabNavigator = () => {
  const { isDarkMode } = useTheme()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === "Inventory") {
            iconName = focused ? "list" : "list-outline"
          } else if (route.name === "Maintenance") {
            iconName = focused ? "construct" : "construct-outline"
          } else if (route.name === "Loans") {
            iconName = focused ? "swap-horizontal" : "swap-horizontal-outline"
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline"
          }

          return <Ionicons name={iconName as any} size={size} color={color} />
        },
        tabBarActiveTintColor: isDarkMode ? lightColors.primary : darkColors.primary,
        tabBarInactiveTintColor: isDarkMode ? darkColors.tabBarInactive : lightColors.tabBarInactive,
        tabBarStyle: {
          backgroundColor: isDarkMode ? darkColors.tabBar : lightColors.tabBar,
          borderTopColor: isDarkMode ? darkColors.border : lightColors.border,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          title: "Inicio",
        }}
      />
      <Tab.Screen
        name="Inventory"
        component={InventoryStack}
        options={{
          headerShown: false,
          title: "Inventario",
        }}
      />
      <Tab.Screen
        name="Maintenance"
        component={MaintenanceStack}
        options={{
          headerShown: false,
          title: "Mantenimiento",
        }}
      />
      <Tab.Screen
        name="Loans"
        component={LoansStack}
        options={{
          headerShown: false,
          title: "Préstamos",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
          title: "Perfil",
        }}
      />
    </Tab.Navigator>
  )
}

// Main app with authentication flow and theme
const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { theme, isDarkMode } = useTheme()

  // Crear temas personalizados para NavigationContainer
  const customLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: lightColors.background,
      card: lightColors.card,
      text: lightColors.text,
      border: lightColors.border,
      primary: lightColors.primary,
    },
  }

  const customDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: darkColors.background,
      card: darkColors.card,
      text: darkColors.text,
      border: darkColors.border,
      primary: darkColors.primary,
    },
  }

  useEffect(() => {
    // Check if user is logged in
    const checkLoginStatus = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData")
        if (userData) {
          console.log("Usuario autenticado encontrado en AsyncStorage")
          setIsAuthenticated(true)
        } else {
          console.log("No se encontró usuario autenticado en AsyncStorage")
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error("Error checking login status:", error)
        setIsAuthenticated(false)
      } finally {
        // Simulate a splash screen delay
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
      }
    }

    checkLoginStatus()
  }, [])

  // Añade este efecto para verificar periódicamente el estado de autenticación
  useEffect(() => {
    // Verificar el estado de autenticación cada segundo
    const interval = setInterval(async () => {
      try {
        const userData = await AsyncStorage.getItem("userData")
        setIsAuthenticated(!!userData)
      } catch (error) {
        console.error("Error checking authentication status:", error)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return <SplashScreen />
  }

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={isDarkMode ? darkColors.background : lightColors.background}
      />
      <NavigationContainer theme={isDarkMode ? customDarkTheme : customLightTheme}>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          {isAuthenticated ? (
            <RootStack.Screen name="MainApp" component={MainTabNavigator} />
          ) : (
            <RootStack.Screen name="Auth" component={AuthStackNavigator} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  )
}

// Main app with theme provider
export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
