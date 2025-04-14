import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


interface DadosLogin {
  nome: string;
  senha: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.api}/auth`;
  constructor(private http: HttpClient) { }

    login(dadosLogin: DadosLogin): Observable<any> {
      return this.http.post(`${this.baseUrl}/usuario`, dadosLogin);
    }

    getToken(){
      return localStorage.getItem('token');
    }

    getUsuario(){
      return localStorage.getItem('usuario');
    }

    logout(){
      localStorage.clear();
    }

    isAdmin(){
      const usuarioString = this.getUsuario();
      if(usuarioString){
        const usuarioJson = JSON.parse(usuarioString);
          if(usuarioJson.tipo == "ADMIN"){
            return true;
          }
      }
      return false;
    }

}
