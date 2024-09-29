# Gestión de Tareas y Personas en Angular

## Introducción

Esta es una aplicación web desarrollada con **Angular 16** que permite gestionar tareas y las personas asignadas a ellas. La aplicación incluye funcionalidades para crear, listar y filtrar tareas, así como gestionar personas y sus habilidades asociadas a cada tarea mediante formularios reactivos con validaciones.

## Tabla de Contenidos

- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Validaciones Implementadas](#validaciones-implementadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Ejemplos](#ejemplos)
- [Contribuyentes](#contribuyentes)
- [Licencia](#licencia)

## Características

La aplicación cuenta con las siguientes funcionalidades:

1. **Crear tareas**: Permite crear nuevas tareas.
2. **Listar tareas**: Muestra todas las tareas creadas.
3. **Marcar tareas como completadas**: Permite marcar las tareas como completadas.
4. **Filtrar tareas por estado**: Filtra las tareas por su estado (completadas o pendientes).
5. **Asignar personas a las tareas**: Asocia personas a las tareas con sus nombres, edades y habilidades.
6. **Añadir y eliminar personas**: Gestiona las personas de una tarea mediante botones.
7. **Añadir y eliminar habilidades de personas**: Gestiona las habilidades de cada persona con botones.
8. **Formulario reactivo con validaciones**: Usa formularios con validaciones para asegurar la integridad de los datos ingresados.

### Validaciones específicas:

- **Nombre completo de la persona**: Obligatorio, mínimo de 5 caracteres y único dentro de cada tarea.
- **Edad de la persona**: Obligatorio, mayor de 18 años.
- **Habilidades**: Cada persona debe tener al menos una habilidad.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- **Node.js** (versión 14 o superior)
- **Angular CLI** (versión 16 o superior)

## Instalación

Sigue estos pasos para instalar y ejecutar la aplicación en tu entorno local:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/koh81/management-app.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd management-app
   ```

3. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

4. Inicia el servidor de desarrollo:

   ```bash
   ng serve
   ```

5. Abre tu navegador en la siguiente URL:

   ```
   http://localhost:4200
   ```

## Uso

### Crear una Tarea

- Haz clic en el botón **"Crear Tarea"** en la página principal.
- Ingresa el nombre de la tarea y opcionalmente marca la tarea como completada.

### Asignar Personas a una Tarea

- Una vez creada la tarea, puedes hacer clic en el botón **"Asignar Persona"**.
- Ingresa los datos de la persona (nombre completo, edad, habilidades) en el formulario reactivo.

### Gestionar Habilidades de las Personas

- Puedes añadir o eliminar habilidades de una persona mediante los botones **"Añadir Habilidad"** y **"Eliminar Habilidad"** dentro del formulario.

### Filtrar Tareas

- Usa los filtros en la interfaz principal para visualizar solo las tareas **"Completadas"** o **"Pendientes"**.

## Validaciones Implementadas

El formulario reactivo tiene las siguientes validaciones:

- **Nombre Completo**: Debe tener al menos 5 caracteres y no puede repetirse entre las personas asignadas a la misma tarea.
- **Edad**: Debe ser mayor de 18 años.
- **Habilidades**: Al menos una habilidad debe estar asociada a cada persona.

El formulario utiliza **arreglos anidados** para gestionar las habilidades de las personas, lo que permite un control dinámico sobre el número de habilidades asociadas a cada persona.

## Estructura del Proyecto

El proyecto sigue la estructura estándar de Angular:

```
task-management-app/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── task-list/
│   │   │   │   └── task-list.component.ts
│   │   │   ├── task-form/
│   │   │   │   └── task-form.component.ts
│   │   │   └── person-form/
│   │   │       └── person-form.component.ts
│   │   ├── interfaces/
│   │   │   ├── task.interface.ts
│   │   │   └── person.interface.ts
│   │   ├── services/
│   │   │   └── task.service.ts
│   │   ├── app.component.ts
│   │   └── app.routes.ts
│   ├── assets/
│   ├── styles.css
│   ├── main.ts
│   ├── index.html
│   └── ...
├── angular.json
├── package.json
├── tsconfig.json
└── ...
```

## Ejemplos

### Ejemplo de Creación de Tareas

1. Crea una nueva tarea llamada **"Desarrollar Funcionalidad de Login"**.
2. Asigna una persona llamada **"Juan Pérez"** de 30 años, con las habilidades **"Angular"** y **"TypeScript"**.
3. Marca la tarea como completada al terminar.

### Ejemplo de Validación

Si intentas crear una persona con un nombre duplicado o una edad inferior a 18 años, el formulario no se podrá enviar y mostrará los errores correspondientes.

## Contribuyentes

- [Tu Nombre](https://github.com/koh81)

Si deseas contribuir, por favor sigue los lineamientos estándar de pull requests y asegúrate de que tu código pase todas las pruebas unitarias.

## Licencia

Este proyecto está licenciado bajo la [Licencia MIT](LICENSE).

---

Este README está diseñado para facilitar la instalación y uso de la aplicación, además de proveer información clara sobre las validaciones y estructura del proyecto.