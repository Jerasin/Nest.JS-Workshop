// ? ใช้ก็ได้ไม่ใช้ก็ได้
export interface User {
    id: number;
    email: string;
    password: string;
    role: number;
    createdAt: Date;
    updatedAt?: Date;
}