import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { TarjetaComponent } from './tarjeta.component';

describe('TarjetaComponent', () => {
  let component: TarjetaComponent;
  let fixture: ComponentFixture<TarjetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TarjetaComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('formulario de registro de tarjeta invalido cuando esta vacio', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('validar formulario registro de tarjeta', () => {
    component.form.patchValue({
      pin: 12
    });
    expect(component.form.valid).toBeFalse();
    expect(component.form.controls.numerotarjeta.hasError('required')).toBeTrue();
    expect(component.form.controls.fecha_vencimiento.hasError('required')).toBeTrue();
    expect(component.form.controls.estado.hasError('required')).toBeTrue();
    expect(component.form.controls.idcliente.hasError('required')).toBeTrue();
  });
});
