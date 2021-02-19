import { Mes } from "./mes.model";

export class Despesa{
    id : Number | undefined;
    nome: string;
    data : Number;
    valor : Number;
    mes : Mes;

    constructor(){
        this.nome = '';
        this.valor = 0;
        this.mes = new Mes();
        this.data = new Date().getDate();
    }
}