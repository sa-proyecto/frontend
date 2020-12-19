import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../api/cliente';
import { Proveedor } from '../api/proveedor';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isCollapsed = true;
  autoclose = false;
  cliente: Cliente;
  proveedor: Proveedor;
  constructor(private router: Router) {
    router.events.subscribe(val => {
      this.autoclose = true;
      this.isCollapsed = true;
    });
  }

  get ClienteConectado(): boolean {
    return this.cliente !== null;
  }

  get ProveedorConectado(): boolean {
    return this.proveedor !== null;
  }

  salir(): void {
    localStorage.removeItem('cliente');
    localStorage.removeItem('proveedor');
    localStorage.removeItem('cart');
    this.router.navigate(['login']).then(()=> {
      window.location.reload();
    });
  }

  ngOnInit(): void {
    this.cliente = JSON.parse(localStorage.getItem('cliente')) as Cliente;
    this.proveedor = JSON.parse(localStorage.getItem('proveedor')) as Proveedor;
  }

}
