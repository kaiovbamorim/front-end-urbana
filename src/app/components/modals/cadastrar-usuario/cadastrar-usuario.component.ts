import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.scss'],
  standalone: true,
  imports: [FormsModule, InputTextModule, PasswordModule, ButtonModule, DialogModule, ToastModule, DropdownModule],
  providers: [MessageService]
})
export class CadastrarUsuarioComponent implements OnInit {

  @Input() visible: boolean = false;
  @Output() usuarioCadastrado = new EventEmitter<any>();
  @Output() fechar = new EventEmitter<void>();

constructor(private usuarioService: UsuarioService, private messageService: MessageService) {}

  usuarioCadastro: any = {};
  modalCadastrarUsuario: boolean = false;
  tiposUsuarioOptions: any[] = [];

    ngOnInit() {
      this.tiposUsuarioOptions = [
        { name: 'Comum', code: 'COMUM' },
        { name: 'Administrador', code: 'ADMIN' },
      ];
      this.usuarioCadastro.tipo = this.tiposUsuarioOptions[0].code;
    }

  cadastrarUsuario(dadosUsuario: any) {
    this.usuarioService.cadastrarUsuario(dadosUsuario).subscribe({
      next: (res) => {
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Usuário cadastrado com sucesso!', life: 3000});
        this.usuarioCadastrado.emit(res);
        this.usuarioCadastro = {nome: '', email: '', senha: '', tipo: null}
      },
      error: (err) => {
        if (err.error) {
          err.error.forEach((e: any) => {
            this.messageService.add({severity: 'warn', summary: 'Aviso', detail: e.message, life: 4000});
          });
        } else {
          console.log(err)
          this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Não foi possível cadastrar o usuário.', life: 4000});
        }
      }
    });
  }

  fecharModal(){
    this.fechar.emit();
  }

}
