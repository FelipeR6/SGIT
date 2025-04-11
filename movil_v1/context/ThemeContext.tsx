"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"
import { useColorScheme } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

// Definir los tipos para nuestro contexto
type ThemeType = "light" | "dark"

interface ThemeContextType {
  theme: ThemeType
  isDarkMode: boolean
  toggleTheme: () => void
  setTheme: (theme: ThemeType) => void
}

// Crear el contexto
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Proveedor del contexto
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Obtener el esquema de color del sistema
  const systemColorScheme = useColorScheme()

  // Estado para el tema actual
  const [theme, setTheme] = useState<ThemeType>("light")

  // Cargar el tema guardado al iniciar
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("theme")
        if (savedTheme === "dark" || savedTheme === "light") {
          setTheme(savedTheme)
        } else if (systemColorScheme) {
          // Si no hay tema guardado, usar el del sistema
          setTheme(systemColorScheme)
        }
      } catch (error) {
        console.error("Error al cargar el tema:", error)
      }
    }

    loadTheme()
  }, [systemColorScheme])

  // Función para cambiar entre temas
  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    try {
      await AsyncStorage.setItem("theme", newTheme)
    } catch (error) {
      console.error("Error al guardar el tema:", error)
    }
  }

  // Función para establecer un tema específico
  const setThemeAndSave = async (newTheme: ThemeType) => {
    setTheme(newTheme)
    try {
      await AsyncStorage.setItem("theme", newTheme)
    } catch (error) {
      console.error("Error al guardar el tema:", error)
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDarkMode: theme === "dark",
        toggleTheme,
        setTheme: setThemeAndSave,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

// Hook personalizado para usar el contexto
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme debe ser usado dentro de un ThemeProvider")
  }
  return context
}
