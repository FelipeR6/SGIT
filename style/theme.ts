import { StyleSheet } from "react-native"

// Colores para el tema claro
export const lightColors = {
  background: "#F5F5F5",
  card: "#FFFFFF",
  text: "#333333",
  textSecondary: "#666666",
  border: "#E0E0E0",
  primary: "#007AFF",
  success: "#4CAF50",
  warning: "#FFC107",
  danger: "#F44336",
  info: "#2196F3",
  inputBackground: "#FFFFFF",
  statusBar: "dark-content",
  tabBar: "#FFFFFF",
  tabBarInactive: "gray",
}

// Colores para el tema oscuro
export const darkColors = {
  background: "#121212",
  card: "#1E1E1E",
  text: "#FFFFFF",
  textSecondary: "#AAAAAA",
  border: "#333333",
  primary: "#0A84FF",
  success: "#32D74B",
  warning: "#FFD60A",
  danger: "#FF453A",
  info: "#64D2FF",
  inputBackground: "#2C2C2C",
  statusBar: "light-content",
  tabBar: "#1E1E1E",
  tabBarInactive: "#777777",
}

// Función para crear estilos basados en el tema
export const createThemedStyles = (isDark: boolean) => {
  const colors = isDark ? darkColors : lightColors

  return {
    colors,

    // Estilos comunes que se pueden reutilizar en toda la aplicación
    common: StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: colors.background,
      },
      card: {
        backgroundColor: colors.card,
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        shadowColor: isDark ? "#000000" : "#000000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: isDark ? 0.3 : 0.1,
        shadowRadius: 2,
        elevation: 2,
      },
      title: {
        fontSize: 24,
        fontWeight: "bold",
        color: colors.text,
        marginBottom: 8,
      },
      subtitle: {
        fontSize: 16,
        color: colors.textSecondary,
        marginBottom: 16,
      },
      inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.inputBackground,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderWidth: 1,
        borderColor: colors.border,
      },
      input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: colors.text,
      },
      button: {
        backgroundColor: colors.primary,
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: "center",
      },
      buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
      },
      errorContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: isDark ? "rgba(255, 69, 58, 0.2)" : "#FFEEEE",
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
      },
      errorText: {
        color: colors.danger,
        marginLeft: 8,
        flex: 1,
      },
    }),
  }
}
