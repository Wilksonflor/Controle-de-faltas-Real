import React, { useState, useEffect } from "react";
import { Modal, Form, Input, DatePicker, Checkbox, Tag, message } from "antd";
import dayjs, { Dayjs } from "dayjs";
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
  const [dataFalta, setDataFalta] = useState<Dayjs | null>(null);
  const [dias, setDias] = useState<number>(0);
  const [abonada, setAbonada] = useState<boolean>(false);
  const [dataVolta, setDataVolta] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Estado para controle de requisição

  useEffect(() => {
    // Atualiza a data de volta ao alterar `dataFalta` ou `dias`
    if (dataFalta && dias > 0) {
      const calculatedReturnDate = dataFalta.add(dias, "days");
      setDataVolta(calculatedReturnDate.format("DD/MM/YYYY"));
    } else {
      setDataVolta("");
    }
  }, [dataFalta, dias]);

  const handleOk = async () => {
    if (dataFalta && !isSubmitting) {
      try {
        setIsSubmitting(true);

        const faltaData: Fouls = {
          employeeId: colaboradorId,
          date: dataFalta.format("YYYY-MM-DD"),
          days: dias,
          excused: abonada,
        };

        await adicionarFalta(faltaData);
        message.success("Falta adicionada com sucesso");
        setDataFalta(null);
        setDias(0);
        setAbonada(false);
        setDataVolta("");
        onCancel();

        // console.log("Falta registrada com sucesso.");
      } catch (error) {
        console.error("Erro ao cadastrar falta:", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.error("Data de falta não selecionada ou já em envio.");
    }
  };

  return (
    <Modal
      title="Registrar Falta"
      open={isOpen}
      onOk={handleOk}
      onCancel={onCancel}
      okButtonProps={{ disabled: isSubmitting }} // Desabilita o botão "Ok" enquanto estiver enviando
    >
      <Form layout="vertical">
        <Form.Item label="Data da Falta">
          <DatePicker
            format="DD/MM/YYYY"
            onChange={(date) => {
              setDataFalta(date);
              console.log(
                "Data selecionada:",
                date ? date.format("YYYY-MM-DD") : null
              );
            }}
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
