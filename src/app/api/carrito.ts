import { Product } from './product';

export class Carrito {
    elementos: { producto: Product, cantidad: number }[] = new Array();
    get total(): number {
        let val = 0;
        for (const elemento of this.elementos) {
            console.log(elemento);
            val += (elemento.producto.sprecio_comprar
            ? elemento.producto.sprecio_comprar
            : (elemento.producto.precio_subasta
            ? elemento.producto.precio_subasta
            : (elemento.producto.precio_venta
            ? elemento.producto.precio_venta
            : 0))) * elemento.cantidad;
        }
        return val;
    }
    get totalItems(): number {
        let val = 0;
        for (const elemento of this.elementos) {
            val += elemento.cantidad;
        }
        return val;
    }
    private add(producto: Product) {
        for (const elemento of this.elementos) {
            if (elemento.producto.id_producto === producto.id_producto
                && elemento.producto.tipo_compra === producto.tipo_compra) {
                elemento.cantidad++;
                return;
            }
        }
        this.elementos.push({ producto, cantidad: 1 })
    }
    addNormal(producto: Product) {
        producto.tipo_compra = 'normal';
        producto.sprecio_comprar = null;
        producto.precio_subasta = null;
        this.add(producto);
    }
    addSubasta(producto: Product) {
        producto.tipo_compra = 'subasta';
        producto.sprecio_comprar = null;
        producto.precio_venta = null;
        this.add(producto);
    }
    addAhora(producto: Product) {
        producto.tipo_compra = 'ahora';
        producto.precio_subasta = null;
        producto.precio_venta = null;
        this.add(producto);
    }
    substract(producto: Product) {
        for (const elemento of this.elementos) {
            if (elemento.producto.id_producto === producto.id_producto) {
                elemento.cantidad--;
                if (elemento.cantidad <= 0) {
                    this.delete(producto);
                }
                return;
            }
        }
        this.elementos.push({ producto, cantidad: 1 })
    }
    delete(producto: Product) {
        for (let i = 0; i < this.elementos.length; i++) {
            if (this.elementos[i].producto.id_producto === producto.id_producto) {
                this.elementos.splice(i, 1);
                return;
            }
        }
    }
    clear() {
        this.elementos.length = 0;
    }
}
