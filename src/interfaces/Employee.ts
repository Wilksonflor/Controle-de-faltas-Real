// src/interfaces/Employee.ts

// interface Employee
export interface Employee {
  id: number;
  name: string;
  position: string;
  funcao_nome: string;
  absences: number;
  attendance: AttendanceRecord[];
}

// interface AttendanceRecord
export interface AttendanceRecord {
  date: string;
  status: "present" | "absent";
}

// interface Fouls
export interface Fouls {
  employeeId: number; // Mantenha 'number' ou altere para 'string' conforme necessário
  date: string;
  reason?: string;
}
