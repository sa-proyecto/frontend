import { Injectable } from '@angular/core';
import { Carrito } from './carrito';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  getCart(): Carrito {
    const obj = JSON.parse(localStorage.getItem('cart'));
    const carrito = new Carrito();
    if (obj && obj.elementos) {
      carrito.elementos = obj.elementos;
    }
    return carrito;
  }

  setCart(cart: Carrito) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  removeCart() {
    localStorage.removeItem('cart');
  }
}
