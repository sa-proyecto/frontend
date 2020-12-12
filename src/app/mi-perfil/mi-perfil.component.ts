import { Component, OnInit } from '@angular/core';
import { Cliente } from '../api/cliente';
import { Proveedor } from '../api/proveedor';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent implements OnInit {
  private cliente: Cliente;
  private proveedor: Proveedor;

  constructor() { }

  get Cliente(): Cliente {
    return this.cliente;
  }

  get Proveedor(): Proveedor {
    return this.proveedor;
  }

  get Foto(): string {
    return this.cliente.foto && this.cliente.foto !== 'undefined' ? this.cliente.foto : '/assets/img/placeholder.jpg'
  }

  ngOnInit(): void {
    this.cliente = JSON.parse(localStorage.getItem('cliente'));
    this.proveedor = JSON.parse(localStorage.getItem('proveedor'));
    console.log(this.Cliente);
    console.log(this.Proveedor);
  }

}
