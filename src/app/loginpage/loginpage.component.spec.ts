import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginpageComponent } from './loginpage.component';

describe('ModificarProveedorComponent', () => {
  let component: LoginpageComponent;
  let fixture: ComponentFixture<LoginpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [ LoginpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario invalido cuando esta vacio', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('validar formulario', () => {
    component.loginForm.patchValue({
      email: 'a@a',
      contrasena: 'a',
      tipousuario: 1
    });
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('validar formulario correo correcto', () => {
    component.loginForm.patchValue({
      email: 'a',
      contrasena: 'a',
      tipousuario: 1
    });
    const email = component.loginForm.controls.email;
    const errors = email.errors;
    expect(errors.email).toBeTruthy();
  });
});
