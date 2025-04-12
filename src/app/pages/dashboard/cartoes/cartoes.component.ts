import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { CartaoService } from 'src/app/services/cartao.service';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cartoes',
  templateUrl: './cartoes.component.html',
  styleUrls: ['./cartoes.component.scss'],
  standalone: true,
  imports: [TableModule, TagModule, ButtonModule, ConfirmPopupModule, ToastModule, CommonModule],
  providers: [ConfirmationService, MessageService]
})
export class CartoesComponent implements OnInit {
    constructor(private cartaoService: CartaoService, private confirmationService: ConfirmationService, private messageService: MessageService) {}

    cartoes: any[] = [];
     ngOnInit() {
      this.cartaoService.getCartoes().subscribe((data) => {
        this.cartoes = data;
      })
    }
  
    confirmAlterarStatusCartao(event: Event, id: String, status: Boolean) {
      this.confirmationService.confirm({
          target: event.target as EventTarget,
          message: `Desejar ${status ? 'inativar' : 'ativar'} esse cartão?`,
          icon: 'pi pi-exclamation-circle',
          acceptIcon: 'pi pi-check mr-1',
          rejectIcon: 'pi pi-times mr-1',
          acceptLabel: 'Confirmar',
          rejectLabel: 'Cancelar',
          rejectButtonStyleClass: 'p-button-outlined p-button-sm',
          acceptButtonStyleClass: 'p-button-sm',
          accept: () => {
            this.cartaoService.alterarStatusCartao(id).subscribe({
              next: (res) => {
                this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Status do cartão alterado com sucesso!', life: 3000});
                this.cartoes = this.cartoes.map(cartao => {
                  if(cartao.id == id){
                    cartao.status = !status;
                  }
                  return cartao;
                });
              },
              error: (err) => {
                console.log(err)
                this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Não foi possível alterar o status do cartão.', life: 3000});
              }
            });
          },
      });
    }

    confirmExcluirCartao(event: Event, id: String) {
      this.confirmationService.confirm({
          target: event.target as EventTarget,
          message: 'Desejar excluir esse cartão?',
          icon: 'pi pi-exclamation-circle',
          acceptIcon: 'pi pi-check mr-1',
          rejectIcon: 'pi pi-times mr-1',
          acceptLabel: 'Confirmar',
          rejectLabel: 'Cancelar',
          rejectButtonStyleClass: 'p-button-outlined p-button-sm',
          acceptButtonStyleClass: 'p-button-sm',
          accept: () => {
            this.cartaoService.excluirCartao(id).subscribe({
              next: (res) => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Sucesso',
                  detail: 'Cartão excluído com sucesso!',
                  life: 3000
                });
                this.cartoes = this.cartoes.filter((cartao) => cartao.id !== id);
              },
              error: (err) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Erro',
                  detail: 'Não foi possível excluir o cartão.',
                  life: 3000
                });
              }
            });
          },
      });
    }

    getStatus(status: boolean) {
      return status ? 'success' : 'danger';
    }
}
