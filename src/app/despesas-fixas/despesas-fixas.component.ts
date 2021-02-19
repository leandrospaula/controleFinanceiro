import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DespesaFixa } from '../shared/models/despesaFixa.model';
import { Usuario } from '../shared/models/usuario.model';
import { DespesasFixasService } from './despesas-fixas.service';

@Component({
  selector: 'app-despesas-fixas',
  templateUrl: './despesas-fixas.component.html',
  styleUrls: ['./despesas-fixas.component.css']
})
export class DespesasFixasComponent implements OnInit {

  cadastro: boolean = false;
  despesas: Array<DespesaFixa> = new Array<DespesaFixa>();
  despesa: DespesaFixa = new DespesaFixa();
  usuario: Usuario = new Usuario();

  constructor(private service: DespesasFixasService) { }

  ngOnInit(): void {
    this.carregarDespesas();
    this.service.getUser().subscribe((res) => {
      this.usuario = res.dados;
    });
  }

  ativarDesativar(d: DespesaFixa) {
    d.ativo = !d.ativo;
    this.service.salvar(d).subscribe((res) => {
      this.carregarDespesas();
    });
  }

  carregarDespesas() {
    this.service.porUsuario().subscribe((res) => {
      this.despesas = res.dados;
    }, (e) => {
    });
  }

  editar(d: DespesaFixa) {
    this.despesa = d;
    this.cadastro = true;
  }

  novo() {
    this.cadastro = true;
    this.despesa = new DespesaFixa();
    this.despesa.usuario = this.usuario;
  }

  salvar() {
    this.service.salvar(this.despesa).subscribe((res) => {
      this.despesa = new DespesaFixa();
      this.cadastro = false;
      this.carregarDespesas();
      Swal.fire({
        title: 'Sucesso',
        icon: 'success',
        text: 'Despesa fixa salva com sucesso!'
      });
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
    this.despesa = new DespesaFixa();
  }

}
