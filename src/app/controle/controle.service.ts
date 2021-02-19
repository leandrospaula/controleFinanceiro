import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DespesaCartao } from '../shared/models/despesaCartao.model';
import { Mes } from '../shared/models/mes.model';

@Injectable({
  providedIn: 'root'
})
export class ControleService {

  constructor(private http: HttpClient) { }


  deletarDespesa(id: any): Observable<any> {
    return this.http.delete(environment.URL + 'despesa/' + id);
  }

  deletarDespesaCartao(id: any): Observable<any> {
    return this.http.delete(environment.URL + 'despesa-cartao/' + id);
  }

  deletarDespesaFixaMes(id: any): Observable<any> {
    return this.http.delete(environment.URL + 'despesa-fixa-mes/' + id);
  }

  getAnos(): Observable<any> {
    return this.http.get(`${environment.URL}mes/anos`);
  }

  getCartoes(): Observable<any> {
    return this.http.get(environment.URL + 'cartao/user');
  }

  getDespesas(mes: any): Observable<any> {
    return this.http.get(environment.URL + 'despesa/mes/' + mes);
  }

  getDespesasCartao(mes: any): Observable<any> {
    return this.http.get(environment.URL + 'despesa-cartao/mes/' + mes);
  }

  getDespesasFixas(): Observable<any> {
    return this.http.get(environment.URL + 'despesa-fixa?ativos=true');
  }

  getDespesasFixasMes(mes: any): Observable<any> {
    return this.http.get(environment.URL + 'despesa-fixa-mes/mes/' + mes);
  }

  getMesAnterior(mes: number, ano: number): Observable<any> {
    return this.http.get(`${environment.URL}mes/${mes}/${ano}`);
  }

  getMeses(ano: number): Observable<any> {
    return this.http.get(`${environment.URL}mes/ano/${ano}`);
  }

  salvarDepesa(d: any): Observable<any> {
    return this.http.put(environment.URL + 'despesa', JSON.stringify(d));
  }

  salvarDespesaCartao(c: DespesaCartao): Observable<any> {
    return this.http.put(environment.URL + 'despesa-cartao', JSON.stringify(c));
  }

  salvarDespesaFixaMes(dfm: any): Observable<any> {
    return this.http.put(environment.URL + 'despesa-fixa-mes', JSON.stringify(dfm));
  }

  salvarMes(m: Mes): Observable<any> {
    return this.http.put(environment.URL + 'mes', JSON.stringify(m));
  }

}
