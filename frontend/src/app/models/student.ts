// student.model.ts

import { PaymentRecord } from "./payment-record";

export interface Student {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    major: string;
    year: number;
    classrooms?: PaymentRecord[]; // An array of PaymentRecord objects representing the classrooms the student belongs to
}
