import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../api/cliente';
import { Tarjeta } from '../api/tarjeta';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.scss']
})
export class TarjetaComponent implements OnInit {
  private focus1: boolean;
  private focus2: boolean;
  private focus3: boolean;
  private focus4: boolean;
  private focus5: boolean;
  private sumbitted = false;
  private categorias: { id_categoria: number, nombre: string };
  form: FormGroup;
  alerta = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
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
      numerotarjeta: ['',
        Validators.compose([
          Validators.required,
        ]),
      ],
      pin: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(4),
        ]),
      ],
      fecha_vencimiento: ['',
        Validators.compose([
          Validators.required,
        ]),
      ],
      estado: ['',
        Validators.compose([
          Validators.required,
        ]),
      ],
      idcliente: ['',
        Validators.compose([
          Validators.required,
        ]),
      ],
    });
  }

  submit() {
    this.form.patchValue({
      idcliente: JSON.parse(localStorage.getItem('cliente')).id_cliente,
      estado: '0',
    });
    this.sumbitted = true;
    if (!this.form.valid) {
      return;
    }
    this.userService.addCard(this.form.value).subscribe((res) => {
      if (res.status === 'success') {
        const cliente: Cliente = JSON.parse(localStorage.getItem('cliente'));
        const tmp = this.form.value;
        tmp.numero_tarjeta = this.form.value.numerotarjeta.toString();
        tmp.estado = Number(this.form.value.estado);
        delete tmp.numerotarjeta;
        delete tmp.idcliente;
        const tarjeta: Tarjeta = tmp;
        console.log(tarjeta);
        cliente.tarjetas.push(tarjeta);
        localStorage.setItem('cliente', JSON.stringify(cliente));
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
}
