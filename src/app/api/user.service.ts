import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseObject } from './ResponseObject';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const httpAddress = 'http://35.192.186.31:3000';

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
}