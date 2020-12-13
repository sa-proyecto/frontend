import { Product } from './product';

export class Carrito {
    elementos: { producto: Product, cantidad: number }[] = new Array();
    get total(): number {
        let val = 0;
        for (const elemento of this.elementos) {
            val += elemento.producto.precio_venta * elemento.cantidad;
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
    add(producto: Product) {
        console.log(producto)
        for (const elemento of this.elementos) {
            if (elemento.producto.id_producto === producto.id_producto) {
                elemento.cantidad++;
                return;
            }
        }
        this.elementos.push({ producto, cantidad: 1 })
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
