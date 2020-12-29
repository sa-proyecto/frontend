import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Cliente } from '../api/cliente';
import { ExternalService } from '../api/external.service';
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
  private grupos: Array<{ nombreGrupo: string, idGrupo: string }> = [
    {
      nombreGrupo: 'Grupo 1',
      idGrupo: 'grupo1'
    },
    {
      nombreGrupo: 'Grupo 2',
      idGrupo: 'grupo2'
    },
    {
      nombreGrupo: 'Grupo 3',
      idGrupo: 'grupo3'
    },
    {
      nombreGrupo: 'Grupo 4',
      idGrupo: 'grupo4'
    },
    {
      nombreGrupo: 'Grupo 5',
      idGrupo: 'grupo5'
    },
    {
      nombreGrupo: 'Grupo 6',
      idGrupo: 'grupo6'
    },
    {
      nombreGrupo: 'Grupo 7',
      idGrupo: 'grupo7'
    },
    {
      nombreGrupo: 'Grupo 8',
      idGrupo: 'grupo8'
    },
    {
      nombreGrupo: 'Grupo 9',
      idGrupo: 'grupo9'
    },
    {
      nombreGrupo: 'Grupo 10',
      idGrupo: 'grupo10'
    },
    {
      nombreGrupo: 'Grupo 11',
      idGrupo: 'grupo11'
    },
    {
      nombreGrupo: 'Grupo 12',
      idGrupo: 'grupo12'
    },
    {
      nombreGrupo: 'Grupo 13',
      idGrupo: 'grupo13'
    },
    {
      nombreGrupo: 'Grupo 14',
      idGrupo: 'grupo14'
    },
    {
      nombreGrupo: 'Grupo 15',
      idGrupo: 'grupo15'
    },
    {
      nombreGrupo: 'Grupo 16',
      idGrupo: 'grupo16'
    },
    {
      nombreGrupo: 'Grupo 17',
      idGrupo: 'grupo17'
    },
  ]
  constructor(private router: Router) {
    router.events.subscribe(val => {
      this.autoclose = true;
      this.isCollapsed = true;
    });
  }

  get Grupos(): Array<{ nombreGrupo: string, idGrupo: string }> {
    return this.grupos;
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
    this.router.navigate(['login']).then(() => {
      window.location.reload();
    });
  }

  ngOnInit(): void {
    this.cliente = JSON.parse(localStorage.getItem('cliente')) as Cliente;
    this.proveedor = JSON.parse(localStorage.getItem('proveedor')) as Proveedor;
  }

  desconectar(): void {
    ExternalService.selectedGroup = null;
    this.router.navigate(['login']).then(() => {
      window.location.reload();
    });
  }

  conectar(idGrupo: string): void {
    this.salir();
    ExternalService.selectedGroup = environment.groupsUrls[idGrupo];
    this.router.navigate(['login']).then(() => {
      window.location.reload();
    });
  }

}
