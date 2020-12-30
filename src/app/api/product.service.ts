import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getProductsProvider(idproveedor: string): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(httpAddress + '/verProductoProveedor', { idproveedor }, httpOptions);
  }

  getProductsClient(idcliente: string): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(httpAddress + '/verProductoCliente', { idcliente }, httpOptions);
  }

  getProductById(idProducto: string): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(httpAddress + '/verproducto', { id_producto: idProducto }, httpOptions);
  }

  getAllProducts(idcategoria: number = 0): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(httpAddress + '/VerCatalogoProductos', { idcategoria }, httpOptions);
  }

  getProductsByCategory(idcategoria: number): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(httpAddress + '/VerCatalogoProductos', { idcategoria }, httpOptions);
  }

  removeProductProvider(form): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(httpAddress + '/eliminarProducto', form, httpOptions);
  }

  removeProductClient(form): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(httpAddress + '/eliminarProductocliente', form, httpOptions);
  }

  addFavorite(idcliente: number, idproducto: number): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(httpAddress + '/anadirFavorito', { idcliente, idproducto }, httpOptions);
  }

  viewFavorite(idcliente: number): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(httpAddress + '/verFavoritoCliente', { idcliente }, httpOptions);
  }

  removeFavorite(idcliente: number, idproducto: number): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(httpAddress + '/eliminarfavorito', { idcliente, idproducto }, httpOptions);
  }

  verOfertas(idproducto: string): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(httpAddress + '/veroferta', { idproducto }, httpOptions);
  }

  hacerOfertas(idproducto: string, valorPuja: string, idcliente: string): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(httpAddress + '/haceroferta', {
      idproducto,
      valor_puja: valorPuja,
      idcliente
    }, httpOptions);
  }
}
