import { StyleSheet } from "react-native"
import { lightColors, darkColors } from "./colors"

export const createThemedScreenStyles = (isDarkMode: boolean) => {
  const colors = isDarkMode ? darkColors : lightColors

  return StyleSheet.create({
    container: {
      backgroundColor: colors.background,
    },
    card: {
      backgroundColor: colors.card,
      borderColor: colors.border,
    },
    text: {
      color: colors.text,
    },
    textSecondary: {
      color: colors.textSecondary,
    },
    searchContainer: {
      backgroundColor: colors.card,
      borderColor: colors.border,
    },
    searchInput: {
      color: colors.text,
    },
    formContainer: {
      backgroundColor: colors.card,
    },
    formGroup: {
      borderColor: colors.border,
    },
    label: {
      color: colors.text,
    },
    input: {
      color: colors.text,
      backgroundColor: isDarkMode ? "#1C1C1E" : "#F9F9F9",
    },
    inputContainer: {
      backgroundColor: isDarkMode ? "#1C1C1E" : "#F9F9F9",
      borderColor: colors.border,
    },
    scrollContainer: {
      backgroundColor: colors.background,
    },
  })
}
