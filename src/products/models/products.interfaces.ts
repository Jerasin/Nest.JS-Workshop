export interface ProductsFormData {
    p_code: string;
    name: string;
    p_price: string ;
    p_stock: string ;
    image?: string;
    createdBy: string;
}

export interface ProductInsert {
    p_code: number;
    name: string;
    p_price: number ;
    p_stock: number ;
    image?: string;
    createdBy: any ;
}