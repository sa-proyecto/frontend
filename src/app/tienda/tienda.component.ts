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
  alerta = '';
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

  VerificarFecha(prod: Product): boolean {
    const now = new Date().getTime();
    return prod.fecha_subasta ? Number(prod.fecha_subasta)*1000 > now: false;
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
        console.log(res);
        if (res.status === 'success') {
          this.categorias = res.data;
        }
      });
  }

  addToCartNormal(prod: Product): void {
    this.cart.addNormal(prod);
    this.cartService.setCart(this.cart);
  }

  addToCartAhora(prod: Product): void {
    this.cart.addAhora(prod);
    this.cartService.setCart(this.cart);
    this.goToCart();
  }

  goToCart(): void {
    this.router.navigate(['carrito']);
  }

  filtrar(): void {
    this.productService.getProductsByCategory(this.filtro).subscribe(res => {
      this.productos = res.data;
    }, err => {
      console.error(err);
    })
  }

  addFavorite(idProducto: number): void {
    const idcliente = JSON.parse(localStorage.getItem('cliente')).id_cliente;
    this.productService.addFavorite(idcliente, idProducto).subscribe();
  }
}
