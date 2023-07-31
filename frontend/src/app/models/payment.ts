// payment.model.ts

export interface Payment {
    id: number;
    teacherId: number; // Reference to the teacher using the teacher's unique identifier
    classId: number; // Reference to the class using its unique identifier
    month: string; // Month for which the payment is made (e.g., "January 2023")
    amount: number; // Payment amount for the class and month
    isPaid: boolean; // Indicates if the payment has been made to the teacher
    className: string;
}