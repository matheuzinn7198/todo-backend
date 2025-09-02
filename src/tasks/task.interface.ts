export interface Task {
  id: string; // Usaremos string para simplificar por enquanto
  title: string;
  description: string;
  status: 'PENDING' | 'DONE';
}