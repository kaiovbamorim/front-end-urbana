import { CadastrarUsuarioComponent } from '../../../components/modals/cadastrar-usuario/cadastrar-usuario.component';
import { CadastrarCartaoComponent } from "../../../components/modals/cadastrar-cartao/cadastrar-cartao.component";
import { EditarUsuarioComponent } from "../../../components/modals/editar-usuario/editar-usuario.component";
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CartaoService } from 'src/app/services/cartao.service';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  standalone: true,
  imports: [CadastrarUsuarioComponent, CadastrarCartaoComponent, EditarUsuarioComponent, TableModule, TagModule, ButtonModule, ConfirmPopupModule, ToastModule, TooltipModule, DialogModule, CommonModule, CadastrarCartaoComponent],
  providers: [ConfirmationService, MessageService]
})
export class UsuariosComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private cartaoService: CartaoService, private confirmationService: ConfirmationService, private messageService: MessageService) {}
  modalCadastrarUsuario: boolean = false;
  modalCadastrarCartao: boolean = false;
  modalEditarUsuario: boolean = false;

  usuarios: any[] = [];
  usuarioSelecionado: any = {};

  cartaoCadastro: any = {};

   ngOnInit() {
    this.usuarioService.getUsuarios().subscribe((data) => {
      this.usuarios = data;
    })
  }

  openModalCadastraUsuario(){
    this.modalCadastrarUsuario = true
  }

  returnModalCadastroUsuario(usuario: any){
    this.usuarios = [usuario, ...this.usuarios];
    this.modalCadastrarUsuario = false;
  }
  
  openModalCadastraCartao(idUsuario: String){
    this.modalCadastrarCartao = true
    this.cartaoCadastro.idUsuario = idUsuario;
  }
  
  returnModalCadastroCartao(){
    this.modalCadastrarCartao = false;
  }

  openModalEditarUsuario(usuario: any) {
    this.usuarioSelecionado = {...usuario};
    this.modalEditarUsuario = true;
  }

  returnModalEditarUsuario(dadosUsuario: any){
    this.usuarios = this.usuarios.map(usuario => {
      if(usuario.id == dadosUsuario.id){
        usuario.nome = dadosUsuario.nome;
        usuario.email = dadosUsuario.email;
      }
      return usuario;
    });
    this.modalEditarUsuario = false;
  }

  confirmExcluirUsuario(event: Event, id: string) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Desejar excluir esse usuário?',
        icon: 'pi pi-exclamation-circle',
        acceptIcon: 'pi pi-check mr-1',
        rejectIcon: 'pi pi-times mr-1',
        acceptLabel: 'Confirmar',
        rejectLabel: 'Cancelar',
        rejectButtonStyleClass: 'p-button-outlined p-button-sm',
        acceptButtonStyleClass: 'p-button-sm',
        accept: () => {
          this.usuarioService.excluirUsuario(id).subscribe({
            next: (res) => {
              this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Usuário excluído com sucesso!', life: 3000});
              this.usuarios = this.usuarios.filter((usuario) => usuario.id !== id);
            },
            error: (err) => {
              this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Não foi possível excluir o usuário.', life: 3000});
            }
          });
        },
    });
  }

}
