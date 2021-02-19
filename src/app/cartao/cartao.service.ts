import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cartao } from '../shared/models/cartao.model';

@Injectable({
  providedIn: 'root'
})
export class CartaoService {

  constructor(private http: HttpClient) { }

  getPorId(id: number): Observable<any> {
    return this.http.get(environment.URL + 'cartao/id/' + id);
  }

  getPorUser(): Observable<any> {
    return this.http.get(environment.URL + 'cartao/user/');
  }

  getUser(): Observable<any> {
    return this.http.get(environment.URL + 'usuario/id');
  }

  salvar(cartao: Cartao): Observable<any> {
    return this.http.put(environment.URL + 'cartao', JSON.stringify(cartao));
  }
}
