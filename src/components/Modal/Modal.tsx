import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import axios from "axios";

interface ModalEmployeeProps {
  isOpen: boolean;
  onOk: (colaborador: { nome: string; funcao_id: string }) => void;
  onCancel: () => void;
}

export const ModalEmployee: React.FC<ModalEmployeeProps> = ({
  isOpen,
  onOk,
  onCancel,
}) => {
  const [formData, setFormData] = useState({ nome: "", funcao_id: "" });
  const [funcoes, setFuncoes] = useState([]); // Renomeado para `funcoes`

  useEffect(() => {
    const fetchFunctions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/funcao");

        setFuncoes(response.data);
      } catch (error) {
        console.error("Erro ao listar as funções:", error);
      }
    };

    fetchFunctions(); // Chama a função de busca
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, funcao_id: value }));
  };

  const handleOk = () => {
    onOk(formData); // Passa os dados do novo colaborador
    setFormData({ nome: "", funcao_id: "" }); // Limpa os campos após o envio
  };

  return (
    <Modal
      title="Cadastro de Colaborador"
      open={isOpen}
      onCancel={onCancel}
      footer={null}
    >
      <Form layout="vertical">
        <Form.Item label="Nome">
          <Input
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            placeholder="Digite o nome"
          />
        </Form.Item>
        <Form.Item label="Função">
          <Select
            value={formData.funcao_id}
            onChange={handleSelectChange}
            placeholder="Selecione a função"
          >
            {funcoes.map((funcao: { id: number; nome: string }) => (
              <Select.Option key={funcao.id} value={funcao.id.toString()}>
                {funcao.nome}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Button type="primary" onClick={handleOk}>
          Cadastrar
        </Button>
      </Form>
    </Modal>
  );
};
