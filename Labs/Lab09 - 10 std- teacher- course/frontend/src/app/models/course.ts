import { CourseStatus } from './course-status';
import { Student } from './student';
import { Teacher } from './teacher';

export interface Course {
  id?: number;
  name: string;
  code: string;
  description: string;
  status: CourseStatus;
  teacher?: Teacher;
  students?: Student[];
} 