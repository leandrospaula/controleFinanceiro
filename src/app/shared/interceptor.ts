import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { tap, mergeMap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private rota: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!request.url.includes(environment.URL)) {
            return next.handle(request);
        }
        request = request.clone({
            setHeaders: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + window.localStorage.getItem('token')
            }
        });
        return next.handle(request).pipe(catchError((e: HttpErrorResponse) => {
            if (e.status == 401) {
                window.localStorage.clear();
                this.rota.navigate(['']);
                return throwError(e);
            } else if (e.status == 403) {
                window.localStorage.clear();
                this.rota.navigate(['']);
                Swal.fire({
                    text: 'Acesso não autenticado, faça o login novamente'
                });
                return throwError(e);
            } else {
                return throwError(e);
            }
        }));
    }

}