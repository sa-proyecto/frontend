import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseObject } from './ResponseObject';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const httpAddress = 'http://busg1.us-e2.cloudhub.io';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  addCard(form: {
    numerotarjeta: string,
    ping: string,
    fecha_vencimiento: string,
    estado: string,
    idcliente: string
  }): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(httpAddress + '/crearTarjeta', form, httpOptions);
  }

  removeCard(form: {
    numerotarjeta: string,
  }): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(httpAddress + '/eliminarTarjeta', form, httpOptions);
  }

  doPurchase(data: {
    entrega: number,
    numeroTarjeta: number,
    idCliente: number,
    items: Array<{ idProducto: number, cantidad: number }>,
    nit: number,
    direccionEnvio: string
  }) {
    return this.httpClient.post<ResponseObject>(httpAddress + '/hacerCompra', data, httpOptions);
  }

  doPurchaseNow(data: {
    entrega: number,
    numeroTarjeta: number,
    idCliente: number,
    items: Array<{ idProducto: number, cantidad: number }>,
    nit: number,
    direccionEnvio: string
  }) {
    return this.httpClient.post<ResponseObject>(httpAddress + '/hacerCompraSubastaDirecta', data, httpOptions);
  }

  doPurchaseSubasta(data: {
    entrega: number,
    numeroTarjeta: number,
    idCliente: number,
    items: Array<{ idSubasta: number }>,
    nit: number,
    direccionEnvio: string
  }) {
    console.log(data);
    return this.httpClient.post<ResponseObject>(httpAddress + '/hacerCompraSubasta', data, httpOptions);
  }

  getVentas(idproveedor: string): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(httpAddress + '/verVentaProveedor', { idproveedor }, httpOptions);
  }

  getFacturas(idcliente: string): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(httpAddress + '/verFacturaCliente', { idcliente }, httpOptions);
  }

  getCompras(): Observable<ResponseObject> {
    return this.httpClient.get<ResponseObject>(httpAddress + '/verCompras', httpOptions);
  }

  cambiarEstado(idfactura: number, estado: number): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(httpAddress + '/cambiotraking', { idfactura, estado }, httpOptions);
  }

  getShopping(idcliente: string): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(httpAddress + '/verCompraCliente', { idcliente }, httpOptions);
  }

  getSubastasGanadas(idcliente: string): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(httpAddress + '/versubastaganada', { idcliente }, httpOptions);
  }

  getSubastasParticipadas(idcliente: string): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(httpAddress + '/versubasta', { idcliente }, httpOptions);
  }
}
