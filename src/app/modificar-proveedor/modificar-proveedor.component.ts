import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../api/auth.service';
import { Proveedor } from '../api/proveedor';
import { MustMatch } from '../must-mach.validator';

@Component({
  selector: 'app-modificar-proveedor',
  templateUrl: './modificar-proveedor.component.html',
  styleUrls: ['./modificar-proveedor.component.scss']
})
export class ModificarProveedorComponent implements OnInit {
  private focus1: boolean;
  private focus2: boolean;
  private focus3: boolean;
  private focus4: boolean;
  private focus5: boolean;
  private sumbitted = false;
  providerDataForm: FormGroup;
  alerta = '';
  private proveedor: Proveedor;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  get Form(): { [key: string]: AbstractControl } {
    return this.providerDataForm.controls;
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
    this.proveedor = JSON.parse(localStorage.getItem('proveedor'));
    this.providerDataForm = this.formBuilder.group({
      nombre: ['',
        Validators.compose([
          Validators.required,
        ]),
      ],
      email: ['',
        Validators.compose([
          Validators.required,
          Validators.email,
        ]),
      ],
      direccion: ['',
        Validators.compose([
          Validators.required,
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
      id: [''],
    }, {
      validator: MustMatch('contrasena', 'contrasena_confirm'),
    });
  }

  submit() {
    this.sumbitted = true;
    this.providerDataForm.patchValue({
      id: this.proveedor.id_proveedor,
    });
    if (!this.providerDataForm.valid) {
      return;
    }
    this.authService.proveedorUpdate(this.providerDataForm.value)
    .subscribe((res) => {
      if (res.status === 'success') {
        this.authService.refreshProvider(this.proveedor.id_proveedor);
        this.providerDataForm.reset();
        this.sumbitted = false;
      } else {
        setTimeout(() => this.alerta = res.message, 0);
      }
    }, (err) => {
      setTimeout(() => this.alerta = 'Error: ' + err.message, 0);
    });
  }

}
