export interface Product {
    id_producto: number;
    nombre: string;
    descripcion: string;
    foto: string;
    precio_venta?: number;
    stock: number;
    precio_subasta?: number;
    sprecio_comprar?: number;
    fecha_subasta?: string;
    /**
     * normal, ahora, subasta
     */
    tipo_compra: string;
}
