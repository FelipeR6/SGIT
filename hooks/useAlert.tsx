"use client"

import { useState, useCallback } from "react"
import type { AlertType } from "../components/CustomAlert"

interface AlertOptions {
  title: string
  message: string
  type: AlertType
  autoClose?: boolean
  duration?: number
}

export const useAlert = () => {
  const [alertVisible, setAlertVisible] = useState(false)
  const [alertConfig, setAlertConfig] = useState<AlertOptions>({
    title: "",
    message: "",
    type: "info",
    autoClose: true,
    duration: 3000,
  })

  const showAlert = useCallback((options: AlertOptions) => {
    setAlertConfig(options)
    setAlertVisible(true)
  }, [])

  const hideAlert = useCallback(() => {
    setAlertVisible(false)
  }, [])

  const showSuccess = useCallback(
    (title: string, message: string, autoClose = true, duration = 3000) => {
      showAlert({ title, message, type: "success", autoClose, duration })
    },
    [showAlert],
  )

  const showError = useCallback(
    (title: string, message: string, autoClose = true, duration = 3000) => {
      showAlert({ title, message, type: "error", autoClose, duration })
    },
    [showAlert],
  )

  const showWarning = useCallback(
    (title: string, message: string, autoClose = true, duration = 3000) => {
      showAlert({ title, message, type: "warning", autoClose, duration })
    },
    [showAlert],
  )

  const showInfo = useCallback(
    (title: string, message: string, autoClose = true, duration = 3000) => {
      showAlert({ title, message, type: "info", autoClose, duration })
    },
    [showAlert],
  )

  return {
    alertVisible,
    alertConfig,
    showAlert,
    hideAlert,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  }
}
