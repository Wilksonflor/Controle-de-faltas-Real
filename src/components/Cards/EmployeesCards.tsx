// components/Cards/EmployeesCards.tsx

import React, { useState } from "react";
import { Card, Col, Row, Divider, Progress, message, Empty } from "antd";
import { Employee } from "../../interfaces/Employee";
import ColaboradorDetalhes from "../../Details/ColaboradorDetalhes";

interface CardsProps {
  colaboradores: Employee[];
}

export const Cards: React.FC<CardsProps> = ({ colaboradores }) => {
  const [selectedColaborador, setSelectedColaborador] =
    useState<Employee | null>(null);

  const handleCardClick = (colaborador: Employee) => {
    setSelectedColaborador(colaborador);
  };

  return (
    <Row gutter={16}>
      {colaboradores.length > 0 ? (
        colaboradores.map((colaborador) => (
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={6}
            key={colaborador.id}
            onClick={() => handleCardClick(colaborador)}
          >
            <Card
              title={colaborador.name}
              bordered
              hoverable
              style={{ margin: 5, width: "100%" }}
            >
              <p>
                <strong>Função:</strong> {colaborador.funcao_nome}
              </p>
              <p>
                <strong>Quantidade de faltas:</strong> {colaborador.absences}
              </p>
              <Divider />
              <Progress
                percent={(colaborador.absences / 365) * 100}
                status="active"
                showInfo
              />
            </Card>
          </Col>
        ))
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Empty description="Nenhum colaborador encontrado..." />
        </div>
      )}

      {selectedColaborador && (
        <ColaboradorDetalhes
          colaborador={selectedColaborador}
          isOpen={Boolean(selectedColaborador)}
          onClose={() => setSelectedColaborador(null)}
        />
      )}
    </Row>
  );
};
