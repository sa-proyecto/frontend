import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseObject } from './ResponseObject';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const httpAddress = 'http://34.122.172.226:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(loginData: {username: string, password: string}): Observable<ResponseObject> {
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

}
