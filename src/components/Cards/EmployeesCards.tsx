import React from "react";
import { Card, Col, Row, Divider, Progress } from "antd";
import { Employee } from "../../interfaces/Employee";

const { Meta } = Card;

interface CardsProps {
  colaboradores: Employee[];
}

export const Cards: React.FC<CardsProps> = ({ colaboradores }) => (
  <Row gutter={16}>
    {colaboradores.map((colaborador) => (
      <Col span={8} key={colaborador.id}>
        <Card
          title={colaborador.name}
          bordered={true}
          hoverable
          // cover={
          //   <img
          //     alt="Colaborador"
          //     src={colaborador.image || user}
          //     width={200}
          //     height={200}
          //     style={{ objectFit: "cover", borderRadius: 50 }}
          //   />
          // }
        >
          <p>
            <strong>Função:</strong> {colaborador.funcao_nome}{" "}
            {/* Nome da função */}
          </p>

          <p>
            <strong>Quantidade de faltas:</strong> {colaborador.absences}{" "}
            {/* Quantidade de faltas */}
          </p>

          <Divider />

          <Progress
            percent={(colaborador.absences / 365) * 100}
            status="active"
            showInfo={true}
          />

          <Meta description="Colégio Real" />
        </Card>
      </Col>
    ))}
  </Row>
);
