"use client";
import {
  Table,
  Tag,
  Checkbox,
  message,
  Modal,
  Input,
  Button,
  Space,
  Tooltip,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import EditTaskModal from "./EditTaskModal";
import api from "../lib/api";

export default function DashboardTable() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [newSubtaskName, setNewSubtaskName] = useState("");
  const [activeTaskId, setActiveTaskId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingSubtask, setEditingSubtask] = useState<any>(null);
  const [editedName, setEditedName] = useState("");

  const fetchTasks = async () => {
    const res = await api.get("/tasks/dashboard");
    const fullTasks = await Promise.all(
      res.data.map(async (task: any, idx: number) => {
        const detail = await api.get(`/tasks/${task.id}`);
        return {
          ...task,
          estado: task.status?.name || "—",
          prioridad: task.priority?.name || "—",
          subtareas: detail.data.subtareas || [],
          orden: idx + 1,
        };
      })
    );
    setTasks(fullTasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleToggleSubtask = async (subtask: any) => {
    await api.put(`/subtasks/${subtask.id}`, {
      completada: !subtask.completada,
    });
    fetchTasks();
  };

  const handleCreateSubtask = async () => {
    if (!newSubtaskName || activeTaskId === null) return;
    try {
      await api.post(`/subtasks/${activeTaskId}`, { nombre: newSubtaskName });
      message.success("Subtarea creada");
      setNewSubtaskName("");
      setOpen(false);
      fetchTasks();
    } catch {
      message.error("Error al crear subtarea");
    }
  };

  const handleEditSubtask = async () => {
    if (!editingSubtask || !editedName) return;
    await api.put(`/subtasks/${editingSubtask.id}`, { nombre: editedName });
    setEditModalOpen(false);
    setEditingSubtask(null);
    setEditedName("");
    message.success("Subtarea actualizada");
    fetchTasks();
  };

  const handleDeleteSubtask = async (id: number) => {
    try {
      await api.delete(`/subtasks/${id}`);
      message.success("Subtarea eliminada");
      fetchTasks();
    } catch {
      message.error("Error al eliminar subtarea");
    }
  };

  const columns = [
    {
      title: "📌 Nombre",
      dataIndex: "nombre",
      key: "nombre",
      render: (text: string, record: any) => (
        <div className="flex items-center justify-between gap-2">
          <span className="text-md font-medium">{text}</span>
          <Tooltip title="Editar tarea">
            <Button
              size="small"
              icon={<FormOutlined />}
              onClick={() => {
                setEditingTask(record);
                setIsModalVisible(true);
              }}
            />
          </Tooltip>
        </div>
      ),
    },
    {
      title: "⏱️ Duración",
      dataIndex: "duracion",
      key: "duracion",
    },
    {
      title: "📍 Estado",
      dataIndex: "estado",
      key: "estado",
      render: (estado: string) => {
        const color =
          { Iniciada: "blue", "En Proceso": "orange", Terminada: "green" }[
            estado
          ] || "gray";
        return <Tag color={color}>{estado}</Tag>;
      },
    },
    {
      title: "⚠️ Prioridad",
      dataIndex: "prioridad",
      key: "prioridad",
      render: (prioridad: string) => {
        const color =
          { Urgente: "red", Normal: "blue", Bajo: "green" }[prioridad] ||
          "gray";
        return <Tag color={color}>{prioridad}</Tag>;
      },
    },
    {
      title: "📅 Inicio",
      dataIndex: "beginDate",
      key: "beginDate",
      render: (date: string) => (date ? new Date(date).toLocaleString() : "—"),
    },
    {
      title: "🏁 Fin",
      dataIndex: "endDate",
      key: "endDate",
      render: (date: string) => (date ? new Date(date).toLocaleString() : "—"),
    },
    {
      title: "🔢 Orden",
      dataIndex: "orden",
      key: "orden",
      render: (orden: number) => (
        <Tag color="purple" className="font-semibold">
          #{orden}
        </Tag>
      ),
    },
  ];

  return (
    <>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={tasks}
        pagination={false}
        className="rounded-lg shadow-md overflow-hidden bg-white"
        expandable={{
          expandedRowRender: (record) => (
            <div className="pl-4 pr-4 pt-2 pb-4 bg-gray-50 rounded-md mt-2">
              <div className="flex justify-between items-center mb-2">
                <strong className="text-blue-900">🧩 Subtareas</strong>
                <Button
                  size="small"
                  icon={<PlusOutlined />}
                  className="bg-indigo-500 text-white hover:bg-indigo-600"
                  onClick={() => {
                    setActiveTaskId(record.id);
                    setOpen(true);
                  }}
                >
                  Nueva
                </Button>
              </div>
              <ul className="space-y-2">
                {record.subtareas.length > 0 ? (
                  record.subtareas.map((sub: any) => (
                    <li
                      key={sub.id}
                      className="flex items-center justify-between bg-white p-2 rounded shadow-sm"
                    >
                      <Checkbox
                        checked={sub.completada}
                        onChange={() => handleToggleSubtask(sub)}
                      >
                        <span
                          className={`ml-2 ${
                            sub.completada ? "line-through text-gray-400" : ""
                          }`}
                        >
                          {sub.nombre}
                        </span>
                      </Checkbox>
                      <Space>
                        <Tooltip title="Editar">
                          <Button
                            size="small"
                            icon={<EditOutlined />}
                            onClick={() => {
                              setEditingSubtask(sub);
                              setEditedName(sub.nombre);
                              setEditModalOpen(true);
                            }}
                          />
                        </Tooltip>
                        <Tooltip title="Eliminar">
                          <Button
                            size="small"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => handleDeleteSubtask(sub.id)}
                          />
                        </Tooltip>
                      </Space>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-400 italic">No hay subtareas</p>
                )}
              </ul>
            </div>
          ),
        }}
      />

      <Modal
        title={
          <span className="text-blue-900 font-semibold">Nueva Subtarea</span>
        }
        open={open}
        onOk={handleCreateSubtask}
        onCancel={() => setOpen(false)}
        okText="Crear"
        cancelText="Cancelar"
        okButtonProps={{ className: "bg-indigo-500 hover:bg-indigo-600" }}
      >
        <Input
          placeholder="Escribe el nombre de la subtarea"
          value={newSubtaskName}
          onChange={(e) => setNewSubtaskName(e.target.value)}
        />
      </Modal>

      <Modal
        title={
          <span className="text-blue-900 font-semibold">Editar Subtarea</span>
        }
        open={editModalOpen}
        onOk={handleEditSubtask}
        onCancel={() => setEditModalOpen(false)}
        okText="Guardar"
        okButtonProps={{ className: "bg-green-500 hover:bg-green-600" }}
      >
        <Input
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          placeholder="Nuevo nombre"
        />
      </Modal>

      <EditTaskModal
        visible={isModalVisible}
        task={editingTask}
        onClose={() => setIsModalVisible(false)}
        onSave={() => {
          fetchTasks();
          setIsModalVisible(false);
        }}
      />
    </>
  );
}
