import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Cartao } from '../shared/models/cartao.model';
import { Despesa } from '../shared/models/despesa';
import { DespesaCartao } from '../shared/models/despesaCartao.model';
import { DespesaFixa } from '../shared/models/despesaFixa.model';
import { DespesaFixaMes } from '../shared/models/despesaFixaMes.model';
import { Mes } from '../shared/models/mes.model';
import { ControleService } from './controle.service';

@Component({
  selector: 'app-controle',
  templateUrl: './controle.component.html',
  styleUrls: ['./controle.component.css']
})
export class ControleComponent implements OnInit {

  adicionandoDespesa: boolean = false;
  ano: number = new Date().getFullYear();
  anos: Array<number> = new Array<number>();
  cartoes: Array<Cartao> = new Array<Cartao>();
  contasCartao: Array<DespesaCartao> = new Array<DespesaCartao>();
  cc: DespesaCartao = new DespesaCartao();
  contasFixas: Array<DespesaFixaMes> = new Array<DespesaFixaMes>();
  despesaFixa: DespesaFixa = new DespesaFixa();
  d: Despesa = new Despesa();
  despesas: Array<Despesa> = new Array<Despesa>();
  despesasFixas: Array<DespesaFixa> = new Array<DespesaFixa>();
  mes: Mes = new Mes();
  meses: Array<Mes> = new Array<Mes>();

  mesAtual: number = new Date().getMonth() + 1;
  anoAtual: number = new Date().getFullYear();

  constructor(private service: ControleService) { }

  ngOnInit(): void {
    this.carregarDados();
  }

