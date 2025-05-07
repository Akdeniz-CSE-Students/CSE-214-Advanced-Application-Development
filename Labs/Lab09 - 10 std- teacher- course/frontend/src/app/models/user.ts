export interface User {
  id?: number;
  username: string;
  password?: string;
  name: string;
  surname: string;
  email: string;
  role: 'STUDENT' | 'TEACHER';
} 