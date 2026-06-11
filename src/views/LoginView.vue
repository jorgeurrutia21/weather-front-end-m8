<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow">
          <div class="card-body">
            <h2 class="text-center mb-2">🌤 Bienvenido</h2>

            <p class="text-center text-light mb-4">
              Ingresa para acceder a tus ciudades favoritas.
            </p>

            <form @submit.prevent="login">
              <div class="mb-3">
                <label class="form-label"> Correo </label>

                <input
                  v-model="email"
                  type="email"
                  class="form-control"
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label"> Contraseña </label>

                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  placeholder="********"
                  required
                />
              </div>
              <button type="submit" class="btn-login w-100">Ingresar</button>
            </form>

            <div v-if="error" class="alert alert-danger mt-3">
              {{ error }}
            </div>

            <div class="text-center mt-3">
              <router-link to="/registro" class="link-login">
                ¿No Tienes Cuenta? Regístrate Aquí
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { auth, db } from '@/firebase/config'
import { doc, getDoc } from 'firebase/firestore'

import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')

async function login() {
  error.value = ''

  try {
    const credenciales = await signInWithEmailAndPassword(auth, email.value, password.value)

    const ref = doc(db, 'usuarios', credenciales.user.uid) //trae los datos de los usuarios de firestore
    const snap = await getDoc(ref)

    if (snap.exists()) {
      const data = snap.data()

      authStore.setUserData({
        user: {
          uid: credenciales.user.uid,
          email: credenciales.user.email,
        },
        favoritos: data.favoritos || [],
        preferencias: data.preferencias || {
          temperatura: 'Celsius',
        },
      })
    } else {
      authStore.setUser({
        uid: credenciales.user.uid,
        email: credenciales.user.email,
      })
    }

    router.push('/') //redirigue al home
  } catch (err) {
    error.value = 'Usuario o contraseña incorrectos'
    console.error(err)
  }
}
</script>

<style scoped>
.card {
  border: none;
  border-radius: 18px;
  background: rgba(98, 131, 174, 0.95);
  backdrop-filter: blur(8px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
}

h2 {
  color: #ffffff;
  font-weight: 700;
}

.form-label {
  color: white;
  font-weight: 600;
}

.form-control {
  border-radius: 10px;
  padding: 12px;
  border: none;
}

.form-control:focus {
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
}

.btn-login {
  background: #0d6efd;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-login:hover {
  background: #0b5ed7;
  transform: translateY(-2px);
}

.link-login {
  color: white;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.link-login:hover {
  color: #dbe7ff;
  text-decoration: underline;
}
</style>
