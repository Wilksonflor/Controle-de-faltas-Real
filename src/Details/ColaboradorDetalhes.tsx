import React, { useState, useEffect } from "react";
import { Modal, Button, List, message, Typography, Empty, Divider } from "antd";
import FaltaModal from "../components/Modal/Falta";
import { adicionarFalta, getFouls } from "../Services/Api";
import { Employee, Fouls } from "../interfaces/Employee";

const { Title, Text, Paragraph } = Typography;

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
  const [absences, setAbsences] = useState<Fouls[]>([]);
  const [totalAbsences, setTotalAbsences] = useState(0);

  // Função para buscar as faltas do colaborador
  const fetchFaltas = async () => {
    try {
      const faltas = await getFouls(colaborador.id);

      // Ordenar as faltas por data (do mais recente para o mais antigo)
      const sortedFaltas = faltas.sort(
        (a, b) =>
          new Date(b.data_falta).getTime() - new Date(a.data_falta).getTime()
      );

      setAbsences(sortedFaltas);

      const totalDias = sortedFaltas.reduce(
        (sum, falta) => sum + Number(falta.dias),
        0
      );
      setTotalAbsences(totalDias);
    } catch (error: any) {
      console.log("Erro ao carregar dados", error);
    }
  };

  useEffect(() => {
    if (colaborador.id) {
      fetchFaltas();
    }
  }, [colaborador.id]);

  const handleFaltaSubmit = async (faltaData: {
    colaboradorId: number;
    dataFalta: string;
    dias: number;
    abonada: boolean;
  }) => {
    try {
      await adicionarFalta(faltaData);
      message.success("Falta registrada com sucesso!");
      setIsFaltaModalOpen(false);
      fetchFaltas();
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
      style={{ maxWidth: "600px" }}
    >
      {/* Conteúdo interno com scroll */}
      <div
        style={{ maxHeight: "400px", overflowY: "auto", paddingRight: "8px" }}
      >
        <Paragraph>
          <Text strong>Função:</Text> {colaborador.funcao_nome}
        </Paragraph>
        <Paragraph>
          <Text strong>Total de Faltas (dias):</Text> {totalAbsences}
        </Paragraph>

        <Title level={5}>Detalhes das Faltas</Title>
        <Divider />
        {absences.length > 0 ? (
          <List
            dataSource={absences}
            renderItem={(falta) => (
              <List.Item>
                <List.Item.Meta
                  title={`Data: ${new Date(falta.data_falta).toLocaleDateString(
                    "pt-BR"
                  )}`}
                  description={`Dias: ${falta.dias}, Abonada: ${
                    falta.abonada ? "Sim" : "Não"
                  }`}
                />
              </List.Item>
            )}
          />
        ) : (
          <Empty description="Nenhuma falta registrada." />
        )}
      </div>

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
