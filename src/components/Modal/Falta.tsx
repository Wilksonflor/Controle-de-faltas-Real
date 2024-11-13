import React, { useState, useEffect } from "react";
import { Modal, Form, Input, DatePicker, Checkbox, Tag } from "antd";
import moment, { Moment } from "moment";
import { adicionarFalta } from "../../Services/Api";
import { Fouls } from "../../interfaces/Employee";

interface FaltaModalProps {
  isOpen: boolean;
  onOk: (data: {
    colaboradorId: number;
    dataFalta: string;
    dias: number;
    abonada: boolean;
  }) => void;
  onCancel: () => void;
  colaboradorId: number;
}

const FaltaModal: React.FC<FaltaModalProps> = ({
  isOpen,
  onOk,
  onCancel,
  colaboradorId,
}) => {
  const [dataFalta, setDataFalta] = useState<Moment | null>(null);
  const [dias, setDias] = useState<number>(0);
  const [abonada, setAbonada] = useState<boolean>(false);
  const [dataVolta, setDataVolta] = useState<string>("");

  useEffect(() => {
    // Atualiza a data de volta ao alterar `dataFalta` ou `dias`
    if (dataFalta && dias > 0) {
      // Calcula a data de volta com base na data selecionada no DatePicker
      const calculatedReturnDate = moment(dataFalta).add(dias, "days");
      setDataVolta(calculatedReturnDate.format("DD/MM/YYYY"));
    } else {
      setDataVolta("");
    }
  }, [dataFalta, dias]);

  const handleOk = async () => {
    if (dataFalta) {
      // Verifica se a data foi selecionada
      try {
        const faltaData: Fouls = {
          employeeId: colaboradorId,
          date: dataFalta.format("YYYY-MM-DD"), // Formata a data corretamente
          days: dias,
          excused: abonada,
        };
        await adicionarFalta(faltaData); // Envia ao backend
        onOk(faltaData); // Notifica `ColaboradorDetalhes`
      } catch (error) {
        console.error("Erro ao cadastrar falta:", error);
      }
    } else {
      console.error("Data de falta não selecionada.");
    }
  };

  return (
    <Modal
      title="Registrar Falta"
      open={isOpen}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form layout="vertical">
        <Form.Item label="Data da Falta">
          <DatePicker
            format="DD/MM/YYYY"
            onChange={(date) => setDataFalta(date)}
          />
        </Form.Item>
        <Form.Item label="Quantidade de Dias">
          <Input
            type="number"
            min={1}
            value={dias}
            onChange={(e) => setDias(Number(e.target.value))}
          />
        </Form.Item>
        {dataVolta && (
          <Form.Item label="Data de Volta">
            <Tag color="blue">{dataVolta}</Tag>
          </Form.Item>
        )}
        <Form.Item>
          <Checkbox
            checked={abonada}
            onChange={(e) => setAbonada(e.target.checked)}
          >
            Abonada
          </Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FaltaModal;
