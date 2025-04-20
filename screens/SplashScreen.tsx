import type React from "react"
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const SplashScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={require("../assets/logo.png")} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Sistema de Gestión de Inventario Tecnologico</Text>
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      </View>
      <Text style={styles.version}>Versión 1.0.0</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
    marginBottom: 30,
  },
  loader: {
    marginTop: 20,
  },
  version: {
    position: "absolute",
    bottom: 20,
    fontSize: 14,
    color: "#666666",
  },
})

export default SplashScreen

