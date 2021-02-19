import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DespesaFixa } from '../shared/models/despesaFixa.model';

@Injectable({
  providedIn: 'root'
})
export class DespesasFixasService {

  constructor(private http: HttpClient) { }

  getUser(): Observable<any> {
    return this.http.get(environment.URL + 'id');
  }

  porUsuario(): Observable<any> {
    return this.http.get(environment.URL + 'despesa-fixa/');
  }

  salvar(d: DespesaFixa): Observable<any> {
    return this.http.put(environment.URL + 'despesa-fixa', JSON.stringify(d));
  }
}
