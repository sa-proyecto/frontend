import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { RegisterpageComponent } from './registerpage.component';

describe('ModificarProveedorComponent', () => {
  let component: RegisterpageComponent;
  let fixture: ComponentFixture<RegisterpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),

      ],
      declarations: [ RegisterpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario de proveedor invalido cuando esta vacio', () => {
    expect(component.registerProveedorForm.valid).toBeFalsy();
  });

  it('validar formulario proveedor', () => {
    component.registerProveedorForm.patchValue({
      nombre_empresa: 'a',
      email: 'a@a',
      direccion: 'a',
      contrasena: 'a',
      contrasena_confirm: 'a'
    });
    expect(component.registerProveedorForm.valid).toBeTruthy();
  });

  it('validar formulario proveedor correo correcto', () => {
    component.registerProveedorForm.patchValue({
      nombre_empresa: 'a',
      email: 'a',
      direccion: 'a',
      contrasena: 'a',
      contrasena_confirm: 'a'
    });
    const email = component.registerProveedorForm.controls.email;
    const errors = email.errors;
    expect(errors.email).toBeTruthy();
  });

  it('validar formulario proveedor contrasena correcto', () => {
    component.registerProveedorForm.patchValue({
      nombre_empresa: 'a',
      email: 'a',
      direccion: 'a',
      contrasena: 'a',
      contrasena_confirm: 'b'
    });
    const contrasena_confirm = component.registerProveedorForm.controls.contrasena_confirm;
    const errors = contrasena_confirm.errors;
    console.log(errors);
    expect(errors.mustMatch).toBeTruthy();
  });
});
