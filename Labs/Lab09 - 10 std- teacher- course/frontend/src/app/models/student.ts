import { Course } from './course';
import { Teacher } from './teacher';
import { User } from './user';

export interface Student extends User {
  studentNumber: string;
  registrationDate: Date;
  teacher?: Teacher;
  courses?: Course[];
} 