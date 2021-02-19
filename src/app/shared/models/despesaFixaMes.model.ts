import { DespesaFixa } from "./despesaFixa.model";
import { Mes } from "./mes.model";

export class DespesaFixaMes{
    id : Number | undefined;
    mes : Mes | undefined;
    ativo: boolean;
    valor: Number | undefined;
    previsao: number;
    despesaFixa : DespesaFixa;
    editando: boolean;

    constructor(){
        this.ativo = true;
        this.editando = false;
        this.despesaFixa = new DespesaFixa();
        this.previsao = 0.0;
    }
}