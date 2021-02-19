import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalLoginService } from './modal-login.service';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {

  msg : String = '';
  usuario: any = {
    email: '',
    senha: ''
  }

  @ViewChild('fechar') fechar: ElementRef;

  constructor(private service: ModalLoginService, private rota : Router) { }

  ngOnInit(): void {
  }

  realizarLogin() {
    this.service.login(this.usuario).subscribe(resp => {
      window.localStorage.setItem('token', resp.headers.get('Authorization').replace('Bearer ', ''));
      this.fechar.nativeElement.click();
      this.rota.navigate(['controle']);
    }, (e) => {
      this.msg = "Falha no login, conta inexistente ou credenciais inválidas.";
    });
  }

}
