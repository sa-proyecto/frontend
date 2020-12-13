import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../api/auth.service';
import { Cliente } from '../api/cliente';
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
          Validators.maxLength(8),
          Validators.minLength(8)
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
      idcliente: ['',
        Validators.compose([
          Validators.required,
        ]),],
      foto: ['',
        Validators.compose([
          Validators.required,
        ]),],
    }, {
      validator: MustMatch('contrasena', 'contrasena_confirm'),
    });
    this.clientDataForm.patchValue({
      idcliente: JSON.parse(localStorage.getItem('cliente')) as Cliente,
      foto: localStorage.getItem('foto'),
    });
  }

  submit() {
    this.sumbitted = true;
    if (!this.clientDataForm.valid) {
      return;
    }
    this.authService.clienteUpdate(this.clientDataForm.value)
      .subscribe((res) => {
        if (res.status === 'success') {
          const cliente: Cliente = { ...JSON.parse(localStorage.getItem('cliente')), ...this.clientDataForm.value };
          localStorage.setItem('cliente', JSON.stringify(cliente));
          this.clientDataForm.reset();
          this.sumbitted = false;
        } else {
          setTimeout(() => this.alerta = res.message, 0);
        }
      }, (err) => {
        setTimeout(() => this.alerta = 'Error: ' + err.message, 0);
      });
  }

}
