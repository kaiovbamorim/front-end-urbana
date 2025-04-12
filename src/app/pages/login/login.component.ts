import { Component } from '@angular/core';
import { Router} from '@angular/router'
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [InputTextModule, ButtonModule, FormsModule, ToastModule, PasswordModule],
  providers: [MessageService, AuthService]
})
export class LoginComponent {
  loading: boolean = false;
  login: any = {};
usuarioCadastro: any = {};
  constructor(private authService: AuthService,  private messageService: MessageService, private router: Router) {}

  Login(dadosLogin: any) {
      this.loading = true;

      this.authService.login(dadosLogin).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('usuario', JSON.stringify(res.usuario));

          this.loading = false
          this.router.navigate(['/dashboard/usuarios']);
        },
        error: (err) => {
          if (err.error) {
            err.error.forEach((e: any) => {
              this.messageService.add({severity: 'warn', summary: 'Aviso', detail: e.message, life: 4000});
              this.loading = false
            });
          } else {
            console.log(err)
            this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Não foi possível cadastrar o usuário.', life: 4000});
            this.loading = false
          }
        }
      })
  }
}
