import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router,
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
    this.form.patchValue({ idcliente: sessionStorage.getItem('id_cliente') });
  }

  submit() {
    this.sumbitted = true;
    if (!this.form.valid) {
      return;
    }
    this.userService.addCard(this.form.value).subscribe((res) => {
      if (res.status === 'success') {
        const index = parseInt(sessionStorage.getItem('tarjetas'), 10);
        const tarjetas = index + 1;
        sessionStorage.setItem('tarjetas', tarjetas.toString());
        sessionStorage.setItem(index + 'estado', this.form.controls.estado.value);
        sessionStorage.setItem(index + 'fecha_vencimiento', this.form.controls.fecha_vencimiento.value);
        sessionStorage.setItem(index + 'numero_tarjeta', this.form.controls.numerotarjeta.value);
        sessionStorage.setItem(index + 'pin', this.form.controls.pin.value);
        this.form.reset();
        this.sumbitted = false;
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
