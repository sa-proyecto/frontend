import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carrito } from '../api/carrito';
import { CartService } from '../api/cart.service';
import { Product } from '../api/product';
import { ProductService } from '../api/product.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent implements OnInit {
  private productos: Product[];
  private cart: Carrito;
  private categorias: { id_categoria: number, nombre: string };
  private filtro: number;
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
  ) {

  }

  get Productos(): Product[] {
    return this.productos;
  }
  get CartCount(): number {
    return this.cart && this.cart.elementos ? this.cart.totalItems : 0;
  }

  get Categorias() {
    return this.categorias;
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(res => {
      this.productos = res.data;
    }, err => {
      console.error(err);
    });
    this.cart = this.cartService.getCart();
    this.productService.getCategories()
      .subscribe((res) => {
        if (res.status === 'success') {
          this.categorias = res.data;
        }
      });
  }

  addToCart(prod: Product) {
    this.cart.add(prod);
    this.cartService.setCart(this.cart);
  }

  addToCartNow(prod: Product) {
    this.addToCart(prod);
    this.goToCart();
  }

  goToCart() {
    this.router.navigate(['carrito']);
  }

  filtrar() {
    this.productService.getProductsByCategory(this.filtro).subscribe(res => {
      this.productos = res.data;
    }, err => {
      console.error(err);
    })
  }
}
