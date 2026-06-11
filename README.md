# Fotaza 2

## Descripción

Fotaza 2 es una aplicación web desarrollada como Trabajo Práctico Integrador para la materia Programación Web II.

La aplicación permite a los usuarios compartir fotografías, interactuar mediante comentarios y valoraciones, seguir a otros usuarios, recibir notificaciones, organizar contenido en colecciones y gestionar publicaciones dentro de una comunidad online.

El proyecto fue desarrollado utilizando Node.js, Express, Sequelize, PostgreSQL y Pug siguiendo una arquitectura MVC.

---

## Tecnologías utilizadas

* Node.js
* Express
* Sequelize
* PostgreSQL
* Pug
* Bootstrap
* Express Session
* bcrypt
* Sequelize CLI

---

## Funcionalidades implementadas

### Usuarios

* Registro de usuarios.
* Inicio y cierre de sesión.
* Edición de perfil.
* Visualización de perfiles públicos.

### Publicaciones

* Creación de publicaciones.
* Título y descripción.
* Etiquetas (Tags).
* Imágenes mediante URL.
* Indicador de copyright.

### Comentarios

* Comentar publicaciones.
* Cierre y apertura de comentarios por parte del autor.
* Visualización de comentarios.

### Valoraciones

* Valoración de publicaciones mediante estrellas.
* Cálculo automático del promedio.
* Visualización de cantidad de valoraciones.

### Seguimiento de usuarios

* Seguir usuarios.
* Dejar de seguir usuarios.
* Contador de seguidores.
* Contador de seguidos.
* Feed de publicaciones de usuarios seguidos.

### Notificaciones

* Notificaciones cuando:

  * Un usuario comienza a seguirte.
  * Se generan interacciones relevantes.

### Favoritos y colecciones

* Guardar publicaciones.
* Crear colecciones personalizadas.
* Organizar publicaciones guardadas.

### Intereses

* Marcar publicaciones con "Me interesa".
* Visualización de interesados por parte del autor.

### Búsqueda

* Búsqueda de publicaciones.
* Búsqueda mediante texto y etiquetas.

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/esteban1609/fotaza2
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear una base de datos PostgreSQL

Ejemplo:

```sql
CREATE DATABASE fotaza2;
```

### 4. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=fotaza2

PORT=3000

SESSION_SECRET=clave_secreta
```

### 5. Inicializar la base de datos

```bash
npm run db:init
```

Este comando:

* Crea las tablas necesarias.
* Ejecuta los seeders.
* Genera usuarios de prueba.

### 6. Ejecutar la aplicación

```bash
npm start
```

La aplicación quedará disponible en:

```txt
http://localhost:3000
```

---

## Usuarios de prueba

### Administrador

Email:

```txt
admin@fotaza.com
```

Contraseña:

```txt
admin123
```

### Usuario

Email:

```txt
usuario@fotaza.com
```

Contraseña:

```txt
12345678
```

---

## Estructura del proyecto

```txt
database/
│
├── db-init.js

seeders/
│
├── index.js
└── userSeeder.js

src/
│
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── views/
└── public/

app.js
package.json
```

---

## Endpoints principales

### Autenticación

| Método | Ruta | Descripción |
|----------|----------|----------|
| GET | /login | Formulario de inicio de sesión |
| POST | /login | Iniciar sesión |
| GET | /register | Formulario de registro |
| POST | /register | Registrar usuario |
| GET | /logout | Cerrar sesión |

### Publicaciones

| Método | Ruta | Descripción |
|----------|----------|----------|
| GET | / | Feed principal |
| GET | /posts/create | Formulario de creación |
| POST | /posts/create | Crear publicación |
| GET | /search | Buscar publicaciones |

### Comentarios

| Método | Ruta | Descripción |
|----------|----------|----------|
| POST | /comments/create/:postId | Crear comentario |

### Valoraciones

| Método | Ruta | Descripción |
|----------|----------|----------|
| POST | /ratings/create/:postId | Valorar publicación |

### Seguimiento

| Método | Ruta | Descripción |
|----------|----------|----------|
| POST | /follow/:userId | Seguir usuario |
| POST | /unfollow/:userId | Dejar de seguir usuario |
| GET | /following-posts | Feed de seguidos |

### Favoritos y colecciones

| Método | Ruta | Descripción |
|----------|----------|----------|
| GET | /favorites | Ver favoritos |
| POST | /favorites/:postId | Guardar favorito |
| POST | /favorites/remove/:postId | Quitar favorito |
| GET | /collections | Ver colecciones |
| POST | /collections/create | Crear colección |
| GET | /collections/:id | Ver colección |

### Intereses

| Método | Ruta | Descripción |
|----------|----------|----------|
| POST | /interest/:postId | Marcar interés |
| GET | /posts/:id/interests | Ver interesados |

### Perfil

| Método | Ruta | Descripción |
|----------|----------|----------|
| GET | /users/:id | Ver perfil |
| GET | /profile/edit | Editar perfil |
| POST | /profile/edit | Actualizar perfil |

### Notificaciones

| Método | Ruta | Descripción |
|----------|----------|----------|
| GET | /notifications | Ver notificaciones |

## Problemas encontrados durante el desarrollo

### Relaciones entre modelos

Uno de los principales desafíos fue la configuración de las relaciones entre entidades utilizando Sequelize. Fue necesario ajustar varias asociaciones para que funcionalidades como favoritos, colecciones y seguimiento de usuarios funcionaran correctamente.

### Sistema de seguimiento

La implementación de seguidores requirió validaciones para evitar seguimientos duplicados y asegurar que un usuario no pudiera seguirse a sí mismo.

### Manejo de sesiones

Durante el desarrollo surgieron inconvenientes relacionados con la actualización de datos del usuario en sesión luego de modificar el perfil. La solución consistió en actualizar también la información almacenada en la sesión para mantener sincronizados los datos visibles en la aplicación.

### Renderizado de vistas

Al reutilizar vistas entre distintos módulos aparecieron errores relacionados con variables no enviadas desde algunos controladores. Se realizaron ajustes para garantizar que cada vista recibiera toda la información necesaria.

### Gestión de dependencias

Durante las pruebas en diferentes equipos se detectaron dependencias que no se encontraban correctamente registradas en el proyecto. Se revisó la configuración del package.json para garantizar una instalación completa mediante npm install.

### Diseño de interfaz

Se realizaron mejoras progresivas sobre el feed principal, perfil de usuario y barra de navegación con el objetivo de mejorar la experiencia de uso y la organización visual de la información.

---

## Información adicional

La aplicación utiliza variables de entorno para la configuración del entorno de ejecución y la conexión con PostgreSQL.

Para facilitar las pruebas del sistema se incluyen usuarios generados automáticamente mediante seeders.

El proyecto fue desarrollado respetando la arquitectura MVC utilizando renderizado del lado del servidor mediante Pug.

---

## Autor

Esteban Barroso

Trabajo Práctico Integrador

Programación Web II
