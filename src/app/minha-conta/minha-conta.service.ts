import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../shared/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class MinhaContaService {

  constructor(private http : HttpClient) { }

  getPorId(): Observable<any>{
    return this.http.get(environment.URL + 'id');
  }

  salvar(usuario : Usuario, senha: boolean): Observable<any>{
    return this.http.put(environment.URL + 'usuario?reset=' + senha, JSON.stringify(usuario));
  }
  
}
