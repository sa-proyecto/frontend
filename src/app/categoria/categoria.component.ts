import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../api/auth.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {
  private focus1: boolean;
  private sumbitted = false;
  form: FormGroup;
  alerta = '';

  constructor(
    private formBuilder: FormBuilder,
    // private productService: ProductService,
    private router: Router,
  ) { }

  get Form(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get Focus1(): boolean {
    return this.focus1;
  }

  set Focus1(val: boolean) {
    this.focus1 = val;
  }

  get Submitted(): boolean {
    return this.sumbitted;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['',
        Validators.compose([
          Validators.required,
        ]),
      ],
    });
  }

  submit() {
    this.sumbitted = true;
    if (!this.form.valid) {
      return;
    }
    // this.productService.addCategory(this.form.value)
    //   .subscribe((res) => {
    //     if (res.status === 'success') {
    //       // Accion de éxito
    //     } else {
    //       // Accion de fallo
    //       setTimeout(() => this.alerta = res.message, 0);
    //     }
    //   }, (err) => {
    //     // Accion de error
    //     setTimeout(() => this.alerta = 'Error: ' + err.error.message, 0);
    //   });
  }
}
