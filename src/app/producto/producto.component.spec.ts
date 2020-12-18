import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

import { ProductoComponent } from './producto.component';

describe('ProductoComponent', () => {
  let component: ProductoComponent;
  let fixture: ComponentFixture<ProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        FormsModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario invalido cuando esta vacio', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('validar formulario', () => {
    component.form.patchValue({
      nombre: 'a',
      descripcion: 'a',
      stock: '12345678',
      precio: '1111',
      categoria: '1',
      proveedor: '1',
      foto: 'imagen.png',
      precio_subasta: '10',
      fecha_subasta: 'hoy',
      precio_compra: '11',
      cliente: '22'
    });
    expect(component.form.valid).toBeTruthy();
  });
});
