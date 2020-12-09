import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../api/auth.service';
import { MustMatch } from '../must-mach.validator';

@Component({
  selector: 'app-modificar-cliente',
  templateUrl: './modificar-cliente.component.html',
  styleUrls: ['./modificar-cliente.component.scss']
})
export class ModificarClienteComponent implements OnInit {
  private focus1: boolean;
  private focus2: boolean;
  private focus3: boolean;
  private focus4: boolean;
  private focus5: boolean;
  private sumbitted = false;
  clientDataForm: FormGroup;
  alerta = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  get Form(): { [key: string]: AbstractControl } {
    return this.clientDataForm.controls;
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

  ngOnInit(): void {
    this.clientDataForm = this.formBuilder.group({
      nombre: ['',
        Validators.compose([
          Validators.required,
        ]),
      ],
      apellido: ['',
        Validators.compose([
          Validators.required,
        ]),
      ],
      celular: ['',
        Validators.compose([
          Validators.required,
          Validators.max(8)
        ]),
      ],
      email: ['',
        Validators.compose([
          Validators.required,
          Validators.email,
        ]),
      ],
      contrasena: ['',
        Validators.compose([
          Validators.required,
        ]),
      ],
      contrasena_confirm: ['',
        Validators.compose([
          Validators.required,
        ]),
      ],
      idcliente: [''],
      foto: [''],
    }, {
      validator: MustMatch('contrasena', 'contrasena_confirm'),
    });
  }

  submit() {
    this.sumbitted = true;
    this.clientDataForm.patchValue({
      idcliente: sessionStorage.getItem('id_cliente'),
      foto: sessionStorage.getItem('foto'),
    });
    if (!this.clientDataForm.valid) {
      return;
    }
    this.authService.clienteUpdate(this.clientDataForm.value)
      .subscribe((res) => {
        if (res.status === 'success') {
          sessionStorage.setItem('nombre', this.clientDataForm.value.nombre);
          sessionStorage.setItem('apellido', this.clientDataForm.value.apellido);
          sessionStorage.setItem('email', this.clientDataForm.value.email);
          sessionStorage.setItem('contrasena', this.clientDataForm.value.contrasena);
          sessionStorage.setItem('foto', this.clientDataForm.value.foto);
          sessionStorage.setItem('celular', this.clientDataForm.value.celular);
          this.router.navigate(['']); // Ir al inicio
        } else {
          setTimeout(() => this.alerta = res.message, 0);
        }
      }, (err) => {
        setTimeout(() => this.alerta = 'Error: ' + err.error.message, 0);
      });
  }

}
