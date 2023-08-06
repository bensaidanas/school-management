import { Subject } from "./subject";

export interface Teacher {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    subjectId: number;
    subjectName: string;
    salleryBySession: number;
}