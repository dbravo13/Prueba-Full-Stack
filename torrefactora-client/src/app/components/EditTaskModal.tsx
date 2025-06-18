"use client";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Select,
  message,
} from "antd";
import { useEffect } from "react";
import dayjs from "dayjs";
import api from "../lib/api";

const { TextArea } = Input;
const { Option } = Select;

export default function EditTaskModal({ visible, task, onClose, onSave }: any) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        nombre: task.nombre,
        descripcion: task.descripcion,
        duracion: task.duracion,
        prioridad: task.prioridad,
        estado: task.estado,
        beginDate: task.beginDate ? dayjs(task.beginDate) : null,
        endDate: task.endDate ? dayjs(task.endDate) : null,
        statusId: task.statusId,
        priorityId: task.priorityId,
      });
    }
  }, [task, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await api.put(`/tasks/${task.id}`, {
        ...values,
        beginDate: values.beginDate?.toISOString(),
        endDate: values.endDate?.toISOString(),
      });
      message.success("Tarea actualizada");
      onSave();
      onClose();
    } catch (error) {
      message.error("Error al actualizar la tarea");
    }
  };

  return (
    <Modal
      title="Editar Tarea"
      open={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText="Guardar"
    >
      <Form form={form} layout="vertical">
        <Form.Item name="nombre" label="Nombre" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="descripcion" label="Descripción">
          <TextArea rows={3} />
        </Form.Item>

        <Form.Item name="duracion" label="Duración (min)">
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="prioridad"
          label="Prioridad"
          rules={[{ required: true }]}
        >
          <Select>
            <Option value="Urgente">Urgente</Option>
            <Option value="Normal">Normal</Option>
            <Option value="Bajo">Bajo</Option>
          </Select>
        </Form.Item>

        <Form.Item name="estado" label="Estado" rules={[{ required: true }]}>
          <Select>
            <Option value="Iniciada">Iniciada</Option>
            <Option value="En Proceso">En Proceso</Option>
            <Option value="Terminada">Terminada</Option>
          </Select>
        </Form.Item>

        <Form.Item name="beginDate" label="Fecha de Inicio">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="endDate" label="Fecha de Fin">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
