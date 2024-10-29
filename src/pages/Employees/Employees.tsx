import React, { useEffect, useState } from "react";
import { Employee } from "../../interfaces/Employee";
import { Cards } from "../../components/Cards/EmployeesCards";
import { Button, Input, Select } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { ModalEmployee } from "../../components/Modal/Modal";
import { adicionarColaborador, getEmployees } from "../../Services/Api";

const { Search } = Input;
const { Option } = Select;

const Colaboradores: React.FC = () => {
  const [colaboradores, setColaboradores] = useState<Employee[]>([]);
  const [filteredColaboradores, setFilteredColaboradores] = useState<
    Employee[]
  >([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterRole, setFilterRole] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchColaboradores = async () => {
    try {
      const data = await getEmployees();
      console.log("Dados dos colaboradores:", data); // Log para verificar dados

      const colaboradoresFormatados = data.map((colaborador) => ({
        id: colaborador.id,
        name: colaborador.nome,
        funcao_nome: colaborador.funcao_nome, // Verifique aqui
        absences: colaborador.qntd_total,
        image: "/path/to/default-image.jpg",
      }));

      setColaboradores(colaboradoresFormatados);
    } catch (error) {
      console.error("Erro ao buscar colaboradores", error);
    }
  };

  const createColaborador = async (newColaborador: Employee) => {
    try {
      const createdColaborador = await adicionarColaborador(newColaborador);
      setColaboradores((prev) => [...prev, createdColaborador]);
      setIsModalOpen(false); // Fecha o modal após o cadastro
    } catch (error) {
      console.error("Erro ao criar colaborador");
    }
  };

  useEffect(() => {
    fetchColaboradores();
  }, []);

  useEffect(() => {
    const filtered = colaboradores.filter(
      (colaborador) =>
        colaborador.name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterRole ? colaborador.position === filterRole : true)
    );
    setFilteredColaboradores(filtered);
  }, [colaboradores, searchTerm, filterRole]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Search
            placeholder="Pesquisar colaborador..."
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 200, marginBottom: 20 }}
          />

          <Select
            placeholder="Filtrar por cargo"
            onChange={(value) => setFilterRole(value)}
            style={{ width: 200, marginLeft: 10, marginBottom: 20 }}
          >
            <Option value="">Todos os cargos</Option>
            <Option value="Developer">Desenvolvedor</Option>
            <Option value="Designer">Designer</Option>
            <Option value="Manager">Gerente</Option>
          </Select>
        </div>
        <div>
          <Button
            icon={<UserAddOutlined />}
            type="primary"
            onClick={() => setIsModalOpen(true)}
          >
            Adicionar colaborador
          </Button>
        </div>
      </div>
      <Cards colaboradores={filteredColaboradores} />

      <ModalEmployee
        isOpen={isModalOpen}
        onOk={(newColaborador) => createColaborador(newColaborador)}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Colaboradores;
