"use client";
import { useState } from "react";
import api from "../lib/api";

export default function TaskForm() {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    duracion: 0,
    estado: "Iniciada",
    prioridad: "Normal",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/tasks", form);
    alert("Tarea creada");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="nombre"
        placeholder="Nombre"
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <input
        name="descripcion"
        placeholder="Descripción"
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <input
        type="number"
        name="duracion"
        placeholder="Duración en minutos"
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />

      <select
        name="estado"
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option value="Iniciada">Iniciada</option>
        <option value="En Proceso">En Proceso</option>
        <option value="Terminada">Terminada</option>
      </select>

      <select
        name="prioridad"
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option value="Urgente">Urgente</option>
        <option value="Normal">Normal</option>
        <option value="Bajo">Bajo</option>
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Crear
      </button>
    </form>
  );
}
