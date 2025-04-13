import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service"
import { catchError, Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
import { MessageService } from 'primeng/api';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private authService: AuthService, private router: Router, private messageService: MessageService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const token = this.authService.getToken();

        if(token !== null){
            const authRequest = req.clone({setHeaders: {"Authorization" : `Bearer ${token}`}})
            return next.handle(authRequest).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Token expirado ou inválido. Redirecionando para o login...',
                    life: 3000
                });
                localStorage.clear();
                this.router.navigate(['/login']);
                }
                return throwError(() => error);
                
            }))
        }
        return next.handle(req)
        
    }
}