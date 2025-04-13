import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface DadosUsuario {
  nome: string;
  email: string;
  tipo: string;
  senha: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = 'http://localhost:8080/usuario';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/todos-usuarios`);
  }

  cadastrarUsuario(dadosUsuario: DadosUsuario): Observable<any> {
    return this.http.post(`${this.baseUrl}/cadastrar`, dadosUsuario);
  }

  editarUsuario(dadosUsuario: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/editar`, dadosUsuario);
  }

  excluirUsuario(id: String): Observable<any> {
    return this.http.delete(`${this.baseUrl}/excluir/${id}`);
  }

}
