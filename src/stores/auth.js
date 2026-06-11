import { defineStore } from 'pinia'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    authReady: false,

    favoritos: [],

    preferencias: {
      temperatura: 'Celsius',
    },
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    setAuthReady(value) {
      this.authReady = value
    },

    setUser(user) {
      this.user = user
    },

    setUserData(data) {
      this.user = data.user
      this.favoritos = data.favoritos || []
      this.preferencias = data.preferencias || {
        temperatura: 'Celsius',
      }
    },

    clearUser() {
      this.user = null
      this.favoritos = []
      this.preferencias = {
        temperatura: 'Celsius',
      }
    },

    async agregarFavorito(ciudad) {
      const existe = this.favoritos.find((item) => item.id === ciudad.id) //la seccion favoritos la llama y la guarda con elusuario

      if (!existe) {
        this.favoritos.push(ciudad)

        await this.guardarEnFirebase()
      }
    },

    async eliminarFavorito(id) {
      this.favoritos = this.favoritos.filter((item) => item.id !== id)

      await this.guardarEnFirebase()
    },

    cambiarTemperatura(unidad) {
      this.preferencias.temperatura = unidad //para cambiar la unidad de celsius o farenheit

      this.guardarEnFirebase()
    },

    async guardarEnFirebase() {
      if (!this.user) return //funcion para guardadr en firestor los favoritos y las preferencias del usuario

      try {
        const userRef = doc(db, 'usuarios', this.user.uid)

        await updateDoc(userRef, {
          favoritos: this.favoritos,
          preferencias: this.preferencias,
        })
      } catch (error) {
        console.error('Error guardando en Firebase:', error)
      }
    },
  },
})
