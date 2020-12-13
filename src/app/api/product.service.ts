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
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  addCategory(formData: { nombre: string }): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(httpAddress + '/crearCategoria', formData, httpOptions);
  }

  getCategories(): Observable<ResponseObject> {
    return this.httpClient.get<ResponseObject>(httpAddress + '/verCategorias', httpOptions);
  }

  addProduct(formData): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(httpAddress + '/crearProducto', formData, httpOptions);
  }

  saveProduct(formData): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(httpAddress + '/modificacionProducto',
      { ...formData, ...{ idcategoria: formData.categoria } }, httpOptions);
  }

  getProducts(idproveedor: string): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(httpAddress + '/verProductoProveedor', { idproveedor }, httpOptions);
  }

  getProductsByCategory(idcategoria: number = 0): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(httpAddress + '/verCatalogoProductos', { idcategoria }, httpOptions);
  }

  removeProduct(form): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(httpAddress + '/eliminarProducto', form, httpOptions);
  }
}
