import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import type { RootStackParamList, RootTabParamList } from "./types/navigation"

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

const Tab = createBottomTabNavigator<RootTabParamList>()
const Stack = createNativeStackNavigator<RootStackParamList>()

// Stack navigators for each tab
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="HomeMain" component={HomeScreen} options={{ title: "Inicio" }} />
    <Stack.Screen name="EquipmentDetail" component={EquipmentDetailScreen} options={{ title: "Detalle de Equipo" }} />
    <Stack.Screen name="Users" component={UsersScreen} options={{ title: "Gestión de Usuarios" }} />
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
  </Stack.Navigator>
)

const LoansStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="LoansMain" component={LoansScreen} options={{ title: "Préstamos" }} />
    <Stack.Screen name="EquipmentDetail" component={EquipmentDetailScreen} options={{ title: "Detalle de Equipo" }} />
  </Stack.Navigator>
)

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ProfileMain" component={ProfileScreen} options={{ title: "Perfil" }} />
    <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: "Configuraciones" }} />
  </Stack.Navigator>
)

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
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
            tabBarActiveTintColor: "#007AFF",
            tabBarInactiveTintColor: "gray",
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
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

