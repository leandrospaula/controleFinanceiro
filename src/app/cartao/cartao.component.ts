import { Component, OnInit } from '@angular/core';
import { switchAll } from 'rxjs/operators';
import { Cartao } from '../shared/models/cartao.model';
import { Usuario } from '../shared/models/usuario.model';
import { CartaoService } from './cartao.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cartao',
  templateUrl: './cartao.component.html',
  styleUrls: ['./cartao.component.css']
})

export class CartaoComponent implements OnInit {

  cartao: Cartao = new Cartao;
  listCartao: Array<Cartao> = new Array<Cartao>();
  cadastro: boolean = false;
  usuario: Usuario = new Usuario();

  constructor(private service: CartaoService) { }

  ngOnInit(): void {
    this.service.getUser().subscribe((res) => {
      this.usuario = res.dados;
      this.buscarCartoes();
    });

  }

  ativarDesativar(c: Cartao) {
    c.ativo = !c.ativo;
    this.service.salvar(c).subscribe(() => { });
  }

  buscarCartoes() {
    this.service.getPorUser().subscribe((res) => {
      this.listCartao = res.dados;
    });
  }

  editar(c: Cartao) {
    this.cartao = c;
    this.cadastro = true;
  }

  novo() {
    this.cartao = new Cartao();
    this.cartao.usuario = this.usuario;
    this.cadastro = true;
  }

  salvar() {
    this.service.salvar(this.cartao).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Cartão salvo com sucesso!'
      });
      this.buscarCartoes();
      this.cadastro = false;
    }, (e) => {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Um erro aconteceu, detalhe: ' + e.error.erros
      })
    });
  }

  validaDia(dia: Number): boolean {
    if (dia == null) {
      return false;
    } else {
      if (dia < 0 || dia > 31) {
        return true;
      } else {
        return false;
      }
    }
  }

  voltar() {
    this.cadastro = false;
  }

}
