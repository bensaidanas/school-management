// classroom.model.ts

import { Teacher } from "./teacher";
import { PaymentRecord } from "./payment-record";

export interface Classroom {
    id: number;
    name: string;
    teacher: Teacher;
    gradeId: number;
    gradeName: string;
    sessionNumber: number;
    maxCapacity: number;
    students: PaymentRecord[]; // An array of PaymentRecord objects representing the students in this classroom
}
