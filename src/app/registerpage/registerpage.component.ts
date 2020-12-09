import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../api/auth.service';
import { MustMatch } from '../must-mach.validator';

@Component({
  selector: 'app-registerpage',
  templateUrl: 'registerpage.component.html'
})
export class RegisterpageComponent implements OnInit, OnDestroy {
  private focus1: boolean;
  private focus2: boolean;
  private focus3: boolean;
  private focus4: boolean;
  private focus5: boolean;
  private sumbitted = false;
  registerProveedorForm: FormGroup;
  alerta = '';
  private focus21: boolean;
  private focus22: boolean;
  private focus23: boolean;
  private focus24: boolean;
  private focus25: boolean;
  private focus26: boolean;
  private sumbitted2 = false;
  registerClienteForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  get fproveedor() {
    return this.registerProveedorForm.controls;
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

  get fcliente() {
    return this.registerClienteForm.controls;
  }

  get Focus21(): boolean {
    return this.focus21;
  }

  set Focus21(val: boolean) {
    this.focus21 = val;
  }

  set Focus22(val: boolean) {
    this.focus22 = val;
  }

  get Focus22(): boolean {
    return this.focus22;
  }

  set Focus23(val: boolean) {
    this.focus23 = val;
  }

  get Focus23(): boolean {
    return this.focus23;
  }

  set Focus24(val: boolean) {
    this.focus24 = val;
  }

  get Focus24(): boolean {
    return this.focus24;
  }

  get Focus25(): boolean {
    return this.focus25;
  }

  set Focus25(val: boolean) {
    this.focus25 = val;
  }

  get Focus26(): boolean {
    return this.focus26;
  }

  set Focus26(val: boolean) {
    this.focus26 = val;
  }

  get Submitted2(): boolean {
    return this.sumbitted2;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e) {
    const squares1 = document.getElementById('square1');
    const squares2 = document.getElementById('square2');
    const squares3 = document.getElementById('square3');
    const squares4 = document.getElementById('square4');
    const squares5 = document.getElementById('square5');
    const squares6 = document.getElementById('square6');
    const squares7 = document.getElementById('square7');
    const squares8 = document.getElementById('square8');

    const posX = e.clientX - window.innerWidth / 2;
    const posY = e.clientY - window.innerWidth / 6;

    squares1.style.transform =
      'perspective(500px) rotateY(' +
      posX * 0.05 +
      'deg) rotateX(' +
      posY * -0.05 +
      'deg)';
    squares2.style.transform =
      'perspective(500px) rotateY(' +
      posX * 0.05 +
      'deg) rotateX(' +
      posY * -0.05 +
      'deg)';
    squares3.style.transform =
      'perspective(500px) rotateY(' +
      posX * 0.05 +
      'deg) rotateX(' +
      posY * -0.05 +
      'deg)';
    squares4.style.transform =
      'perspective(500px) rotateY(' +
      posX * 0.05 +
      'deg) rotateX(' +
      posY * -0.05 +
      'deg)';
    squares5.style.transform =
      'perspective(500px) rotateY(' +
      posX * 0.05 +
      'deg) rotateX(' +
      posY * -0.05 +
      'deg)';
    squares6.style.transform =
      'perspective(500px) rotateY(' +
      posX * 0.05 +
      'deg) rotateX(' +
      posY * -0.05 +
      'deg)';
    squares7.style.transform =
      'perspective(500px) rotateY(' +
      posX * 0.02 +
      'deg) rotateX(' +
      posY * -0.02 +
      'deg)';
    squares8.style.transform =
      'perspective(500px) rotateY(' +
      posX * 0.02 +
      'deg) rotateX(' +
      posY * -0.02 +
      'deg)';
  }
  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('register-page');
    this.registerProveedorForm = this.formBuilder.group({
      nombre_empresa: ['',
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
    }, {
      validator: MustMatch('contrasena', 'contrasena_confirm'),
    });

    this.registerClienteForm = this.formBuilder.group({
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
      celular: ['',
        Validators.compose([
          Validators.required,
          Validators.maxLength(8),
          Validators.minLength(8)
        ]),
      ],
      contrasena_confirm: ['',
        Validators.compose([
          Validators.required,
        ]),
      ],
    }, {
      validator: MustMatch('contrasena', 'contrasena_confirm'),
    });
  }

  proveedorRegister() {
    this.sumbitted = true;
    if (!this.registerProveedorForm.valid) {
      return;
    }
    this.authService.proveedorRegister(this.registerProveedorForm.value)
    .subscribe((res) => {
      if (res.status === 'success') {
        this.router.navigate(['login']);
      } else {
        setTimeout(() => this.alerta = res.message, 0);
      }
    }, (err) => {
      setTimeout(() => this.alerta = 'Error: ' + err.error.message, 0);
    });
  }

  clienteRegister() {
    this.sumbitted2 = true;
    if (!this.registerClienteForm.valid) {
      return;
    }
    console.log(this.registerClienteForm.value);
    this.authService.clienteRegister(this.registerClienteForm.value)
    .subscribe((res) => {
      if (res.status === 'success') {
        this.router.navigate(['login']);
      } else {
        setTimeout(() => this.alerta = res.message, 0);
      }
    }, (err) => {
      setTimeout(() => this.alerta = 'Error: ' + err.error.message, 0);
    });
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('register-page');
  }
}
