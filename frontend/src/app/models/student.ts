// student.model.ts

import { Grade } from "./grade";
import { Major } from "./major";
import { PaymentRecord } from "./payment-record";

export interface Student {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    grade: Grade;
    major: Major;
    classrooms?: PaymentRecord[]; // An array of PaymentRecord objects representing the classrooms the student belongs to
}
