Hecho por: Jeronimo A. Pineda Cano - 202212778

# 🌍 Parcial 2 - API de Planificación de Viajes

## 📋 Descripción

API REST desarrollada con **NestJS** que permite gestionar países y planes de viaje. La aplicación consume información de países desde la API externa [RestCountries ](https://restcountries.com/?spm=a2ty_o01.29997173.0.0.212dc921IEg9J1)y los almacena localmente como caché. Además, permite crear y gestionar planes de viaje asociados a países específicos.

---

## ✅ Características

* Módulo de gestión de países con caché local.
* Módulo de gestión de planes de viaje.
* Integración con API externa (RestCountries).
* Validación de datos con `class-validator`.
* Persistencia de datos con SQLite y TypeORM.

---

## 🛠️ Tecnologías Utilizadas

* **NestJS** (Framework Node.js)
* **TypeORM** (ORM para base de datos)
* **SQLite** (Base de datos local)
* **class-validator** (Validación de DTOs)
* **RestCountries API** (Fuente de datos de países)

---

## 🚀 Instalación y Ejecución

### Requisitos previos

* Node.js (v16 o superior)
* npm

### Pasos

1. Clona este repositorio:

   ```bash
   git clone https://github.com/PierreZerker/Parcial-2-TravelPlannerAPI
   ```
2. Instala las dependencias:

   ```bash
   npm install
   ```
3. Inicia la aplicación:

   ```bash
   npm run start
   ```

La API estará disponible en: `http://localhost:3000`

---

## 📁 Estructura del Proyecto

src/

├── countries/              # Módulo de países

│   ├── entities/

│   ├── services/

│   ├── controllers/

│   └── interfaces/

├── travel-plans/           # Módulo de planes de viaje

│   ├── entities/

│   ├── dto/

│   ├── services/

│   └── controllers/

└── app.module.ts

---

## 📊 Modelo de Datos

### 🌏 País (`Country`)

| CAMPO          | TIPO   | DESCRIPCIÓN                                            |
| -------------- | ------ | ------------------------------------------------------- |
| `alpha3Code` | String | Código del país en formato alpha-3 (ej. "COL", "ESP") |
| `name`       | String | Nombre del país                                        |
| `region`     | String | Región geográfica                                     |
| `subregion`  | String | Subregión geográfica                                  |
| `capital`    | String | Capital del país                                       |
| `population` | BigInt | Población del país                                    |
| `flag`       | String | URL de la bandera del país                             |
| `createdAt`  | Date   | Fecha de creación en la base de datos                  |
| `updatedAt`  | Date   | Fecha de última actualización                         |

### ✈️ Plan de Viaje (`TravelPlan`)

| CAMPO                 | TIPO              | DESCRIPCIÓN                          |
| --------------------- | ----------------- | ------------------------------------- |
| `id`                | Number            | Identificador único del plan         |
| `countryAlpha3Code` | String            | Código del país destino (ej. "ESP") |
| `title`             | String            | Título del viaje                     |
| `startDate`         | Date              | Fecha de inicio del viaje             |
| `endDate`           | Date              | Fecha de fin del viaje                |
| `notes`             | String (opcional) | Notas o comentarios del viaje         |
| `createdAt`         | Date              | Fecha de creación del plan           |

---

## 🌐 Endpoints

### 🌏 Módulo de Países (`/countries`)

* `GET /countries`
  Lista todos los países almacenados en la base de datos.
* `GET /countries/:alpha3Code`
  Consulta un país por su código alpha-3.
  * Si el país no está en caché, lo obtiene de la API externa, lo guarda y lo devuelve (`source: "api"`).
  * Si ya está en caché, lo devuelve directamente (`source: "cache"`).

### ✈️ Módulo de Planes de Viaje (`/travel-plans`)

* `POST /travel-plans`
  Crea un nuevo plan de viaje.

  ```json
  {
  	"countryAlpha3Code": "ESP",
  	"title": "Vacaciones en España",
  	"startDate": "2025-06-01",
  	"endDate": "2025-06-10",
  	"notes": "Visitar Madrid y Barcelona"
  }
  ```
* `GET /travel-plans`
  Lista todos los planes de viaje.
* `GET /travel-plans/:id`
  Consulta un plan de viaje por su ID.

---

## 🧪 Pruebas de la API con Postman o Thunder Client

Puedes probar manualmente cada uno de los endpoints de la API usando herramientas como **Postman** o  **Thunder Client** . A continuación se detallan las pruebas sugeridas:

#### 🔍 1. Consultar un país por código (`GET /countries/:alpha3Code`)

* **Ruta** : `GET /countries/COL`
* **Acción** : Consulta el país Colombia.
* **Resultado esperado** :
* Primera vez: País obtenido desde la API externa (`source: "api"`).
* Segunda vez: País obtenido desde la caché local (`source: "cache"`).

#### 📋 2. Listar todos los países (`GET /countries`)

* **Ruta** : `GET /countries`
* **Acción** : Lista todos los países almacenados en la base de datos.
* **Resultado esperado** : Lista de países con sus atributos definidos.

#### ✈️ 3. Crear un plan de viaje (`POST /travel-plans`)

* **Ruta** : `POST /travel-plans`
* **Cuerpo (JSON)** :
  ```json
  {
  	"countryAlpha3Code": "ESP",
  	"title": "Vacaciones en España",
  	"startDate": "2025-06-01",
  	"endDate": "2025-06-10",
  	"notes": "Visitar Madrid y Barcelona"
  }
  ```
* **Resultado esperado** : El plan de viaje es creado y devuelto con un ID.

#### 📋 4. Listar todos los planes de viaje (`GET /travel-plans`)

* **Ruta** : `GET /travel-plans`
* **Acción** : Lista todos los planes de viaje guardados.
* **Resultado esperado** : Lista de planes con sus datos.

#### 🔍 5. Obtener un plan de viaje por ID (`GET /travel-plans/:id`)

* **Ruta** : `GET /travel-plans/1`
* **Acción** : Consulta un plan específico por su ID.
* **Resultado esperado** : El plan de viaje con ID 1.

#### ❌ 6. Consultar un país inexistente (`GET /countries/XXX`)

* **Ruta** : `GET /countries/XXX`
* **Acción** : Intenta consultar un país que no existe.
* **Resultado esperado** : Error 500 con mensaje de error.

---

## 🔐 Extensión de la API

### 🔑 Endpoint protegido

Se ha añadido un endpoint para eliminar países de la caché:

* `DELETE /countries/:alpha3Code`

Este endpoint está protegido mediante un **guard de autorización** que verifica la presencia de un header `Authorization: Bearer 12345`. Solo se permite la operación si el token es correcto.

Además,  **no se permite eliminar un país si tiene planes de viaje asociados** .

### 🧾 Middleware de logging

Se ha implementado un middleware global que registra cada solicitud a las rutas `/countries` y `/travel-plans`. El log incluye:

* Método HTTP (`GET`, `POST`, `DELETE`, etc.)
* Ruta solicitada
* Código de estado de la respuesta
* Tiempo total de procesamiento

Los logs se imprimen en consola.

---

## 🧪 Validación y Pruebas de la Extensión

### 🔑 Cómo validar el endpoint protegido y el guard

El endpoint `DELETE /countries/:alpha3Code` está protegido por un **guard de autorización** que requiere un token válido en el header.

#### Prueba 1: Eliminar país sin token (debe fallar)

* **Ruta**: `DELETE /countries/COL`
* **Headers**: Ninguno
* **Resultado esperado**:
  * Status: `401 Unauthorized`
  * Mensaje: `"Token de autorización no proporcionado"`

#### Prueba 2: Eliminar país con token inválido (debe fallar)

* **Ruta**: `DELETE /countries/COL`
* **Headers**: `Authorization: Bearer token_invalido`
* **Resultado esperado**:
  * Status: `401 Unauthorized`
  * Mensaje: `"Token de autorización inválido"`

#### Prueba 3: Eliminar país con token válido (debe funcionar)

* **Ruta**: `DELETE /countries/COL`
* **Headers**: `Authorization: Bearer 12345`
* **Resultado esperado**:
  * Status: `200 OK`
  * Mensaje: `"País COL eliminado correctamente."`

#### Prueba 4: Eliminar país que no existe (debe fallar)

* **Ruta**: `DELETE /countries/XXX`
* **Headers**: `Authorization: Bearer 12345`
* **Resultado esperado**:
  * Status: `404 Not Found`
  * Mensaje: `"País no encontrado en la caché"`

#### Prueba 5: Eliminar país con planes de viaje asociados (debe fallar)

1. Primero crear un plan de viaje para un país (ej: ESP):

   ```bash
   POST /travel-plans
   {
     "countryAlpha3Code": "ESP",
     "title": "Viaje a España",
     "startDate": "2025-06-01",
     "endDate": "2025-06-10"
   }
   ```
2. Intentar eliminar el país:

   * **Ruta**: `DELETE /countries/ESP`
   * **Headers**: `Authorization: Bearer 12345`
   * **Resultado esperado**:
     * Status: `403 Forbidden`
     * Mensaje: `"No se puede eliminar el país porque tiene planes de viaje asociados."`

### 🧾 Cómo validar el middleware de logging

El middleware registra automáticamente todas las peticiones a las rutas `/countries` y `/travel-plans`.

#### Prueba del middleware:

1. Realizar cualquier petición a las rutas protegidas:

   ```bash
   GET /countries
   GET /travel-plans
   POST /travel-plans
   DELETE /countries/COL (con token válido)
   ```
2. **Revisar la consola** donde se ejecuta la aplicación NestJS. Deberías ver logs como:

   ```
   GET /countries 200 - 45ms
   GET /travel-plans 200 - 23ms
   POST /travel-plans 201 - 67ms
   DELETE /countries/COL 200 - 89ms
   ```
3. **Verificar que el log incluye**:

   - ✅ Método HTTP (`GET`, `POST`, `DELETE`)
   - ✅ Ruta solicitada (/countries, /travel-plans, etc.)
   - ✅ Código de estado de respuesta (200, 201, 404, etc.)
   - ✅ Tiempo de procesamiento en milisegundos

#### Nota importante:

El middleware funciona para **todas las rutas** que comienzan con `/countries` o `/travel-plans`, incluyendo:

* `/countries`
* `/countries/COL`
* `/travel-plans`
* `/travel-plans/1`
