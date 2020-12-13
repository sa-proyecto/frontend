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
  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    console.log(this.cart);
    this.cliente = JSON.parse(localStorage.getItem('cliente'));
  }
  reducir(elemento) {
    elemento.cantidad--;
    this.saveCart();
  }
  aumentar(elemento) {
    elemento.cantidad++;
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
    const numeroTarjeta = this.cliente.tarjetas[0].numero_tarjeta;
    const idCliente = this.cliente.id_cliente;
    const items = this.cart.elementos.map(o => {
      const ret = {
        idProducto: o.producto.id_producto,
        cantidad: o.cantidad,
      };
      return ret;
    })
    this.userService.doPurchase({ numeroTarjeta, idCliente, items }).subscribe(res => {
      if (res.status === 'success') {
        this.cartService.removeCart();
        this.router.navigate(['tienda']);
        return;
      }
      console.error('Oopps')
    }, err => {
      console.error(err);
    });
  }
}
