import {User} from '../../users/models/users.interface'
export interface ProductsFormData {
    p_code: string | number;
    p_name: string;
    p_price: string | number;
    p_stock: string | number;
    image?: string;
    createdBy: User //? This is Fk Db user;
}

export interface ProductInsert {
    p_code: number;
    p_name: string;
    p_price: number ;
    p_stock: number ;
    image?: string;
    createdBy: User //? This is Fk Db user;
}