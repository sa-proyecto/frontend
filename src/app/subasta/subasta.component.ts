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
  private newBid: number;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
  ) { }

  get Producto(): Product {
    return this.producto;
  }

  get CurrentBid(): number {
    return 99.25;
  }

  get Bids(): { fecha_puja: string, nombre_usuario: string, id_usuario: number, valor_puja: number, }[] {
    return [
      { fecha_puja: '2020/01/02 14:42', nombre_usuario: 'Mario Alvarado', id_usuario: 22, valor_puja: 99.25 },
      { fecha_puja: '2020/01/02 14:42', nombre_usuario: 'Guillermo Medinilla', id_usuario: 50, valor_puja: 30.50 },
      { fecha_puja: '2020/01/01 12:33', nombre_usuario: 'Mario Alvarado', id_usuario: 22, valor_puja: 25.00 },
    ];
  }

  get NewBid(): number {
    return this.newBid;
  }

  set NewBid(val: number) {
    this.newBid = val;
  }

  save() {
    console.log(this.NewBid);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = Number(params.id);
      if (this.id && JSON.parse(localStorage.getItem('proveedor'))) {
        this.productService.getAllProducts(0).subscribe(res => {
          this.producto = res.data.find(o => {
            return Number(o.id_producto) === this.id;
          });
          console.log(this.producto);
        }, err => {
          console.error(err);
        });
      }
    });
  }

}
