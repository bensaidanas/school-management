import { Teacher } from "./teacher";

export interface TeacherPayment {
    id: number;
    month: string;
    year: number;
    amount: number;
    teacher: Teacher;
    isPaid: boolean;
}