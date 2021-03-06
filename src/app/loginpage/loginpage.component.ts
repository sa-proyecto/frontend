import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../api/auth.service';
import { Router } from '@angular/router';
import { Cliente } from '../api/cliente';
import { ExternalService } from '../api/external.service';
import { Proveedor } from '../api/proveedor';

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
    private externalService: ExternalService,
    private router: Router,
  ) { }

  get f() {
    return this.loginForm.controls;
  }

  get Submitted(): boolean {
    return this.submitted;
  }

  get IsAdmin(): boolean {
    return this.f.email.value === 'admin@econoahorro.com';
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
    // credenciales de admin
    if (this.loginForm.value.email === 'admin@econoahorro.com'
      && this.loginForm.value.contrasena === 'admin') {
      this.router.navigate(['admin']).then(() => {
        window.location.reload();
      });
    }
    if (!this.loginForm.valid) {
      return;
    }
    if (ExternalService.selectedGroup) {
      this.externalLogin();
      return;
    }
    this.localLogin();
  }

  localLogin() {
    this.authService.login(this.loginForm.value)
      .subscribe((res) => {
        if (res.status === 'success') {
          if (Number(this.loginForm.value.tipousuario) === 1) {
            const usuario: Cliente = res.data;
            localStorage.setItem('cliente', JSON.stringify(usuario));
            this.router.navigate(['tienda']).then(() => {
              window.location.reload();
            });
          } else {
            this.authService.refreshProvider(res.data).subscribe((res2) => {
              localStorage.setItem('proveedor', JSON.stringify({ ...res2.data, ...{ id_proveedor: res.data } }));
              this.router.navigate(['mi-perfil']).then(() => {
                window.location.reload();
              });
            }, (err) => {
              setTimeout(() => this.alerta = 'Error: ' + err.message, 0);
            });
          }
        } else {
          setTimeout(() => this.alerta = res.message, 0);
        }
      }, (err) => {
        setTimeout(() => this.alerta = 'Error: ' + err.message, 0);
      });
  }
  externalLogin() {
    if (Number(this.loginForm.controls.tipousuario.value) === 1) {
      this.externalService.loginCliente(this.loginForm.value)
        .subscribe((res) => {
          if (res.status === 'success') {
            const tmp = res.data;
            tmp.id_cliente = tmp.id;
            delete tmp.id;
            const usuario: Cliente = tmp;
            localStorage.setItem('cliente', JSON.stringify(usuario));
            this.router.navigate(['tienda']).then(() => {
              window.location.reload();
            });
          } else {
            setTimeout(() => this.alerta = res.message, 0);
          }
        }, (err) => {
          setTimeout(() => this.alerta = 'Error: ' + err.message, 0);
        });
      return;
    }
    this.externalService.loginProveedor(this.loginForm.value)
      .subscribe((res) => {
        if (res.status === 'success') {
          const tmp = res.data;
          tmp.id_proveedor = tmp.id;
          delete tmp.id;
          tmp.nombre_empresa = tmp.empresa;
          delete tmp.empresa;
          const usuario: Proveedor = tmp;
          localStorage.setItem('proveedor', JSON.stringify(usuario));
          this.router.navigate(['producto']).then(() => {
            window.location.reload();
          });
        } else {
          setTimeout(() => this.alerta = res.message, 0);
        }
      }, (err) => {
        setTimeout(() => this.alerta = 'Error: ' + err.message, 0);
      });
  }
}
