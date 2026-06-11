import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAAp9EiLtdiDGz0SF_QYuYj7g_hbfx8Sb8', //esta es la configuracion de firebase de la web
  authDomain: 'weather-m7.firebaseapp.com',
  projectId: 'weather-m7',
  storageBucket: 'weather-m7.firebasestorage.app',
  messagingSenderId: '406733665456',
  appId: '1:406733665456:web:6477e9ce9053149614b775',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
