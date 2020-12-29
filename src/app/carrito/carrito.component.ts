import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carrito } from '../api/carrito';
import { CartService } from '../api/cart.service';
import { Cliente } from '../api/cliente';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  private cart: Carrito;
  private cliente: Cliente;
  private numeroTarjeta = 0;
  private tipoEntrega = 0;
  private tarjetas: any[];
  private nit: number;
  private direccion: string;
  constructor(
    private userService: UserService,
    private cartService: CartService,
    private router: Router,
  ) { }

  get Total() {
    return this.cart ? this.cart.total : 0;
  }
  get Productos() {
    return this.cart ? this.cart.elementos : [];
  }

  get Tarjetas(): any[] {
    return this.tarjetas.filter(o => {
      return Number(o.estado) === 0;
    });
  }
  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.cliente = JSON.parse(localStorage.getItem('cliente'));
    this.tarjetas = [];
    if (this.cliente) {
      this.tarjetas = this.cliente.tarjetas;
    }
  }
  reducir(elemento) {
    if (elemento.cantidad <= 0) {
      elemento.cantidad = 0;
    } else {
      elemento.cantidad--;
    }
    this.saveCart();
  }
  aumentar(elemento) {
    if (elemento.producto.stock <= elemento.cantidad) {
      elemento.cantidad = elemento.producto.stock;
    } else {
      elemento.cantidad++;
    }
    this.saveCart();
  }
  eliminar(elemento) {
    this.cart.elementos = this.cart.elementos.filter(o => {
      return o !== elemento;
    });
    this.saveCart();
  }
  saveCart() {
    this.cartService.setCart(this.cart);
  }
  comprar() {
    if (!this.cliente) {
      this.router.navigate(['login']);
    }
    if (!this.cliente.tarjetas || !this.cliente.tarjetas.length) {
      this.router.navigate(['tarjeta']);
    }
    const numeroTarjeta = this.numeroTarjeta;
    const idCliente = this.cliente.id_cliente;
    const itemsNormal = this.cart.elementos.filter(o => {
      return o.producto.tipo_compra === 'normal';
    }).map(o => {
      const ret = {
        idProducto: o.producto.id_producto,
        cantidad: o.cantidad,
      };
      return ret;
    });
    const itemsAhora = this.cart.elementos.filter(o => {
      return o.producto.tipo_compra === 'ahora';
    }).map(o => {
      const ret = {
        idProducto: o.producto.id_producto,
        cantidad: o.cantidad,
      };
      return ret;
    });
    const itemsSubasta = this.cart.elementos.filter(o => {
      return o.producto.tipo_compra === 'subasta';
    }).map(o => {
      const ret = {
        idProducto: o.producto.id_producto,
        cantidad: o.cantidad,
      };
      return ret;
    });
    const nit = this.nit;
    const direccionEnvio = this.direccion;
    if (itemsNormal.length > 0) {
      this.userService.doPurchase({
        entrega: this.tipoEntrega,
        numeroTarjeta, idCliente, items: itemsNormal, nit, direccionEnvio
      }).subscribe(res => {
        if (res.status !== 'success') {
          console.error('Oopps compra normal');
        }
      }, err => {
        console.error(err);
      });
    }
    if (itemsAhora.length > 0) {
      this.userService.doPurchaseNow({
        entrega: this.tipoEntrega,
        numeroTarjeta, idCliente, items: itemsAhora, nit, direccionEnvio
      }).subscribe(res => {
        if (res.status !== 'success') {
          console.error('Oopps compra ahora')
        }
      }, err => {
        console.error(err);
      });
    }
    if (itemsSubasta.length > 0) {
      // obtener datos de items a subastas
      const subastas: { idSubasta: number }[] = [];
      itemsSubasta.forEach(element => {
        subastas.push({ idSubasta: element.idProducto });
      });
      this.userService.doPurchaseSubasta({
        entrega: this.tipoEntrega,
        numeroTarjeta, idCliente, items: subastas, nit, direccionEnvio
      }).subscribe(res => {
        if (res.status !== 'success') {
          console.error('Oopps compra subasta')
        }
      }, err => {
        console.error(err);
      });
    }

    this.cartService.removeCart();
    this.router.navigate(['tienda']);
  }
}
