import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../api/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  templateUrl: 'loginpage.component.html'
})
export class LoginpageComponent implements OnInit, OnDestroy {
  focus: boolean;
  focus1: boolean;
  focus2: boolean;
  private submitted = false;
  loginForm: FormGroup;
  alerta = '';
  tipoUsuario: { id: number, text: string }[] = [{ id: 1, text: 'Cliente' }, { id: 2, text: 'Proveedor' }];
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  get f() {
    return this.loginForm.controls;
  }

  get Submitted(): boolean {
    return this.submitted;
  }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');
    this.loginForm = this.formBuilder.group({
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
      tipousuario: ['',
        Validators.compose([
          Validators.required,
        ]),
      ],
    });
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');
  }

  login(): void {
    this.submitted = true;
    if (!this.loginForm.valid) {
      return;
    }
    this.authService.login(this.loginForm.value)
      .subscribe((res) => {
        if (res.status === 'success') {
          if (Number(this.loginForm.value.tipousuario) === 1) {
            sessionStorage.setItem('apellido', res.data.apellido);
            sessionStorage.setItem('celular', res.data.celular);
            sessionStorage.setItem('contrasena', res.data.contrasena);
            sessionStorage.setItem('email', res.data.email);
            sessionStorage.setItem('foto', res.data.foto);
            sessionStorage.setItem('id_cliente', res.data.id_cliente);
            sessionStorage.setItem('nombre', res.data.nombre);
            sessionStorage.setItem('tarjetas', res.data.tarjetas.length);
            for (let index = 0; index < res.data.tarjetas.length; index++) {
              const tarjeta = res.data.tarjetas[index];
              sessionStorage.setItem(index + 'estado', tarjeta.estado);
              sessionStorage.setItem(index + 'fecha_vencimiento', tarjeta.fecha_vencimiento);
              sessionStorage.setItem(index + 'numero_tarjeta', tarjeta.numero_tarjeta);
              sessionStorage.setItem(index + 'pin', tarjeta.pin);
            }
          } else {
            sessionStorage.setItem('id_proveedor', res.data);
          }
          this.router.navigate([''])
        } else {
          setTimeout(() => this.alerta = res.message, 0);
        }
      }, (err) => {
        console.log(err);
        setTimeout(() => this.alerta = 'Error: ' + err.message, 0);
      });
  }

}
