export interface Product {
    id_producto: number;
    nombre: string;
    descripcion: string;
    foto: string;
    precio_venta?: number;
    stock: number;
    precio_subasta?: number;
    fecha_fin_subasta?: string;
}
