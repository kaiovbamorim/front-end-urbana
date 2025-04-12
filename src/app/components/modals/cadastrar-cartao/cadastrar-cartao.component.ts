import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { CartaoService } from 'src/app/services/cartao.service';

@Component({
  selector: 'app-cadastrar-cartao',
  templateUrl: './cadastrar-cartao.component.html',
  styleUrls: ['./cadastrar-cartao.component.scss'],
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, DialogModule, ToastModule, DropdownModule],
  providers: [MessageService]
})
export class CadastrarCartaoComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() idUsuario!: string;
  @Output() cartaoCadastrado = new EventEmitter<any>();
  @Output() fechar = new EventEmitter<void>();

  constructor(private cartaoService: CartaoService, private messageService: MessageService) {}

  cartaoCadastro: any = {};
  modalCadastrarCartao: boolean = false;

  tiposCartaoOptions: any[] = [];
  statusCartaoOptions: any[] = [];

  ngOnInit() {

    this.statusCartaoOptions = [
      { name: 'Ativo', code: true},
      { name: 'Inativo', code: false},
    ];
    this.cartaoCadastro.status = this.statusCartaoOptions[0].code;
    
    this.tiposCartaoOptions = [
      { name: 'Comum', code: 'COMUM' },
      { name: 'Estudante', code: 'ESTUDANTE' },
      { name: 'Trabalhador', code: 'TRABALHADOR' },
    ];
    
  }
  
  cadastrarCartao(cartao: any) {
    cartao.idUsuario = this.idUsuario;
    this.cartaoService.cadastrarCartao(cartao).subscribe({
      next: (res) => {
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Cartão cadastrado com sucesso!', life: 3000});
        this.cartaoCadastrado.emit();
        this.cartaoCadastro = {idUsuario: '', nome: '', tipo: null, status: true};
        
      },
      error: (err) => {
        if (err.error) {
          err.error.forEach((e: any) => {
            this.messageService.add({severity: 'warn', summary: 'Aviso', detail: e.message, life: 4000});
          });
        } else {
          this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Não foi possível cadastrar o cartão.', life: 4000});
        }
      }
    });
  }

  fecharModal(){
    this.fechar.emit();
  }

}
