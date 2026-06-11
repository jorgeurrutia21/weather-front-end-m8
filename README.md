# Weather-Front-End-M8

## Descripción

Aplicación web desarrollada con Vue 3 que permite consultar información meteorológica de distintas ciudades de Chile utilizando la API Open-Meteo.

La aplicación incorpora un sistema de autenticación de usuarios mediante Firebase Authentication y almacenamiento de datos en Firebase Firestore, permitiendo personalizar la experiencia de cada usuario mediante preferencias y gestión de lugares favoritos.

---

## Características principales

- Consulta de clima actual de ciudades de Chile.
- Pronóstico meteorológico para los próximos 7 días.
- Registro de usuarios.
- Inicio y cierre de sesión.
- Gestión de lugares favoritos.
- Preferencias de temperatura (Celsius o Fahrenheit).
- Persistencia de datos mediante Firebase Firestore.
- Protección de rutas para usuarios autenticados.
- Estado global administrado mediante Pinia.
- Navegación dinámica utilizando Vue Router.

---

## Sistema de autenticación

La aplicación utiliza Firebase Authentication para gestionar el acceso de usuarios.

Cada usuario registrado almacena la siguiente información en Firestore:

- UID generado por Firebase (identificador único).
- Nombre.
- Correo electrónico.
- Lista de lugares favoritos.
- Preferencia de temperatura.
- Fecha de registro.

Toda la información se sincroniza automáticamente al iniciar sesión.

---

## Funcionalidades por usuario

Una vez autenticado, cada usuario puede:

- Guardar ciudades como favoritas.
- Eliminar ciudades de favoritos.
- Visualizar únicamente sus propios favoritos.
- Configurar la unidad de temperatura:
  - Celsius (°C)
  - Fahrenheit (°F)

- Mantener sus preferencias almacenadas entre sesiones.

---

## Rutas de la aplicación

| Ruta       | Descripción                   |
| ---------- | ----------------------------- |
| /          | Página principal              |
| /lugar/:id | Detalle de una ciudad         |
| /about     | Información del proyecto      |
| /login     | Inicio de sesión              |
| /registro  | Registro de usuarios          |
| /favoritos | Lugares favoritos (protegida) |

---

## Protección de rutas

La ruta `/favoritos` requiere autenticación.

Si un usuario intenta acceder sin haber iniciado sesión, será redirigido automáticamente a una ruta pública.

---

## Tecnologías utilizadas

- Vue 3
- Vue Router
- Pinia
- Firebase Authentication
- Firebase Firestore
- Open-Meteo API
- Bootstrap
- Vite
- JavaScript

---

## Instalación y ejecución

### 1. Clonar el repositorio

git clone https://github.com/jorgeurrutia21/weather-front-end-m8.git

### 2. Ingresar al proyecto

cd weather-front-end-m8

### 3. Instalar dependencias

pnpm install

### 4. Ejecutar el proyecto

pnpm dev

### 5. Abrir en el navegador

http://localhost:5173

---

## Objetivo del proyecto

Desarrollar una aplicación web moderna utilizando Vue 3 que permita consultar información meteorológica de distintas ciudades de Chile, integrando autenticación de usuarios, almacenamiento en la nube y personalización de la experiencia mediante preferencias y gestión de favoritos.

---

## Autor

**Jorge Urrutia**
