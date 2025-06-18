"use client";
import { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  message,
} from "antd";
import api from "../lib/api";
import { useRouter } from "next/navigation";

const { Option } = Select;

export default function CreateTaskModal() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [statuses, setStatuses] = useState([]);
  const [priorities, setPriorities] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchMetadata = async () => {
      const [statusRes, priorityRes] = await Promise.all([
        api.get("/status"),
        api.get("/priority"),
      ]);
      setStatuses(statusRes.data);
      setPriorities(priorityRes.data);
    };
    fetchMetadata();
  }, []);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const payload = {
        nombre: values.nombre,
        descripcion: values.descripcion,
        duracion: values.duracion,
        beginDate: values.beginDate?.toISOString(),
        endDate: values.endDate?.toISOString(),
        statusId: values.status,
        priorityId: values.priority,
      };

      await api.post("/tasks", payload);
      setOpen(false);
      form.resetFields();
      router.refresh();
      message.success("Tarea creada exitosamente");
    } catch (err) {
      console.error(err);
      message.error("Error al crear la tarea");
    }
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-indigo-500 shadow-lg font-semibold"
      >
        + Crear Tarea
      </Button>

      <Modal
        title={
          <h2 className="text-xl font-bold text-blue-900">Crear Nueva Tarea</h2>
        }
        open={open}
        onOk={handleOk}
        onCancel={() => setOpen(false)}
        okText="Guardar"
        cancelText="Cancelar"
        okButtonProps={{
          className: "bg-indigo-500 hover:bg-indigo-600 font-medium",
        }}
        cancelButtonProps={{
          className: "hover:text-indigo-500",
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="nombre" label="Nombre" rules={[{ required: true }]}>
            <Input placeholder="Escribe el nombre de la tarea" />
          </Form.Item>

          <Form.Item
            name="descripcion"
            label="Descripción"
            rules={[{ required: true }]}
          >
            <Input placeholder="Agrega una breve descripción" />
          </Form.Item>

          <Form.Item
            name="duracion"
            label="Duración (min)"
            rules={[{ required: true, type: "number", min: 1 }]}
          >
            <InputNumber className="w-full" min={1} placeholder="Ej. 30" />
          </Form.Item>

          <Form.Item name="status" label="Estado" rules={[{ required: true }]}>
            <Select placeholder="Selecciona un estado">
              {statuses.map((s: any) => (
                <Option key={s.id} value={s.id}>
                  {s.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="priority"
            label="Prioridad"
            rules={[{ required: true }]}
          >
            <Select placeholder="Selecciona una prioridad">
              {priorities.map((p: any) => (
                <Option key={p.id} value={p.id}>
                  {p.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="beginDate" label="Fecha de Inicio">
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item name="endDate" label="Fecha de Fin">
            <DatePicker className="w-full" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
