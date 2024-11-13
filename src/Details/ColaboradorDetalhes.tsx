// components/Details/ColaboradorDetalhes.tsx

import React, { useState } from "react";
import { Modal, Button, List, message } from "antd";
import FaltaModal from "../components/Modal/Falta";
import { adicionarFalta } from "../Services/Api";
import { Employee } from "../interfaces/Employee";

interface ColaboradorDetalhesProps {
  colaborador: Employee;
  isOpen: boolean;
  onClose: () => void;
}

const ColaboradorDetalhes: React.FC<ColaboradorDetalhesProps> = ({
  colaborador,
  isOpen,
  onClose,
}) => {
  const [isFaltaModalOpen, setIsFaltaModalOpen] = useState(false);

  const handleFaltaSubmit = async (faltaData: {
    colaboradorId: number;
    dataFalta: string;
    dias: number;
    abonada: boolean;
  }) => {
    try {
      await adicionarFalta(faltaData); // Corrigido: faltaData como parâmetro
      message.success("Falta registrada com sucesso!");
      setIsFaltaModalOpen(false); // Fechar modal após sucesso
    } catch (error) {
      message.error("Erro ao registrar falta.");
    }
  };

  return (
    <Modal
      open={isOpen}
      title={`Detalhes de ${colaborador.name}`}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Fechar
        </Button>,
        <Button
          key="add-falta"
          type="primary"
          onClick={() => setIsFaltaModalOpen(true)}
        >
          Adicionar Falta
        </Button>,
      ]}
    >
      <p>
        <strong>Função:</strong> {colaborador.funcao_nome}
      </p>
      <p>
        <strong>Faltas:</strong>
      </p>
      <List
        dataSource={colaborador.absencesDetails || []}
        renderItem={(falta) => (
          <List.Item>
            <List.Item.Meta
              title={`Data: ${falta.dataFalta}`}
              description={`Dias: ${falta.dias}, Abonada: ${
                falta.abonada ? "Sim" : "Não"
              }`}
            />
          </List.Item>
        )}
      />

      {isFaltaModalOpen && (
        <FaltaModal
          isOpen={isFaltaModalOpen}
          colaboradorId={colaborador.id}
          onOk={handleFaltaSubmit}
          onCancel={() => setIsFaltaModalOpen(false)}
        />
      )}
    </Modal>
  );
};

export default ColaboradorDetalhes;
