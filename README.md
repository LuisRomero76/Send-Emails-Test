# Tienda Online - Prueba Técnica

## Descripción

Aunque la propuesta inicial contemplaba trabajar con productos estáticos, decidí ir más allá implementando una solución completa que incluye:

- **Base de datos PostgreSQL** en contenedor Docker
- **API REST** con NestJS para gestión de productos y compras
- **Frontend** interactivo con React + Vite + Tailwind CSS
- **Sistema de emails** para confirmación de compras

## Tecnologías Utilizadas

### Backend
- NestJS
- TypeORM
- PostgreSQL
- Nodemailer
- Docker

### Frontend
- React
- Vite
- Tailwind CSS 4
- Axios

## Requisitos Previos

- Node.js 18+
- pnpm
- Docker y Docker Compose

## Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/LuisRomero76/engaged_tech.git
cd engaged_tech
```

### 2. Configurar la Base de Datos (Docker)

```bash
# Levantar el contenedor de PostgreSQL
docker-compose up -d
```

### 3. Configurar el Backend (API)

```bash
cd api

# Instalar dependencias
pnpm install

# Configurar variables de entorno
# Crear archivo .env con las siguientes variables:
```

**.env** (ejemplo):
```env
DB_HOST=localhost
DB_PORT=5433
DB_USERNAME=root
DB_PASSWORD=root
DB_DATABASE=engaged_db

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=tu-email@gmail.com
MAIL_PASS=tu-contraseña-de-aplicación
```

# Iniciar el servidor
```bash
pnpm run start:dev
```

La API estará disponible en: `http://localhost:3000`

### 4. Configurar el Frontend (App)

```bash
cd app

# Instalar dependencias
pnpm install

# Configurar variables de entorno
# Crear archivo .env con:
```

**.env**:
```env
VITE_API_URL=http://localhost:3000
```

```bash
# Iniciar la aplicación
pnpm dev
```

La aplicación estará disponible en: `http://localhost:5173`

## 🎯 Funcionalidades

### ✅ Ver Productos
Visualización de todos los productos disponibles en la base de datos con su nombre y precio.

![alt text](/screenshots/productos.png)

### ✅ Crear Productos
Formulario modal para agregar nuevos productos a la base de datos (nombre y precio).

![alt text](/screenshots/createProducts.png)

### ✅ Realizar Compra
Proceso de compra donde el usuario ingresa sus datos (nombre, apellido, teléfono, email) y selecciona el producto.

![alt text](/screenshots/compra.png)

### ✅ Confirmación por Email
Envío automático de un correo electrónico estructurado con los datos del cliente y del producto comprado.

![Email de Confirmación](/screenshots/email.png)

<!-- ## 📁 Estructura del Proyecto

```
prueba-engagedtech/
├── api/                    # Backend NestJS
│   ├── src/
│   │   ├── compra/        # Módulo de compras
│   │   ├── mail/          # Servicio de emails
│   │   ├── products/      # Módulo de productos
│   │   └── main.ts
│   └── package.json
├── app/                    # Frontend React
│   ├── src/
│   │   ├── components/    # Componentes reutilizables
│   │   ├── pages/         # Páginas principales
│   │   ├── services/      # Servicios API
│   │   └── App.jsx
│   └── package.json
└── docker-compose.yml      # Configuración PostgreSQL
``` -->

## 🔄 Flujo de la Aplicación

1. **Ver Productos**: El usuario accede y ve todos los productos disponibles
2. **Crear Producto**: Opcionalmente, puede crear nuevos productos
3. **Seleccionar Producto**: Click en "Comprar" para ir al formulario
4. **Completar Datos**: Ingresa nombre, apellido, teléfono y email
5. **Confirmar Compra**: Se envía la información al backend
6. **Email Automático**: El cliente recibe confirmación por correo

## 📧 Configuración de Email

Para que el envío de emails funcione correctamente:

1. Usar una cuenta de Gmail
2. Activar **verificación en 2 pasos**
3. Generar una **contraseña de aplicación**
4. Usar esa contraseña en `MAIL_PASS`

## 📝 Notas Adicionales

- Los productos se almacenan en PostgreSQL de forma persistente
- El sistema de emails usa Nodemailer con plantillas HTML personalizadas
- La interfaz es completamente responsiva gracias a Tailwind CSS
- Se implementó validación de datos tanto en frontend como backend
