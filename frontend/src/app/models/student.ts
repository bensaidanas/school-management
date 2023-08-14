// student.model.ts

import { Classroom } from "./classroom";
import { Grade } from "./grade";
import { Major } from "./major";

export interface Student {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    grade: Grade;
    major: Major;
    classrooms?: Classroom[]; // An array of PaymentRecord objects representing the classrooms the student belongs to
}
