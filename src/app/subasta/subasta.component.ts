import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    return this.ofertas.length > 0 ? this.ofertas[0].valor_puja : 0;
  }

  get Ofertas(): { fecha_puja: string, nombre_usuario: string, id_usuario: number, valor_puja: number, }[] {
    return this.ofertas;
  }

  // get Bids(): { fecha_puja: string, nombre_usuario: string, id_usuario: number, valor_puja: number, }[] {
  //   return [
  //     { fecha_puja: '2020/01/02 14:42', nombre_usuario: 'Mario Alvarado', id_usuario: 22, valor_puja: 99.25 },
  //     { fecha_puja: '2020/01/02 14:42', nombre_usuario: 'Guillermo Medinilla', id_usuario: 50, valor_puja: 30.50 },
  //     { fecha_puja: '2020/01/01 12:33', nombre_usuario: 'Mario Alvarado', id_usuario: 22, valor_puja: 25.00 },
  //   ];
  // }

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
    }, 10000);
  }

}
