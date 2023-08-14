// classroom.model.ts

import { Teacher } from "./teacher";
import { Grade } from "./grade";
import { Student } from "./student";

export interface Classroom {
    id: number;
    name: string;
    teacher: Teacher;
    grade: Grade;
    sessionNumber: number;
    price: number;
    students: Student[]; // An array of PaymentRecord objects representing the students in this classroom
}
