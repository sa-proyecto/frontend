import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../api/product.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  private focus1: boolean;
  private focus2: boolean;
  private focus3: boolean;
  private focus4: boolean;
  private focus5: boolean;
  private id: number;
  private sumbitted = false;
  private categorias: { id_categoria: number, nombre: string };
  form: FormGroup;
  alerta = '';

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
  ) { }

  get Form(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get Focus1(): boolean {
    return this.focus1;
  }

  set Focus1(val: boolean) {
    this.focus1 = val;
  }

  set Focus2(val: boolean) {
    this.focus2 = val;
  }

  get Focus2(): boolean {
    return this.focus2;
  }

  set Focus3(val: boolean) {
    this.focus3 = val;
  }

  get Focus3(): boolean {
    return this.focus3;
  }

  set Focus4(val: boolean) {
    this.focus4 = val;
  }

  get Focus4(): boolean {
    return this.focus4;
  }

  get Focus5(): boolean {
    return this.focus5;
  }

  set Focus5(val: boolean) {
    this.focus5 = val;
  }

  get Submitted(): boolean {
    return this.sumbitted;
  }

  get Categorias() {
    return this.categorias;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['',
        Validators.compose([
          Validators.required,
        ]),
      ],
      descripcion: ['',
        Validators.compose([
          Validators.required,
        ]),
      ],
      stock: ['',
        Validators.compose([
          Validators.required,
        ]),
      ],
      precio: ['',
        Validators.compose([
          Validators.required,
        ]),
      ],
      categoria: ['',
        Validators.compose([
          Validators.required,
        ]),
      ],
      proveedor: ['',
        Validators.compose([
          Validators.required,
        ]),
      ],
      foto: ['',
        Validators.compose([
          Validators.required,
        ]),
      ],
    });
    this.productService.getCategories()
      .subscribe((res) => {
        if (res.status === 'success') {
          this.categorias = res.data;
        } else {
          // Accion de fallo
          setTimeout(() => this.alerta = res.message, 0);
        }
      }, (err) => {
        // Accion de error
        setTimeout(() => this.alerta = 'Error: ' + err.error.message, 0);
      });

    this.route.params.subscribe(params => {
      this.id = params.id;
      if (this.id && JSON.parse(localStorage.getItem('proveedor'))) {
        this.productService.getProducts((JSON.parse(localStorage.getItem('proveedor')).id_proveedor)).subscribe(res => {
          const products = res.data;
          const myProdArr = products.filter(o => Number(o.id_producto) === Number(this.id))
          if (myProdArr.length) {
            const myprod = myProdArr[0];
            this.form.patchValue({
              nombre: myprod.nombre,
              descripcion: myprod.descripcion,
              stock: myprod.stock,
              precio: myprod.precio_venta,
              foto: myprod.foto,
              proveedor: JSON.parse(localStorage.getItem('proveedor')).id_proveedor,
            });
            console.log(myprod)
          }
        }, err => {
          console.error(err);
        });
      }
    });
  }

  submit() {
    this.form.patchValue({ proveedor: JSON.parse(localStorage.getItem('proveedor')).id_proveedor });
    this.sumbitted = true;
    if (!this.form.valid) {
      return;
    }
    this.productService.addProduct(this.form.value)
      .subscribe((res) => {
        if (res.status === 'success') {
          this.form.reset();
          this.sumbitted = false;
          this.alerta = '';
        } else {
          // Accion de fallo
          setTimeout(() => this.alerta = res.message, 0);
        }
      }, (err) => {
        // Accion de error
        setTimeout(() => this.alerta = 'Error: ' + err.message, 0);
      });
  }
  save() {
    this.form.patchValue({ proveedor: JSON.parse(localStorage.getItem('proveedor')).id_proveedor });
    this.sumbitted = true;
    if (!this.form.valid) {
      return;
    }
    this.productService.saveProduct({ ...this.form.value, ...{ idproducto: this.id } })
      .subscribe((res) => {
        if (res.status === 'success') {
          this.sumbitted = false;
          this.alerta = '';
        } else {
          // Accion de fallo
          setTimeout(() => this.alerta = res.message, 0);
        }
      }, (err) => {
        // Accion de error
        setTimeout(() => this.alerta = 'Error: ' + err.message, 0);
      });
  }
}
