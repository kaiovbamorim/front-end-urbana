import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  items: MenuItem[] = [];
  sidebarVisible: boolean = false;
  mobile: boolean = false;
  nomeUsuario: any;
  primeiraLetraNome: any;
  constructor(private router: Router, private authService: AuthService) {}
  
  ngOnInit() {

    const usuarioString = this.authService.getUsuario();
    if(usuarioString) {
      const usuario = JSON.parse(usuarioString);
      this.nomeUsuario = usuario.nome;
      this.primeiraLetraNome = this.nomeUsuario.charAt(0);
    }

    this.items.push(
      {
        label: 'Home',
        icon: 'pi pi-home',
        command:  () => {
          this.router.navigate(['/dashboard/home']);
        },
      },
    );  

    if(this.authService.isAdmin()){
      this.items.push(
        {
          label: 'Usuários',
          icon: 'pi pi-users',
          routerLink: ['/dashboard/usuarios'],
        },
        {
          label: 'Cartões',
          icon: 'pi pi-credit-card',
          routerLink: ['/dashboard/cartoes'],
        }
      )
    }

    this.items.push(
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command:  () => {
          this.authService.logout();
          this.router.navigate(['/login']);
        },
      }
    )

  }

}
