import axios from "axios"

// Configuración base de axios
// Usa la IP de tu máquina en la red local o localhost para desarrollo
//const API_URL = "http://10.0.2.2:3000/api" // Para emulador Android (apunta a localhost de la máquina host)
//const API_URL = 'http://localhost:3000/api'; // Para desarrollo local
const API_URL = "http://192.168.1.5:3000/api" // Reemplaza con tu IP real para dispositivos físicos

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Servicios para equipos
export const equiposService = {
  // Obtener todos los equipos
  getAll: async () => {
    try {
      const response = await api.get("/equipo")
      return response.data
    } catch (error) {
      console.error("Error al obtener equipos:", error)
      throw error
    }
  },

  // Obtener un equipo por ID
  getById: async (id: string) => {
    try {
      const response = await api.get(`/equipo/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error al obtener equipo con ID ${id}:`, error)
      throw error
    }
  },

  // Crear un nuevo equipo
  create: async (equipoData: any) => {
    try {
      const response = await api.post("/equipo", equipoData)
      return response.data
    } catch (error) {
      console.error("Error al crear equipo:", error)
      throw error
    }
  },

  // Actualizar un equipo
  update: async (id: string, equipoData: any) => {
    try {
      const response = await api.put(`/equipo/${id}`, equipoData)
      return response.data
    } catch (error) {
      console.error(`Error al actualizar equipo con ID ${id}:`, error)
      throw error
    }
  },

  // Eliminar un equipo
  delete: async (id: string) => {
    try {
      const response = await api.delete(`/equipo/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error al eliminar equipo con ID ${id}:`, error)
      throw error
    }
  },
}

// Servicios para categorías
export const categoriasService = {
  getAll: async () => {
    try {
      const response = await api.get("/categoria")
      return response.data
    } catch (error) {
      console.error("Error al obtener categoría:", error)
      throw error
    }
  },

  getById: async (id: string) => {
    try {
      const response = await api.get(`/categoria/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error al obtener categoría con ID ${id}:`, error)
      throw error
    }
  },

  create: async (categoriaData: any) => {
    try {
      const response = await api.post("/categoria", categoriaData)
      return response.data
    } catch (error) {
      console.error("Error al crear categoría:", error)
      throw error
    }
  },

  update: async (id: string, categoriaData: any) => {
    try {
      const response = await api.put(`/categoria/${id}`, categoriaData)
      return response.data
    } catch (error) {
      console.error(`Error al actualizar categoría con ID ${id}:`, error)
      throw error
    }
  },

  delete: async (id: string) => {
    try {
      const response = await api.delete(`/categoria/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error al eliminar categoría con ID ${id}:`, error)
      throw error
    }
  },
}

// Servicios para mantenimientos
export const mantenimientosService = {
  getAll: async () => {
    try {
      const response = await api.get("/mantenimiento")
      return response.data
    } catch (error) {
      console.error("Error al obtener mantenimientos:", error)
      throw error
    }
  },

  getById: async (id: string) => {
    try {
      const response = await api.get(`/mantenimiento/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error al obtener mantenimiento con ID ${id}:`, error)
      throw error
    }
  },

  create: async (mantenimientoData: any) => {
    try {
      const response = await api.post("/mantenimiento", mantenimientoData)
      return response.data
    } catch (error) {
      console.error("Error al crear mantenimiento:", error)
      throw error
    }
  },

  update: async (id: string, mantenimientoData: any) => {
    try {
      const response = await api.put(`/mantenimiento/${id}`, mantenimientoData)
      return response.data
    } catch (error) {
      console.error(`Error al actualizar mantenimiento con ID ${id}:`, error)
      throw error
    }
  },

  delete: async (id: string) => {
    try {
      const response = await api.delete(`/mantenimiento/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error al eliminar mantenimiento con ID ${id}:`, error)
      throw error
    }
  },
}

// Servicios para préstamos
export const prestamosService = {
  getAll: async () => {
    try {
      const response = await api.get("/prestamo_equipo")
      return response.data
    } catch (error) {
      console.error("Error al obtener préstamos:", error)
      throw error
    }
  },

  getById: async (id: string) => {
    try {
      const response = await api.get(`/prestamo_equipo/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error al obtener préstamo con ID ${id}:`, error)
      throw error
    }
  },

  create: async (prestamoData: any) => {
    try {
      const response = await api.post("/prestamo_equipo", prestamoData)
      return response.data
    } catch (error) {
      console.error("Error al crear préstamo:", error)
      throw error
    }
  },

  update: async (id: string, prestamoData: any) => {
    try {
      const response = await api.put(`/prestamo_equipo/${id}`, prestamoData)
      return response.data
    } catch (error) {
      console.error(`Error al actualizar préstamo con ID ${id}:`, error)
      throw error
    }
  },

  delete: async (id: string) => {
    try {
      const response = await api.delete(`/prestamo_equipo/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error al eliminar préstamo con ID ${id}:`, error)
      throw error
    }
  },
}

// Servicios para usuarios
export const usuariosService = {
  getAll: async () => {
    try {
      const response = await api.get("/usuario")
      return response.data
    } catch (error) {
      console.error("Error al obtener usuarios:", error)
      throw error
    }
  },

  getById: async (id: string) => {
    try {
      const response = await api.get(`/usuario/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error al obtener usuario con ID ${id}:`, error)
      throw error
    }
  },

  create: async (usuarioData: any) => {
    try {
      const response = await api.post("/usuario", usuarioData)
      return response.data
    } catch (error) {
      console.error("Error al crear usuario:", error)
      throw error
    }
  },

  update: async (id: string, usuarioData: any) => {
    try {
      const response = await api.put(`/usuario/${id}`, usuarioData)
      return response.data
    } catch (error) {
      console.error(`Error al actualizar usuario con ID ${id}:`, error)
      throw error
    }
  },

  delete: async (id: string) => {
    try {
      const response = await api.delete(`/usuario/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error al eliminar usuario con ID ${id}:`, error)
      throw error
    }
  },

  login: async (credentials: { Usuario: string; Contraseña: string }) => {
    try {
      const response = await api.post("/usuario/login", credentials)
      return response.data
    } catch (error) {
      console.error("Error en el inicio de sesión:", error)
      throw error
    }
  },
}

// Servicios para ubicaciones
export const ubicacionesService = {
  getAll: async () => {
    try {
      const response = await api.get("/ubicacion")
      return response.data
    } catch (error) {
      console.error("Error al obtener ubicaciones:", error)
      throw error
    }
  },

  getById: async (id: string) => {
    try {
      const response = await api.get(`/ubicacion/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error al obtener ubicación con ID ${id}:`, error)
      throw error
    }
  },

  create: async (ubicacionData: any) => {
    try {
      const response = await api.post("/ubicacion", ubicacionData)
      return response.data
    } catch (error) {
      console.error("Error al crear ubicación:", error)
      throw error
    }
  },

  update: async (id: string, ubicacionData: any) => {
    try {
      const response = await api.put(`/ubicacion/${id}`, ubicacionData)
      return response.data
    } catch (error) {
      console.error(`Error al actualizar ubicación con ID ${id}:`, error)
      throw error
    }
  },

  delete: async (id: string) => {
    try {
      const response = await api.delete(`/ubicacion/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error al eliminar ubicación con ID ${id}:`, error)
      throw error
    }
  },
}

export default api

