import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { RegisterpageComponent } from './registerpage.component';

describe('RegisterpageComponent', () => {
  let component: RegisterpageComponent;
  let fixture: ComponentFixture<RegisterpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        TabsModule.forRoot(),
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

  it('formulario de proveedor invalido cuando esta vacio', () => {
    expect(component.registerClienteForm.valid).toBeFalsy();
  });

  it('validar formulario cliente', () => {
    component.registerClienteForm.patchValue({
      nombre: 'a',
      apellido: 'a',
      celular: '12345678',
      email: 'a@a',
      contrasena: 'a',
      contrasena_confirm: 'a'
    });
    expect(component.registerClienteForm.valid).toBeTruthy();
  });

  it('validar formulario celular correcto', () => {
    component.registerClienteForm.patchValue({
      nombre: 'a',
      apellido: 'a',
      celular: '1234567',
      email: 'a@a',
      contrasena: 'a',
      contrasena_confirm: 'a'
    });
    const celular = component.registerClienteForm.controls.celular;
    const errors = celular.errors;
    expect(errors.minlength).toBeTruthy();
  });

  it('validar formulario celular correcto', () => {
    component.registerClienteForm.patchValue({
      nombre: 'a',
      apellido: 'a',
      celular: '123456789',
      email: 'a@a',
      contrasena: 'a',
      contrasena_confirm: 'a'
    });
    const celular = component.registerClienteForm.controls.celular;
    const errors = celular.errors;
    expect(errors.maxlength).toBeTruthy();
  });

  it('validar formulario contrasena correcto', () => {
    component.registerClienteForm.patchValue({
      nombre: 'a',
      apellido: 'a',
      celular: '12345678',
      email: 'a@a',
      contrasena: 'a',
      contrasena_confirm: 'b'
    });
    const contrasena_confirm = component.registerClienteForm.controls.contrasena_confirm;
    const errors = contrasena_confirm.errors;
    console.log(errors);
    expect(errors.mustMatch).toBeTruthy();
  });

  it('validar formulario correo correcto', () => {
    component.registerClienteForm.patchValue({
      nombre: 'a',
      apellido: 'a',
      celular: '12345678',
      email: 'a',
      contrasena: 'a',
      contrasena_confirm: 'a'
    });
    const email = component.registerClienteForm.controls.email;
    const errors = email.errors;
    expect(errors.email).toBeTruthy();
  });

});
