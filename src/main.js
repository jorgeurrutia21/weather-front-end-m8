import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { auth, db } from '@/firebase/config'

import { onAuthStateChanged } from 'firebase/auth'

import { doc, getDoc } from 'firebase/firestore'

import { useAuthStore } from '@/stores/auth'

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
app.use(router)

const authStore = useAuthStore(pinia)

onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      const docRef = doc(db, 'usuarios', user.uid)

      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const datos = docSnap.data()

        authStore.setUserData({
          user: {
            uid: user.uid,
            email: user.email,
          },

          favoritos: datos.favoritos || [],

          preferencias: datos.preferencias || {
            temperatura: 'Celsius',
          },
        })
      } else {
        authStore.setUser({
          uid: user.uid,
          email: user.email,
        })
      }
    } catch (error) {
      console.error(error)
    }
  } else {
    authStore.clearUser()
  }
  authStore.setAuthReady(true)
})

app.mount('#app')
