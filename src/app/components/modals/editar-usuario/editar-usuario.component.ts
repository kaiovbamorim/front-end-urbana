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
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss'],
  standalone: true,
  imports: [FormsModule, InputTextModule, PasswordModule, ButtonModule, DialogModule, ToastModule, DropdownModule],
  providers: [MessageService]
})
export class EditarUsuarioComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private messageService: MessageService) {}

  usuarioSelecionado: any = {};
  modalEditarUsuario: boolean = false;
  tipoUsuarioOptions: any[] = [];

  @Output() fechar = new EventEmitter<void>();
  @Output() usuarioEditar = new EventEmitter<any>();
  @Input() visible: boolean = false;
  @Input() set usuario(value: any) {
    this.usuarioSelecionado = { ...value };
  }

  ngOnInit(){
    this.tipoUsuarioOptions = [
      { name: 'Comum', code: 'COMUM' },
      { name: 'Administrador', code: 'ADMIN' },
    ];

    if(this.usuarioSelecionado.tipo == 'COMUM'){
      this.usuarioSelecionado.tipo = this.tipoUsuarioOptions[0].code;
    } else {
      this.usuarioSelecionado.tipo = this.tipoUsuarioOptions[1].code;
    }
  }

  editarUsuario(dadosUsuario: any){
    this.usuarioService.editarUsuario(dadosUsuario).subscribe({
      next: (res) => {
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Usuário editado com sucesso!', life: 3000});
        this.usuarioEditar.emit(res);
        this.usuarioSelecionado = {id: '', nome: '', email: '', tipo: null};
        
      },
      error: (err) => {
        if(err.error){
          err.error.forEach((e: any) => {
            this.messageService.add({severity: 'warn', summary: 'Aviso', detail: e.message, life: 4000});
          });
        } else {
          this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Não foi possível editar o usuário.', life: 4000});
        }
      }
    });
  }

  fecharModal(){
    this.fechar.emit();
  }

}