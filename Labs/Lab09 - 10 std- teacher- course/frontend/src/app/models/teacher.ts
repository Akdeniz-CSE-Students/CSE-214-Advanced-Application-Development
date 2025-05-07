import { Course } from './course';
import { Student } from './student';
import { User } from './user';

export interface Teacher extends User {
  teacherId: string;
  department: string;
  courses?: Course[];
  students?: Student[];
} 