import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  private baseUrl = 'http://localhost:8080/cartao';

  constructor(private http: HttpClient) { }

  getCartoes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/todos-cartoes`);
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
