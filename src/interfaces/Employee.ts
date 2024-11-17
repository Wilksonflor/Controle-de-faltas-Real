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
  colaboradorId: number; 
  dataFalta: string; 
  dias: string; 
  abonada: boolean; 
}
