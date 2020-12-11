import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display inicio in loginpage', () => {
    page.navigateToLoginPage();
    expect(page.getLoginPageTitleText()).toEqual(
      'inicio'
    );
  });

  it('should display modificar datos cliente in modificar-cliente', () => {
    page.navigateToModificarCliente();
    expect(page.getModificarClientePageTitleText()).toEqual(
      'Modificar Datos Cliente'
    );
  });

  it('should display modificar datos proveedor in modificar-proveedor', () => {
    page.navigateToModificarProveedor();
    expect(page.getModificarProveedorPageTitleText()).toEqual(
      'Modificar Datos Proveedor'
    );
  });

  it('should display Categoria - in categoria', () => {
    page.navigateToCategoria();
    expect(page.getCategoriaPageTitleText()).toEqual(
      'Categoría -'
    );
  });

  it('should display Producto - in producto', () => {
    page.navigateToProducto();
    expect(page.getProductoPageTitleText()).toEqual(
      'Producto -'
    );
  });

  it('should display registro in registro', () => {
    page.navigateToRegistro();
    expect(page.getRegistroPageTitleText()).toEqual(
      'registro'
    );
  });

  it('should display registro de tarjeta. in registro de tarjeta', () => {
    page.navigateToTarjeta();
    expect(page.getTarjetaPageTitleText()).toEqual(
      'Registro de tarjeta.'
    );
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser
      .manage()
      .logs()
      .get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE
      } as logging.Entry)
    );
  });
});
