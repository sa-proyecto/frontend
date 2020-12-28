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
    // this.userService.getFacturas().subscribe(res => {
    //   if (res.status === 'success') {
    //     this.facturas = res.data;
    //   }
    // });
  }

}

interface IFacturas {
  numero_factura: number,
  nombre: string,
  nit: number,
  direccion_envio: string,
  estado: number,
}