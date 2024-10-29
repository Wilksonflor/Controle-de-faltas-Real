import axios, { AxiosError } from "axios";
import { Employee, Fouls } from "../interfaces/Employee";

const api = axios.create({
  baseURL: "http://localhost:3000", // Assegure que a porta corresponde à do backend
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

export const adicionarFalta = async (fouls: Fouls): Promise<Fouls> => {
  try {
    const { data } = await api.post<Fouls>("/falta/cadastrarFalta", fouls);
    return data;
  } catch (error: AxiosError | any) {
    console.error("Erro ao adicionar falta:", error.message || error);
    throw error;
  }
};
