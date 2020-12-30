import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseObject } from './ResponseObject';
import { environment } from '../../environments/environment';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ExternalService {
  public static get selectedGroup(): string {
    return localStorage.getItem('selectedGroup');
  }

  public static set selectedGroup(val: string) {
    if (val) {
      localStorage.setItem('selectedGroup', val)
    } else {
      localStorage.removeItem('selectedGroup');
    }
  }

  constructor(private httpClient: HttpClient) { }
  // Registro

  /**
   * Método utilizado para registrar un cliente mediante el bus de integración.
   * @param registrarData La data del cliente que se va  a crear.
   */
  registrarCliente(registrarData: IDataRegistroCliente): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(
      environment.groupsUrls[ExternalService.selectedGroup] + '/registrar-cliente', registrarData, httpOptions);
  }

  /**
   * Método utilizado para registrar un proveedor mediante el bus de integración.
   * @param registrarData La data del proveedor que se va  a crear.
   */
  registrarProveedor(registrarData: IDataRegistroProveedor): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(
      environment.groupsUrls[ExternalService.selectedGroup] + '/registrar-proveedor', registrarData, httpOptions);
  }

  // Login

  /**
   * Método utilizado para ingresar como cliente mediante el bus de integración.
   * @param loginData La data del cliente que va a ingresar.
   */
  loginCliente(loginData: { email: string, contrasena: string }): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(
      environment.groupsUrls[ExternalService.selectedGroup] + '/login-cliente', loginData, httpOptions);
  }

  /**
   * Método utilizado para ingresar como proveedor mediante el bus de integración.
   * @param loginData La data del proveedor que va a ingresar.
   */
  loginProveedor(loginData: { email: string, contrasena: string }): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(
      environment.groupsUrls[ExternalService.selectedGroup] + '/login-proveedor', loginData, httpOptions);
  }

  // Crear Producto

  /**
   * Método utilizado para ingresar un nuevo producto como cliente mediante el bus de integración.
   * @param crearProductoData La data del producto que se va a crear.
   */
  crearProductoCliente(crearProductoData: IDataCrearProductoCliente): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(
      environment.groupsUrls[ExternalService.selectedGroup] + '/crear-producto-cliente', crearProductoData, httpOptions);
  }

  /**
   * Método utilizado para ingresar un nuevo producto como proveedor mediante el bus de integración.
   * @param crearProductoData La data del producto que se va a crear.
   */
  crearProductoProveedor(crearProductoData: IDataCrearProductoProveedor): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(
      environment.groupsUrls[ExternalService.selectedGroup] + '/crear-producto-proveedor', crearProductoData, httpOptions);
  }

  // Ver Producto

  /**
   * Método utilizado para listar todos los productos del bus al cual se ha conectado la tienda.
   */
  verProductos(): Observable<ResponseObject> {
    return this.httpClient.get<ResponseObject>(
      environment.groupsUrls[ExternalService.selectedGroup] + '/ver-productos', httpOptions);
  }

  // Comprar

  /**
   * Método utilizado para realizar una compra mediante el bus de integración al cual se ha conectado la tienda.
   * @param compraData La data de la compra a realizar.
   */
  comprar(compraData: {
    id_cliente: number, productos: Array<{ id_producto: number, cantidad: number }>
  }): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(
      environment.groupsUrls[ExternalService.selectedGroup] + '/realizar-compra', compraData, httpOptions);
  }
}

export interface IDataRegistroCliente {
  nombre: string,
  apellido?: string,
  email: string,
  contrasena: string
  cellular?: number,
}

export interface IDataRegistroProveedor {
  nombre: string,
  apellido?: string,
  empresa: string,
  email: string,
  contrasena: string
  direccion?: string,
}

export interface IDataCrearProductoCliente {
  id_cliente: number,
  nombre: string,
  descripcion?: string,
  stock: number,
  precio_venta?: number,
  foto: string,
  fecha_subasta?: number,
  precio_inicial_subasta?: number,
  precio_compralo_ahora?: number,
}

export interface IDataCrearProductoProveedor {
  id_proveedor: number,
  nombre: string,
  descripcion?: string,
  stock: number,
  precio_venta?: number,
  foto: string,
  fecha_subasta?: number,
  precio_inicial_subasta?: number,
  precio_compralo_ahora?: number,
}