# Documentación del Proyecto: Gestor de Tareas

## 📅 Historias de Usuario

### Historia 1: Crear tareas y subtareas

**Como** Despachador de torrefactora,  
**quiero** Crear mis tareas y subtareas diarias con su nombre, descripción y
duración de la tarea en minutos, actualizarlas y si es el caso borrarlas
**para** Llevar un registro de las tareas ejecutadas diariamente

---

### Historia 2: Ver tareas ordenadas según prioridad y duración

**Como** Despachador de torrefactora,  
**quiero** Asignarle un estado a cada tarea: Iniciada, En Proceso, Terminada,  
**para** Tener trazabilidad del avance de mis tareas diarias.

**Criterios de aceptación:**

- ***

### Historia 3: Acceso vía API REST

**Como** Despachador de torrefactora
**quiero** Tener un tablero de control de mis tareas donde pueda ver su estado y
prioridad y el orden de atención sugerido por el sistema, basado en la
duración y en el algoritmo de planificación por prioridad “al más corto”
(SJF, Short Job First). \*

**para** Visualizar de manera rápida cual tarea se debe gestionar

---

## 🪤 Tecnologías utilizadas

| Capa          | Tecnología              |
| ------------- | ----------------------- |
| Backend       | NestJS (Node.js)        |
| Base de datos | PostgreSQL + TypeORM    |
| Contenedores  | Docker + Docker Compose |
| API REST      | JSON RESTful            |

---

## 🚀 Despliegue y contenedores

La aplicación corre en contenedores Docker. Se utilizan dos servicios:

- `api`: backend en NestJS
- `db`: base de datos PostgreSQL

Todo el sistema se levanta con un solo comando:

```bash
docker-compose up --build

```
