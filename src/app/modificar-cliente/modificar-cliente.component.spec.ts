import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModificarClienteComponent } from './modificar-cliente.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ModificarClienteComponent', () => {
  let component: ModificarClienteComponent;
  let fixture: ComponentFixture<ModificarClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),

      ],
      declarations: [ModificarClienteComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario invalido cuando esta vacio', () => {
    expect(component.clientDataForm.valid).toBeFalsy();
  });

  it('validar formulario', () => {
    component.clientDataForm.patchValue({
      nombre: 'a',
      apellido: 'a',
      celular: '12345678',
      email: 'a@a',
      contrasena: 'a',
      contrasena_confirm: 'a',
      idcliente: '1',
      foto: 'a'
    });
    expect(component.clientDataForm.valid).toBeTruthy();
  });

  it('validar formulario celular correcto', () => {
    component.clientDataForm.patchValue({
      nombre: 'a',
      apellido: 'a',
      celular: '1234567',
      email: 'a@a',
      contrasena: 'a',
      contrasena_confirm: 'a',
      idcliente: '1',
      foto: 'a'
    });
    const celular = component.clientDataForm.controls.celular;
    const errors = celular.errors;
    expect(errors.minlength).toBeTruthy();
  });

  it('validar formulario celular correcto', () => {
    component.clientDataForm.patchValue({
      nombre: 'a',
      apellido: 'a',
      celular: '123456789',
      email: 'a@a',
      contrasena: 'a',
      contrasena_confirm: 'a',
      idcliente: '1',
      foto: 'a'
    });
    const celular = component.clientDataForm.controls.celular;
    const errors = celular.errors;
    expect(errors.maxlength).toBeTruthy();
  });

  it('validar formulario contrasena correcto', () => {
    component.clientDataForm.patchValue({
      nombre: 'a',
      apellido: 'a',
      celular: '12345678',
      email: 'a@a',
      contrasena: 'a',
      contrasena_confirm: 'b',
      idcliente: '1',
      foto: 'a'
    });
    const contrasena_confirm = component.clientDataForm.controls.contrasena_confirm;
    const errors = contrasena_confirm.errors;
    expect(errors.mustMatch).toBeTruthy();
  });

  it('validar formulario correo correcto', () => {
    component.clientDataForm.patchValue({
      nombre: 'a',
      apellido: 'a',
      celular: '12345678',
      email: 'a',
      contrasena: 'a',
      contrasena_confirm: 'a',
      idcliente: '1',
      foto: 'a'
    });
    const email = component.clientDataForm.controls.email;
    const errors = email.errors;
    expect(errors.email).toBeTruthy();
  });

});