  recalcular() {
    Swal.fire({
      title: 'Recalcular?',
      text: "Os valores aparentam estar incorretos? Deseja recalcular os valores deste mês?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Recalcular',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Aguarde',
          icon: 'info',
          text: 'Porfavor aguarde, os valores estão sendo recalculados!',
          showConfirmButton: false,
          allowOutsideClick: false
        });

        //Recontagem de despesas fixas
        let f = new Promise<void>((resolve) => {
          const fixas = [];
          this.mes.totalFixo = 0;
          this.contasFixas.forEach(df => {
            let p = new Promise<void>((resolve) => {
              if (df.despesaFixa.tipo == 'F') {
                this.mes.totalFixo += Number(df.despesaFixa.parte == undefined ? 0 : df.despesaFixa.parte);
              } else {
                this.mes.totalFixo += Number(df.despesaFixa.valor == undefined ? 0 : df.despesaFixa.valor);
              }
              this.mes.totalFixo = Number(this.mes.totalFixo.toFixed(2));
              resolve();
            });
            fixas.push(p);
          });
          if (this.contasFixas.length == 0) {
            resolve();
          }

          Promise.all(fixas).then(() => {
            resolve();
          });
        });

        let c = new Promise<void>((resolve) => {
          const cartoes = [];
          this.mes.totalCartao = 0;
          this.contasCartao.forEach(c => {
            let p = new Promise<void>((resolve) => {
              if (!c.terceiros) {
                this.mes.totalCartao += Number(c.valor == undefined ? 0 : c.valor);
                this.mes.totalCartao = Number(this.mes.totalCartao.toFixed(2));
                resolve();
              }else{
                resolve();
              }
            });
            cartoes.push(p);
          });
          if (this.contasCartao.length == 0) {
            resolve();
          }

          Promise.all(cartoes).then(() => {
            resolve();
          });
        });

        let d = new Promise<void>((resolve) => {
          const despesas = [];
          this.mes.totalGasto = 0;
          this.despesas.forEach(d => {
            let p = new Promise<void>((resolve) => {
              this.mes.totalGasto += Number(d.valor == undefined ? 0 : d.valor);
              this.mes.totalGasto = Number(this.mes.totalGasto.toFixed(2));
              resolve();
            });
            despesas.push(p);
          });
          if (this.despesas.length == 0) {
            resolve();
          }

          Promise.all(despesas).then(() => {
            resolve();
          });
        });

        Promise.all([f, c, d]).then(() => {
          Swal.close();
          this.salvar();
          Swal.fire('Atualizado', 'Valores atualizados', 'success');
        });
      }//Fim do SWAL
    })
  }

  carregarDados() {
    this.service.getMeses(this.ano).subscribe((res) => {
      this.meses = res.dados;
      this.service.getAnos().subscribe((res) => {
        this.anos = res.dados;
      });
      this.service.getCartoes().subscribe((res) => {
        this.cartoes = res.dados;
      });
      this.service.getDespesasFixas().subscribe((res) => {
        this.despesasFixas = res.dados;
      });
    }, (e) => {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Aconteceu um erro, detalhamento : ' + e.error.erros
      });
    });
  }

  background(m: Mes): String {
    if (m.ano > this.anoAtual) {
      return '';
    } else if (m.mes < this.mesAtual || m.ano < this.anoAtual) {
      return 'background-color: #2e353d80;'
    } else if (m.mes == this.mesAtual) {
      return 'background-color: green';
    }

    return '';
  }

  mudarAno(op: boolean) {
    if (op) {
      this.ano += 1;
      this.carregarDados();
    } else {
      this.ano -= 1;
      if (this.ano > 2018) {
        this.carregarDados();
      } else {
        this.ano = 2019;
        Swal.fire({
          icon: 'info',
          title: 'Informação!',
          text: 'Ano mínimo permitido atualmente é 2019'
        });
      }
    }
  }

  setAno(ano: number) {
    this.ano = ano;
    this.carregarDados();
  }

  nome(mes: number): string {
    switch (mes) {
      case 1:
        return 'JANEIRO';
      case 2:
        return 'FEVEREIRO';
      case 3:
        return 'MARÇO';
      case 4:
        return 'ABRIL';
      case 5:
        return 'MAIO';
      case 6:
        return 'JUNHO';
      case 7:
        return 'JULHO';
      case 8:
        return 'AGOSTO';
      case 9:
        return 'SETEMBRO';
      case 10:
        return 'OUTUBRO';
      case 11:
        return 'NOVEMBRO';
      case 12:
        return 'DEZEMBRO';
      default:
        return 'ERRO';
    }
  }

  editarMes(m: Mes) {
    this.mes = m;
    this.service.getDespesasCartao(this.mes.id).subscribe((res) => {
      this.contasCartao = res.dados;
    }, (e) => {
      Swal.fire({
        title: 'Erro',
        icon: 'error',
        text: 'Erro ao carregar as desoesas de cartao, ' + e.error.erros
      });
    });
    this.service.getDespesasFixasMes(this.mes.id).subscribe((res) => {
      this.contasFixas = res.dados;
    }, e => {
      Swal.fire({
        title: 'Erro',
        icon: 'error',
        text: 'Erro ao carregar as contas fixas, ' + e.error.erros
      });
    });
    this.service.getDespesas(this.mes.id).subscribe((res) => {
      this.despesas = res.dados;
    }, e => {
      Swal.fire({
        title: 'Erro',
        icon: 'error',
        text: 'Erro ao carregar as despesas do mês, ' + e.error.erros
      });
    });
  }

  fecharEdicao() {
    this.mes = new Mes();
    this.carregarDados();
  }

  deletarContaCartao(c: DespesaCartao) {
    this.service.deletarDespesaCartao(c.id).subscribe(() => {
      this.contasCartao.splice(this.contasCartao.indexOf(c), 1);
      this.mes.totalCartao -= (c.terceiros ? 0 : Number(c.valor));
      this.mes.totalCartao = Number(this.mes.totalCartao.toFixed(2));
      this.salvar();
    }, (e) => {
      Swal.fire({
        title: 'Erro!',
        text: 'Aconteceu um erro: ' + e.error.erros,
        icon: 'error'
      });
    });
  }

  salvar() {
    //Inicio de calculo, valor total baseado em salário - economia
    this.mes.livre = this.mes.salario - this.mes.economia - this.mes.totalCartao - this.mes.totalFixo - this.mes.totalGasto;
    this.mes.livre = Number(this.mes.livre.toFixed(2));
    this.service.salvarMes(this.mes).subscribe((res) => {
      this.mes = res.dados;
    });

  }

  adicionarContaCartao() {
    this.cc = new DespesaCartao();
    this.cc.mes = this.mes;
  }

  editarContaCartao(d: DespesaCartao) {
    this.mes.totalCartao -= (d.terceiros ? 0 : Number(d.valor));
    this.mes.totalCartao = Number(this.mes.totalCartao.toFixed(2));
    this.cc = d;
    this.contasCartao.splice(this.contasCartao.indexOf(d), 1);
  }

  salvarCartao() {
    this.service.salvarDespesaCartao(this.cc).subscribe((res) => {
      if (this.cc.vezes > 1) {
        this.service.getMeses(this.ano).subscribe((res) => {
          this.meses = res.dados;
        });
      }
      this.cc = res.dados;
      this.cc.valor = Number(this.cc.valor.toFixed(2));
      this.contasCartao.push(this.cc);
      this.mes.totalCartao += (this.cc.terceiros ? 0 : Number(this.cc.valor));
      this.mes.totalCartao = Number(this.mes.totalCartao.toFixed(2));
      this.cc = new DespesaCartao();
      this.salvar();
    }, (e) => {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Erro ao salvar despesa, erro detectado: ' + e.error.erros
      });
    });
  }

  adicionarFixa() {
    this.adicionandoDespesa = !this.adicionandoDespesa;
  }

  adicionarDespesaFixa() {
    if (this.despesaFixa.id != null) {
      let df: DespesaFixaMes = new DespesaFixaMes();
      df.ativo = true;
      df.editando = false;
      df.mes = this.mes;
      df.despesaFixa = this.despesaFixa;
      if (df.despesaFixa.tipo == 'F') {
        df.valor = df.despesaFixa.parte;
      } else {
        df.valor = undefined;
      }
      this.service.salvarDespesaFixaMes(df).subscribe((res) => {
        df = res.dados;
        this.contasFixas.unshift(df);
        this.mes.totalFixo += Number(df.valor);
        this.mes.totalFixo = Number(this.mes.totalFixo.toFixed(2));
        this.salvar();
      }, e => {
        Swal.fire({
          title: 'Erro!',
          icon: 'error',
          text: 'Aconteceu um erro ao inserir a despesa fixa, ' + e.error.erros
        });
      });
    }
  }

  copiarDespesas() {
    Swal.fire({
      title: 'Copiar despesas do mês anterior?',
      showCancelButton: true,
      confirmButtonText: `Copiar`,
      cancelButtonText: 'Não copiar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.getMesAnterior(this.mes.mes, this.mes.ano).subscribe((res) => {
          let anterior: Mes = res.dados;
          this.service.getDespesasFixasMes(anterior.id).subscribe((res) => {
            let list: Array<DespesaFixaMes> = res.dados;

            const promises = [];

            list.forEach(df => {
              let p = new Promise<void>((resolve) => {
                if (df.despesaFixa.tipo == 'V') {
                  df.valor = undefined;
                }
                df.mes = this.mes;
                df.id = undefined;
                this.service.salvarDespesaFixaMes(df).subscribe((res) => {
                  this.mes.totalFixo += Number(df.valor == undefined ? 0 : df.valor);
                  this.mes.totalFixo = Number(this.mes.totalFixo.toFixed(2));
                  this.contasFixas.push(res.dados);
                  resolve();
                });
              });
              promises.push(p);
            });

            Promise.all(promises).then(() => {
              this.salvar();
            });
            // p.then(() => {
            //   this.salvar();
            // });
          });
        }, (e) => {
          Swal.fire({
            title: 'Erro!',
            text: 'Aconteceu um erro: ' + e.error.erros,
            icon: 'error'
          });
        });
      }
    });
  }

  removerFixaMes(cf: DespesaFixaMes) {
    if (cf.id == undefined) {
      this.contasFixas.splice(this.contasFixas.indexOf(cf), 1);
    } else {
      this.service.deletarDespesaFixaMes(cf.id).subscribe(() => {
        this.contasFixas.splice(this.contasFixas.indexOf(cf), 1);
        this.mes.totalFixo -= Number(cf.valor);
        this.mes.totalFixo = Number(this.mes.totalFixo.toFixed(2));
        this.salvar();
      }, e => {
        Swal.fire({
          title: 'Erro!',
          text: 'Aconteceu um erro: ' + e.error.erros,
          icon: 'error'
        });
      });
    }
  }

  confirmarValor(cf: DespesaFixaMes) {

    Swal.fire({
      title: 'Confirmar valor',
      html: `<p>Digite o valor final da despesa fixa váriavel:</p>
      <input type=\'number\' min=\'0\' id="swal-input1" class="swal1-input form-control">`,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Atualizar',
      preConfirm: () => [
        (<HTMLInputElement>document.querySelector('#swal-input1')).value,
      ]
    }).then((resp) => {
      if (resp.dismiss) {
        //Cancelado
      } else {
        let valor = (resp.value != null ? resp.value : null);
        if (valor != null) {
          Swal.fire({
            title: 'Confirmar valor',
            html: `<p>Confirma o valor de R$${valor} para a despesa ${cf.despesaFixa.nome}?</p>`,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Atualizar'
          }).then((resp) => {
            if (!resp.dismiss) {
              cf.valor = Number(valor);
              this.service.salvarDespesaFixaMes(cf).subscribe(() => {
                this.mes.totalFixo += Number(cf.valor);
                this.mes.totalFixo = Number(this.mes.totalFixo.toFixed(2));
                this.salvar();
              }, e => {
                Swal.fire({
                  title: 'Erro',
                  icon: 'error',
                  text: 'Erro ao salvar despesa fixa, ' + e.error.errors
                });
              });
            }
          });
        }
      }
    });
  }

  adicionarDespesa() {
    this.d = new Despesa();
    this.d.mes = this.mes;
  }

  salvarDespesa(novo: boolean) {
    if (this.d.data == undefined) {
      Swal.fire({
        icon: 'warning',
        title: 'Preencha corretamente',
        text: 'Preencha o dia de despesa.'
      });
    } else {
      this.service.salvarDepesa(this.d).subscribe((res) => {
        this.d = res.dados;
        this.mes.totalGasto += Number(this.d.valor);
        this.mes.totalGasto = Number(this.mes.totalGasto.toFixed(2));
        this.despesas.push(this.d);
        this.salvar();
        if (novo) {
          this.adicionarDespesa();
        } else {
          this.d = new Despesa();
        }
      });
    }
  }

  editarDespesa(d: Despesa) {
    this.mes.totalGasto -= Number(d.valor);
    this.mes.totalGasto = Number(this.mes.totalGasto.toFixed(2));
    this.despesas.splice(this.despesas.indexOf(d), 1);
    this.d = d;
  }

  deletarDespesa(d: Despesa) {
    this.service.deletarDespesa(d.id).subscribe((res) => {
      this.despesas.splice(this.despesas.indexOf(d), 1);
      this.mes.totalGasto -= Number(d.valor);
      this.mes.totalGasto = Number(this.mes.totalGasto.toFixed(2));
      this.salvar();
    }, (e) => {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao apagar despesa, erro: ' + e.error.erros
      });
    });
  }

}
