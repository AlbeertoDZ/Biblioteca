# Biblioteca
# 📚 NYT Book Lists Explorer

Explora las listas de libros más populares del *New York Times* de forma interactiva, responsiva y sin frameworks externos. Este proyecto se desarrolló como un ejercicio para practicar manipulación del DOM, asincronía, y buenas prácticas de desarrollo frontend moderno.

---

## 🚀 Características del proyecto

- ✅ Manipulación dinámica del DOM.
- ✅ Uso de ES6+ (destructuring, arrow functions, módulos, etc.).
- ✅ Carga y manejo de datos asíncronos usando `fetch`.
- ✅ Animación de carga mientras se obtienen los datos.
- ✅ Navegación entre listas y detalles de libros sin recargar la página.
- ✅ Interfaz responsive *mobile-first*.
- ✅ HTML5 semántico.
- ✅ Sin frameworks ni librerías externas (salvo APIs públicas).
- ✅ Proyecto gestionado desde el inicio con Git y ramas.
- ✅ Código limpio y estructurado, siguiendo buenas prácticas.
- ✅ Filtros y ordenamientos avanzados.

---

## 🗂 Estructura de la App

### Vista inicial
Al cargar la web:

- Se muestra un *loader animado* hasta que los datos estén listos.
- Se listan todas las listas disponibles con:
  - Nombre completo
  - Fecha del libro más antiguo
  - Fecha del libro más reciente
  - Frecuencia de actualización
  - Botón para ver detalles

### Vista detalle de lista

- Botón para volver a la vista inicial.
- Libros organizados por su orden oficial en la lista.
- Cada libro muestra:
  - Carátula
  - Título y posición
  - Semanas en la lista
  - Descripción
  - Enlace para compra en Amazon (abre en nueva pestaña)

### Filtros y ordenamientos

- Filtro por tipo de lista: semanal/mensual.
- Filtro por categoría mediante input de texto con sugerencias.
- Ordenamiento por fecha de publicación (más antigua/nueva).
- Ordenamiento alfabético de categorías (A-Z, Z-A).

---

## 🔧 Tecnologías utilizadas

- **HTML5**
- **CSS3 (Flexbox, Media Queries)**
- **JavaScript (ES6+)**
- **APIs públicas (NYT Books API)**
- **Git y GitHub para control de versiones**

---

## 🛠 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/AlbeertoDZ/Biblioteca.git

