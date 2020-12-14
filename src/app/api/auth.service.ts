import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseObject } from './ResponseObject';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const httpAddress = 'http://35.192.186.31:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(loginData: { username: string, password: string }): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(httpAddress + '/login', loginData, httpOptions);
  }

  proveedorRegister(registerData: {}): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(httpAddress + '/crearProveedor', registerData, httpOptions);
  }

  clienteRegister(registerData: {}): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(httpAddress + '/crearCliente', registerData, httpOptions);
  }

  clienteUpdate(clienteData: {}): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(httpAddress + '/modificarCliente', clienteData, httpOptions);
  }

  proveedorUpdate(proveedorData: {}): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(httpAddress + '/modificarProveedor', proveedorData, httpOptions);
  }

  refreshProvider(idproveedor: number): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(httpAddress + '/verPerfilProveedor',
      { idproveedor }, httpOptions);
  }

}
