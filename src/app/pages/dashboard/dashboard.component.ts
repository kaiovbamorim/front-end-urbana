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

  constructor(private router: Router, private authService: AuthService) {}
  
  ngOnInit() {

    this.items = [
      {
        label: 'Usuários',
        icon: 'pi pi-users',
        routerLink: ['/dashboard/usuarios'],
      },
      {
        label: 'Cartões',
        icon: 'pi pi-credit-card',
        routerLink: ['/dashboard/cartoes'],
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command:  () => {
          this.authService.logout();
          this.router.navigate(['/login']);
        },
      }
    ];
    
  }
  
}
