import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  private facturas: IFacturas[];

  constructor(
    private userService: UserService,
  ) { }

  get Facturas(): IFacturas[] {
    return this.facturas;
  }

  ngOnInit(): void {
    this.userService.getCompras().subscribe(res => {
      if (res.status === 'success') {
        this.facturas = res.data;
      }
    });
  }

  obtenerEstado(estado: number): string {
    switch (estado) {
      case 1:
        return 'Comprado';
      case 2:
        return 'Despachado por proveedor';
      case 3:
        return 'En Tienda';
      case 4:
        return 'En camino';
      case 5:
        return 'Entregado';
      default:
        return 'Error estado';
    }
  }

  obtenerEntrega(entrega: number): string {
    switch (entrega) {
      case 1:
        return 'Recoger en tienda';
      case 2:
        return 'Entrega en casa';
      default:
        return 'Error entrega';
    }
  }

  onEditClick(estado: number, factura: number, entrega: number) {
    if (entrega === 1 && estado === 4) {
      window.location.reload();
      return;
    }
    this.userService.cambiarEstado(factura, estado).subscribe(res => {
      console.log(res.status);
      if (res.status === 'success') {
        window.location.reload();
      }
    });
  }

}

interface IFacturas {
  id_factura: number,
  id_cliente: number,
  total: string,
  estado: number,
  entrega: number
}