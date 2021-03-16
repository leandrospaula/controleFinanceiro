import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalLoginService {

  constructor(private http: HttpClient) { }

  login(usuario: any) {
    return this.http.post(environment.URL.replace('/api', '') + 'login', JSON.stringify(usuario), { observe: 'response' });
  }

  criar(usuario: any): Observable<any> {
    return this.http.post(environment.URL + 'usuario', JSON.stringify(usuario));
  }
}
