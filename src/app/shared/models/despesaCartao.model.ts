import { Cartao } from "./cartao.model";
import { Mes } from "./mes.model";

export class DespesaCartao{
    id : Number | undefined;
    nome: string;
    cartao: Cartao;
    data : String | undefined;
    valor : Number;
    mes : Mes;
    terceiros : boolean;
    vezes: number;

    constructor(){
        this.nome = '';
        this.cartao = new Cartao();
        this.valor = 0;
        this.mes = new Mes();
        this.terceiros = false;
        this.vezes = 1;
    }
}