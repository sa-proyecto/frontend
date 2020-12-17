import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { idLocale } from 'ngx-bootstrap/chronos';
import { Cliente } from '../api/cliente';
import { ProductService } from '../api/product.service';
import { Proveedor } from '../api/proveedor';
import { Tarjeta } from '../api/tarjeta';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent implements OnInit {
  private cliente: Cliente;
  private proveedor: Proveedor;
  form: FormGroup;
  alerta = '';
  private productos;
  private ventas;
  private ver;
  private favoritos;
  private facturas;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private productService: ProductService,
  ) { }

  get Tarjetas(): any[] {
    return this.cliente.tarjetas.filter(o => {
      return Number(o.estado) === 0;
    });
  }

  get Favoritos(): any[] {
    return this.favoritos;
  }
  get Facturas(): any[] {
    return this.facturas;
  }
  get Cliente(): Cliente {
    return this.cliente;
  }

  get Productos(): any[] {
    return this.productos;
  }

  get Proveedor(): Proveedor {
    return this.proveedor;
  }

  get Ventas(): any[] {
    return this.ventas;
  }

  get Foto(): string {
    return this.cliente.foto && this.cliente.foto !== 'undefined' ? this.cliente.foto : '/assets/img/placeholder.jpg'
  }

  get Ver(): string {
    return this.ver;
  }

  ngOnInit(): void {
    this.cliente = JSON.parse(localStorage.getItem('cliente'));
    this.proveedor = JSON.parse(localStorage.getItem('proveedor'));
    if (this.proveedor) {
      this.productService.getProducts(this.proveedor.id_proveedor.toString()).subscribe((res) => {
        this.productos = res.data;
      }, (err) => {
        console.error(err);
      });
      this.userService.getVentas(this.proveedor.id_proveedor.toString()).subscribe(res => {
        this.ventas = res.data;
      }, err => {
        console.error(err);
      });
    }
    if (this.cliente) {
      this.productService.viewFavorite(this.cliente.id_cliente).subscribe(res => {
        this.favoritos = res.data;
      });
      this.userService.getFacturas(this.cliente.id_cliente.toString()).subscribe(res => {
        if (res.status === 'success') {
          this.facturas = res.data;
        }
      });
    }
    this.form = this.formBuilder.group({
      numerotarjeta: ['',
        Validators.compose([
          Validators.required,
        ]),
      ],
    });
  }

  eliminarTarjeta(numerotarjeta) {
    this.form.patchValue({ numerotarjeta });

    if (!this.form.valid) {
      return;
    }
    this.userService.removeCard(this.form.value).subscribe((res) => {
      if (res.status === 'success') {
        // remover tarjeta de localstorage
        for (let index = 0; index < this.cliente.tarjetas.length; index++) {
          const tarjeta: Tarjeta = this.cliente.tarjetas[index];
          if (Number(tarjeta.numero_tarjeta) === Number(numerotarjeta)) {
            this.cliente.tarjetas.splice(index, 1);
            localStorage.setItem('cliente', JSON.stringify(this.cliente));
            break;
          }
        }
        this.alerta = '';
      } else {
        setTimeout(() => this.alerta = res.message, 0);
      }
    }, (err) => {
      setTimeout(() => this.alerta = 'Error: ' + err.message, 0);
    });
  }

  eliminarProducto(idprod): void {
    const id_proveedor = this.proveedor.id_proveedor;
    this.productService.removeProduct({ id_producto: idprod, id_proveedor }).subscribe((res) => {
      if (res.status === 'success') {
        this.productos = this.productos.filter(o => {
          return o.id_producto !== idprod;
        })
        this.alerta = '';
      } else {
        setTimeout(() => this.alerta = res.message, 0);
      }
    }, (err) => {
      setTimeout(() => this.alerta = 'Error: ' + err.message, 0);
    });
  }

  removerFavorito(idprod): void {
    const idcliente = JSON.parse(localStorage.getItem('cliente')).id_cliente;
    this.productService.removeFavorite(idcliente, idprod).subscribe(res => {
      if (res.status === 'success') {
        for (let index = 0; index < this.favoritos.length; index++) {
          const element:{nombre: string, id_producto: number} = this.favoritos[index];
          if (Number(idprod) === Number(element.id_producto)) {
            this.favoritos.splice(index,1);
            break;
          }
        }
      }
    });
  }

}
