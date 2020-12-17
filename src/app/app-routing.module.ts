import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarritoComponent } from './carrito/carrito.component';
import { CategoriaComponent } from './categoria/categoria.component';


import { LoginpageComponent } from './loginpage/loginpage.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { ModificarClienteComponent } from './modificar-cliente/modificar-cliente.component';
import { ModificarProveedorComponent } from './modificar-proveedor/modificar-proveedor.component';
import { ProductoComponent } from './producto/producto.component';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { SubastaComponent } from './subasta/subasta.component';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { TiendaComponent } from './tienda/tienda.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginpageComponent, pathMatch: 'full' },
  { path: 'modificar-cliente', component: ModificarClienteComponent, pathMatch: 'full' },
  { path: 'modificar-proveedor', component: ModificarProveedorComponent, pathMatch: 'full' },
  { path: 'categoria', component: CategoriaComponent, pathMatch: 'full' },
  { path: 'producto', component: ProductoComponent, pathMatch: 'full' },
  { path: 'producto/:id', component: ProductoComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterpageComponent, pathMatch: 'full' },
  { path: 'tarjeta', component: TarjetaComponent, pathMatch: 'full' },
  { path: 'mi-perfil', component: MiPerfilComponent, pathMatch: 'full' },
  { path: 'tienda', component: TiendaComponent, pathMatch: 'full' },
  { path: 'carrito', component: CarritoComponent, pathMatch: 'full' },
  { path: 'subasta/:id', component: SubastaComponent, pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
