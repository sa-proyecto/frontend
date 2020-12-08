import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../api/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  templateUrl: 'loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
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
    console.log(this.loginForm.value)
    this.authService.login(this.loginForm.value)
      .subscribe((res) => {
        if (res.data.status === 'success') {
          sessionStorage.setItem('userid', res.data);
          this.router.navigate([''])
        } else {
          setTimeout(() => this.alerta = 'Alerta: credenciales no validas', 0);
        }
      }, (err) => {
        setTimeout(() => this.alerta = 'Error: ' + err.error.mensaje, 0);
      });
  }

}
