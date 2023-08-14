// payment-record.model.ts

import { Classroom } from "./classroom";
import { Student } from "./student";

export interface StudentPayment {
    id: number;
    student: Student; // Reference to the student using their unique identifier
    class: Classroom; // Reference to the class using its unique identifier
    month: string; // Month for which the payment is recorded (e.g., "January 2023")
    year: number;
    amount: number; // Payment amount for the class for the specified month
    isPaid: boolean; // Indicates if the payment has been made by the student for the month
}