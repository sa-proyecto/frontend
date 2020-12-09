import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginpageComponent } from './loginpage/loginpage.component';
import { ModificarClienteComponent } from './modificar-cliente/modificar-cliente.component';
import { ModificarProveedorComponent } from './modificar-proveedor/modificar-proveedor.component';
import { RegisterpageComponent } from './registerpage/registerpage.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginpageComponent, pathMatch: 'full' },
  { path: 'modificar-cliente', component: ModificarClienteComponent, pathMatch: 'full' },
  { path: 'modificar-proveedor', component: ModificarProveedorComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterpageComponent, pathMatch: 'full' },
  // { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
