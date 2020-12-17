export interface Product {
    id_producto: number;
    nombre: string;
    descripcion: string;
    foto: string;
    precio_venta?: number;
    stock: number;
    precio_subasta?: number;
    precio_comprar_ahora?: number;
    fecha_subasta?: string;
}
