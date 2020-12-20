import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../api/product';
import { ProductService } from '../api/product.service';

@Component({
  selector: 'app-subasta',
  templateUrl: './subasta.component.html',
  styleUrls: ['./subasta.component.scss']
})
export class SubastaComponent implements OnInit {
  private id: number;
  private producto: Product;
  private focus: boolean;
  private ofertas: { fecha_puja: string, nombre_usuario: string, id_usuario: number, valor_puja: number, }[] = [];
  private newBid: number;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  get Focus(): boolean {
    return this.focus;
  }

  set Focus(val: boolean) {
    this.focus = val;
  }

  get Producto(): Product {
    return this.producto;
  }

  get CurrentBid(): number {
    return this.ofertas.length > 0 ? this.ofertas[0].valor_puja : this.producto ? this.producto.sprecio_subasta: 0;
  }

  get Ofertas(): { fecha_puja: string, nombre_usuario: string, id_usuario: number, valor_puja: number, }[] {
    return this.ofertas;
  }

  get NewBid(): number {
    return this.newBid;
  }

  set NewBid(val: number) {
    this.newBid = val;
  }

  save() {
    this.productService.hacerOfertas(
      this.id.toString(),
      this.newBid.toString(),
      JSON.parse(localStorage.getItem('cliente')).id_cliente
    ).subscribe(res => {
      if (res.status === 'success') {
        this.newBid = null;
      }
    });
    this.verOfertas();
  }

  verOfertas(): void {
    this.productService.verOfertas(this.id.toString()).subscribe(res => {
      if (res.status === 'success') {
        this.ofertas = res.data;
      }
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = Number(params.id);
      if (this.id) {
        this.productService.getProductById(this.id.toString()).subscribe(res => {
          this.producto = res.data[0];
          this.producto.fecha_subasta = res.data[0].sfecha;
        }, err => {
          console.error(err);
        });
      }
    });
    this.revisarOfertas();
  }

  revisarOfertas(): void {
    this.verOfertas();
    setTimeout(() => {
      this.revisarOfertas();
      const now = new Date().getTime() / 1000 - 360*60;
      if (now > Number(this.producto.fecha_subasta)) {
        this.router.navigate(['mi-perfil']).then(() => {
          window.location.reload();
        });
      }
    }, 5000);
  }

}
