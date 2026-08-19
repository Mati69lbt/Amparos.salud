### Spec: Integración de Firestore, captura de leads y Panel CRM oculto (CRUD)

#### 1. Objetivo General

Conectar la aplicación con **Firebase Firestore** para:

1. Persistir automáticamente las consultas enviadas a través del formulario de contacto.
2. Implementar un panel CRM oculto en la ruta `/clientes` con operaciones CRUD completas (Crear, Leer, Actualizar, Eliminar) para administrar los registros de las consultas/clientes.

---

#### 2. Configuración e Integración con Firebase

1. **Instalación y Setup:**

- Configurar e inicializar el SDK de Firebase (`firebase/app` y `firebase/firestore`).
- Almacenar las credenciales de la API de Firebase en variables de entorno (`.env.local`).

2. **Estructura de la Colección en Firestore (`contacts` o `leads`):**
   Cada documento debe almacenar la siguiente estructura mínima:

- `id`: (string) Generado automáticamente por Firestore.
- `name`: (string) Nombre del contacto.
- `email`: (string) Correo electrónico.
- `phone`: (string, opcional) Teléfono.
- `message`: (string) Mensaje o consulta.
- `status`: (string) Estado del lead (ej. `"Nuevo"`, `"En Proceso"`, `"Contactado"`, `"Cerrado"`). Valor por defecto: `"Nuevo"`.
- `createdAt`: (timestamp) Fecha y hora de envío.
- `updatedAt`: (timestamp) Fecha de última modificación.

---

#### 3. Captura de Datos (Formulario de Contacto)

- Modificar el handler de envío del formulario de la landing/página actual.
- Al presionar "Enviar", además de la acción actual (ej. enviar mail o notificación), ejecutar la función para insertar el documento en la colección de Firestore.
- Manejar estados de carga (_loading_) y feedback visual de éxito/error para el usuario.

---

#### 4. Panel CRM Oculto (`/clientes`)

1. **Acceso y Seguridad Básica:**

- Crear la ruta discreta `/clientes`.
- La ruta **no** debe figurar en ningún menú de navegación, header, footer ni sitemap.
- _Opcional:_ Agregar un aviso o bloqueo de indexación en los robots/meta tags para esta ruta específica (`noindex, nofollow`).

2. **Funcionalidades del CRUD en `/clientes`:**

- **Read (Lectura):**
- Tabla interactiva que liste todos los contactos/leads recuperados en tiempo real o mediante consulta desde Firestore.
- Ordenar por `createdAt` descendente (los más recientes primero).
- Filtros o búsqueda rápida por nombre, email o estado (`status`).

- **Create (Creación manual):**
- Botón o modal para agregar un cliente/lead de forma manual sin pasar por el formulario público.

- **Update (Edición):**
- Permitir cambiar el estado del cliente (`Nuevo`, `Contactado`, etc.) y editar sus datos personales o agregar notas internas.

- **Delete (Eliminación):**
- Botón para eliminar un registro con confirmación previa.

---

#### 5. Entregables Esperados

- Archivo de configuración de Firebase (`firebase.js` / `firebase.ts`).
- Servicios/Funciones helpers para la interacción con Firestore (`addLead`, `getLeads`, `updateLead`, `deleteLead`).
- Componente del formulario actualizado.
- Vista/Página `/clientes` con la interfaz del CRM y sus acciones CRUD funcionales.
