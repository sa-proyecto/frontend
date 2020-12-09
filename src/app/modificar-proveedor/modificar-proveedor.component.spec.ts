import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { ModificarProveedorComponent } from './modificar-proveedor.component';

describe('ModificarProveedorComponent', () => {
  let component: ModificarProveedorComponent;
  let fixture: ComponentFixture<ModificarProveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),

      ],
      declarations: [ ModificarProveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario invalido cuando esta vacio', () => {
    expect(component.providerDataForm.valid).toBeFalsy();
  });

  it('validar formulario', () => {
    component.providerDataForm.patchValue({
      nombre: 'a',
      email: 'a@a',
      direccion: 'a',
      contrasena: 'a',
      contrasena_confirm: 'a',
      id: '1'
    });
    expect(component.providerDataForm.valid).toBeTruthy();
  });

  it('validar formulario correo correcto', () => {
    component.providerDataForm.patchValue({
      nombre: 'a',
      email: 'a',
      direccion: 'a',
      contrasena: 'a',
      contrasena_confirm: 'a',
      id: '1'
    });
    const email = component.providerDataForm.controls.email;
    const errors = email.errors;
    expect(errors.email).toBeTruthy();
  });

});
