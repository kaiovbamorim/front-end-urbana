import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuariosComponent } from './pages/dashboard/usuarios/usuarios.component';
import { CartoesComponent } from './pages/dashboard/cartoes/cartoes.component';
import { AuthGuardService } from './services/auth/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { 
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuardService] },
      { path: 'cartoes', component: CartoesComponent, canActivate: [AuthGuardService] }
    ]
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
