"use client";
import { useEffect, useState } from "react";
import api from "./lib/api";
import CreateTaskModal from "./components/CreateTaskModal";
import DashboardTable from "./components/DashboardTable";
import "@ant-design/v5-patch-for-react-19";
import { Tag } from "antd";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get("/tasks/dashboard").then((res) => setTasks(res.data));
  }, []);

  const cardColors = [
    "bg-sky-200",
    "bg-pink-100",
    "bg-emerald-100",
    "bg-yellow-100",
  ];

  return (
    <main className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-blue-300 via-blue-50 to-blue-100">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-blue-800 drop-shadow">
        Tablero de Tareas
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task: any, index) => (
          <div
            key={task.id}
            className={`rounded-2xl shadow-lg p-5 transition-transform hover:scale-[1.02] border border-white/50 ${
              cardColors[index % cardColors.length]
            }`}
          >
            <div>
              <h2 className="text-xl font-semibold text-blue-800">
                {task.nombre}
              </h2>
              <p className="text-gray-700 mt-1">{task.descripcion}</p>

              <div className="mt-3 flex flex-wrap gap-2 text-sm text-gray-800">
                <span>
                  <strong>Duración:</strong> {task.duracion} min
                </span>

                {task.beginDate && (
                  <span>
                    <strong>Inicio:</strong>
                    {new Date(task.beginDate).toLocaleString()}
                  </span>
                )}

                {task.endDate && (
                  <span>
                    <strong>Fin:</strong>{" "}
                    {new Date(task.endDate).toLocaleString()}
                  </span>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <Tag
                  color={
                    task.status?.name === "Iniciada"
                      ? "processing"
                      : task.status?.name === "En Proceso"
                      ? "warning"
                      : "success"
                  }
                >
                  {task.status?.name ?? "Sin estado"}
                </Tag>

                <Tag
                  color={
                    task.priority?.name === "Urgente"
                      ? "error"
                      : task.priority?.name === "Normal"
                      ? "cyan"
                      : "success"
                  }
                >
                  {task.priority?.name ?? "Sin prioridad"}
                </Tag>
              </div>

              {task.subtareas?.length > 0 && (
                <div className="mt-4">
                  <strong className="text-blue-900">Subtareas:</strong>
                  <ul className="list-disc ml-6 mt-1 text-sm text-gray-700">
                    {task.subtareas.map((sub: any) => (
                      <li key={sub.id}>{sub.nombre}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-6">
        <CreateTaskModal />
        <DashboardTable />
      </div>
    </main>
  );
}
