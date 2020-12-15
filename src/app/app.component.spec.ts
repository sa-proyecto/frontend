import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TagInputModule } from 'ngx-chips';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarritoComponent } from './carrito/carrito.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { ModificarClienteComponent } from './modificar-cliente/modificar-cliente.component';
import { ModificarProveedorComponent } from './modificar-proveedor/modificar-proveedor.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductoComponent } from './producto/producto.component';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { TiendaComponent } from './tienda/tienda.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        BsDropdownModule.forRoot(),
        ProgressbarModule.forRoot(),
        TooltipModule.forRoot(),
        TimepickerModule.forRoot(),
        PopoverModule.forRoot(),
        CollapseModule.forRoot(),
        TagInputModule,
        JwBootstrapSwitchNg2Module,
        AngularMultiSelectModule,
        TabsModule.forRoot(),
        PaginationModule.forRoot(),
        AlertModule.forRoot(),
        BsDatepickerModule.forRoot(),
        CarouselModule.forRoot(),
        ModalModule.forRoot(),
      ],
      declarations: [
        NavbarComponent,
        AppComponent,
        LoginpageComponent,
        RegisterpageComponent,
        ModificarClienteComponent,
        ModificarProveedorComponent,
        CategoriaComponent,
        ProductoComponent,
        TarjetaComponent,
        MiPerfilComponent,
        TiendaComponent,
        CarritoComponent,
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
