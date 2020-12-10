import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  addCategory(formData: {nombre: string}): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(httpAddress + '/crearCategoria', formData, httpOptions);
  }
}
