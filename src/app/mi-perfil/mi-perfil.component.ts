import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../api/cliente';
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

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) { }

  get Cliente(): Cliente {
    return this.cliente;
  }

  get Proveedor(): Proveedor {
    return this.proveedor;
  }

  get Foto(): string {
    return this.cliente.foto && this.cliente.foto !== 'undefined' ? this.cliente.foto : '/assets/img/placeholder.jpg'
  }

  ngOnInit(): void {
    this.cliente = JSON.parse(localStorage.getItem('cliente'));
    this.proveedor = JSON.parse(localStorage.getItem('proveedor'));
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
            localStorage.setItem('cliente',JSON.stringify(this.cliente));
            break;
          }
        }
      } else {
        setTimeout(() => this.alerta = res.message, 0);
      }
    }, (err) => {
      setTimeout(() => this.alerta = 'Error: ' + err.message, 0);
    })
  }

}
