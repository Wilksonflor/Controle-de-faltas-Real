import axios, { AxiosError } from "axios";
import { Employee, Fouls } from "../interfaces/Employee";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const getEmployees = async (): Promise<Employee[]> => {
  try {
    const { data } = await api.get<Employee[]>("/colaborador");
    return data;
  } catch (error: AxiosError | any) {
    console.error("Erro ao buscar colaboradores:", error.message || error);
    throw error;
  }
};

export const adicionarColaborador = async (
  employee: Employee
): Promise<Employee> => {
  try {
    const { data } = await api.post<Employee>(
      "/colaborador/novoColaborador",
      employee
    );
    console.log("teste");
    return data;
  } catch (error: AxiosError | any) {
    console.error("Erro ao adicionar colaborador:", error.message || error);
    throw error;
  }
};

export const adicionarFalta = async (faltaData: Fouls) => {
  try {
    const response = await axios.post("http://localhost:3000/falta/cadastrar", {
      colaborador_id: faltaData.employeeId,
      data_falta: faltaData.date,
      dias: faltaData.days,
      abonada: faltaData.excused,
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar falta:", error);
    throw error;
  }
};

export const getRoles = async () => {
  try {
    const response = await axios.get("http://localhost:3000/funcao");
    console.log("Funções:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar funções:", error);
    return [];
  }
};

export const getFouls = async (colaboradorId: number) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/colaborador/colaboradorDetails/${colaboradorId}`
    );
    console.log("resposta", response.data);
    return response.data;
  } catch (error) {
    console.log("Erro ao buscar faltas:", error);
    throw error;
  }
};
