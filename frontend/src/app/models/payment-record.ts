// payment-record.model.ts

export interface PaymentRecord {
    id: number;
    studentId: number; // Reference to the student using their unique identifier
    classId: number; // Reference to the class using its unique identifier
    month: string; // Month for which the payment is recorded (e.g., "January 2023")
    amount: number; // Payment amount for the class for the specified month
    isPaid: boolean; // Indicates if the payment has been made by the student for the month
    className: string;
}