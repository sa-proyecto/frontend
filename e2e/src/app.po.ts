import { browser, by, element } from 'protractor';

export class AppPage {
  navigateToLoginPage() {
    return browser.get(browser.baseUrl + 'login') as Promise<any>;
  }
  navigateToModificarCliente() {
    return browser.get(browser.baseUrl + 'modificar-cliente') as Promise<any>;
  }
  navigateToModificarProveedor() {
    return browser.get(browser.baseUrl + 'modificar-proveedor') as Promise<any>;
  }
  navigateToCategoria() {
    return browser.get(browser.baseUrl + 'categoria') as Promise<any>;
  }
  navigateToProducto() {
    return browser.get(browser.baseUrl + 'producto') as Promise<any>;
  }
  navigateToRegistro() {
    return browser.get(browser.baseUrl + 'register') as Promise<any>;
  }
  navigateToTarjeta() {
    return browser.get(browser.baseUrl + 'tarjeta') as Promise<any>;
  }

  getLoginPageTitleText() {
    return element(by.id('titulo-inicio')).getText() as Promise<string>;
  }

  getModificarClientePageTitleText() {
    return element(by.id('titulo-modificar-cliente')).getText() as Promise<string>;
  }

  getModificarProveedorPageTitleText() {
    return element(by.id('titulo-modificar-proveedor')).getText() as Promise<string>;
  }

  getCategoriaPageTitleText() {
    return element(by.id('titulo-categoria')).getText() as Promise<string>;
  }

  getProductoPageTitleText() {
    return element(by.id('titulo-producto')).getText() as Promise<string>;
  }

  getRegistroPageTitleText() {
    return element(by.id('titulo-registro')).getText() as Promise<string>;
  }

  getTarjetaPageTitleText() {
    return element(by.id('titulo-registro-tarjeta')).getText() as Promise<string>;
  }
}
