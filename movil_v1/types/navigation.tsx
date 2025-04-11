import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import type { CompositeNavigationProp, RouteProp } from "@react-navigation/native"

// Definir los parámetros para cada ruta
export type RootStackParamList = {
  HomeMain: undefined
  InventoryMain: undefined
  MaintenanceMain: undefined
  LoansMain: undefined
  ProfileMain: undefined
  EquipmentDetail: { itemId: string; tab?: string }
  Users: undefined
  Locations: undefined
  Reports: undefined
  Settings: undefined
  LocationForm: { locationId?: string }
  MaintenanceForm: { maintenanceId?: string }
  LoanForm: { loanId?: string }
  UserForm: { userId?: string }
}

// Definir los parámetros para el navegador de pestañas
export type RootTabParamList = {
  Home: undefined
  Inventory: undefined
  Maintenance: undefined
  Loans: undefined
  Profile: undefined
}

// Definir los parámetros para el stack de autenticación
export type AuthStackParamList = {
  Login: undefined
  Register: undefined
}

// Tipo de navegación compuesto para las pantallas dentro de las pestañas
export type ScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, keyof RootStackParamList>,
  BottomTabNavigationProp<RootTabParamList>
>

// Tipo para las props de ruta
export type ScreenRouteProp<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>

// Interfaces para las props de cada pantalla
export interface ScreenProps {
  navigation: ScreenNavigationProp
}

export interface RouteScreenProps<T extends keyof RootStackParamList> {
  navigation: ScreenNavigationProp
  route: ScreenRouteProp<T>
}

// Tipo para la navegación de autenticación
export type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>

// Interface para las props de pantallas de autenticación
export interface AuthScreenProps {
  navigation: AuthNavigationProp
  setIsAuthenticated?: (value: boolean) => void
}
