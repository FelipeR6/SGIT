"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"

export type AlertType = "success" | "error" | "warning" | "info"

interface CustomAlertProps {
  visible: boolean
  type: AlertType
  title: string
  message: string
  onClose?: () => void
  autoClose?: boolean
  duration?: number
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  type,
  title,
  message,
  onClose,
  autoClose = true,
  duration = 3000,
}) => {
  const { isDarkMode } = useTheme()
  const [slideAnim] = useState(new Animated.Value(-100))
  const [opacityAnim] = useState(new Animated.Value(0))
  const [isVisible, setIsVisible] = useState(visible)

  useEffect(() => {
    if (visible) {
      setIsVisible(true)
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()

      if (autoClose) {
        const timer = setTimeout(() => {
          handleClose()
        }, duration)
        return () => clearTimeout(timer)
      }
    } else {
      handleClose()
    }
  }, [visible])

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsVisible(false)
      if (onClose) onClose()
    })
  }

  const getAlertStyle = () => {
    switch (type) {
      case "success":
        return {
          backgroundColor: isDarkMode ? "#0A5C36" : "#D4EDDA",
          iconName: "checkmark-circle",
          iconColor: isDarkMode ? "#4CAF50" : "#155724",
          textColor: isDarkMode ? "#FFFFFF" : "#155724",
        }
      case "error":
        return {
          backgroundColor: isDarkMode ? "#5C1A1A" : "#F8D7DA",
          iconName: "close-circle",
          iconColor: isDarkMode ? "#F44336" : "#721C24",
          textColor: isDarkMode ? "#FFFFFF" : "#721C24",
        }
      case "warning":
        return {
          backgroundColor: isDarkMode ? "#5C4D10" : "#FFF3CD",
          iconName: "warning",
          iconColor: isDarkMode ? "#FFC107" : "#856404",
          textColor: isDarkMode ? "#FFFFFF" : "#856404",
        }
      case "info":
      default:
        return {
          backgroundColor: isDarkMode ? "#1A3C5C" : "#D1ECF1",
          iconName: "information-circle",
          iconColor: isDarkMode ? "#2196F3" : "#0C5460",
          textColor: isDarkMode ? "#FFFFFF" : "#0C5460",
        }
    }
  }

  const alertStyle = getAlertStyle()

  if (!isVisible) return null

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
          backgroundColor: alertStyle.backgroundColor,
        },
      ]}
    >
      <View style={styles.content}>
        <Ionicons name={alertStyle.iconName as any} size={24} color={alertStyle.iconColor} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: alertStyle.textColor }]}>{title}</Text>
          <Text style={[styles.message, { color: alertStyle.textColor }]}>{message}</Text>
        </View>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Ionicons name="close" size={20} color={alertStyle.textColor} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  )
}

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    padding: 16,
    margin: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: width - 32,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
  },
  closeButton: {
    padding: 4,
  },
})

export default CustomAlert
