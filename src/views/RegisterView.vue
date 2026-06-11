<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow">
          <div class="card-body">
            <h2 class="text-center mb-2">🌤 Crear Cuenta</h2>

            <p class="text-center text-light mb-4">
              Regístrate para guardar tus ciudades favoritas.
            </p>

            <form @submit.prevent="register">
              <div class="mb-3">
                <label class="form-label"> Nombre </label>

                <input
                  v-model="nombre"
                  type="text"
                  class="form-control"
                  placeholder="Ingrese su nombre"
                  required
                />
              </div>

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
                  placeholder="Mínimo 6 caracteres"
                  required
                />
              </div>

              <button type="submit" class="btn btn-primary w-100">Registrarse</button>
            </form>

            <div v-if="error" class="alert alert-danger mt-3">
              {{ error }}
            </div>

            <div v-if="success" class="alert alert-success mt-3">
              {{ success }}
            </div>

            <div class="text-center mt-3">
              <router-link to="/login" class="link-login">¿Tienes Cuenta?, Clic Aquí </router-link>
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

import { createUserWithEmailAndPassword } from 'firebase/auth'

import { doc, setDoc } from 'firebase/firestore'

import { auth, db } from '@/firebase/config'

const router = useRouter()

const nombre = ref('')
const email = ref('')
const password = ref('')

const error = ref('')
const success = ref('')

async function register() {
  error.value = ''
  success.value = ''

  try {
    const credenciales = await createUserWithEmailAndPassword(auth, email.value, password.value)

    const uid = credenciales.user.uid

    await setDoc(doc(db, 'usuarios', uid), {
      uid,
      nombre: nombre.value,
      email: email.value,

      favoritos: [],

      preferencias: {
        temperatura: 'Celsius',
      },

      fechaRegistro: new Date().toISOString(),
    })

    success.value = 'Usuario registrado correctamente'

    nombre.value = ''
    email.value = ''
    password.value = ''

    setTimeout(() => {
      router.push('/login')
    }, 1500)
  } catch (err) {
    console.error(err)

    switch (err.code) {
      case 'auth/email-already-in-use':
        error.value = 'Este correo ya está registrado'
        break

      case 'auth/weak-password':
        error.value = 'La contraseña debe tener al menos 6 caracteres'
        break

      case 'auth/invalid-email':
        error.value = 'Correo electrónico inválido'
        break

      default:
        error.value = 'Error al registrar usuario'
    }
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

.form-control {
  border-radius: 10px;
  padding: 12px;
  border: none;
}

.form-control:focus {
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
}
</style>
