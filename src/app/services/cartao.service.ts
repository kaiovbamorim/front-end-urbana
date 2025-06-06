import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface DadosCartao {
  idUsuario: string;
  nome: string;
  tipo: string;
  status: boolean;
}

@Injectable({
  providedIn: 'root'
})


export class CartaoService {
  private baseUrl = `${environment.api}/cartao`;

  constructor(private http: HttpClient) { }

  getCartoes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/todos-cartoes`);
  }

  getCartoesUsuario(): Observable<any> {
    return this.http.get(`${this.baseUrl}/meus-cartoes`);
  }

  excluirCartao(id: String): Observable<any> {
    return this.http.delete(`${this.baseUrl}/excluir/${id}`);
  }
  
  alterarStatusCartao(id: String): Observable<any> {
    return this.http.put(`${this.baseUrl}/alterar-status/${id}`, {});
  }
  
  cadastrarCartao(dadosCartao: DadosCartao): Observable<any> {
    return this.http.post(`${this.baseUrl}/cadastrar`, dadosCartao);
  }

}
