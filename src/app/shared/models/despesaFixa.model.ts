import { Usuario } from "./usuario.model";

export class DespesaFixa {
    id: Number | undefined;
    nome : String;
    vencimento : Number;
    usuario : Usuario | undefined;
    tipo : String | undefined;
    calculo: String | undefined;
    ativo: boolean;
    valor: Number | undefined;
    parte: Number | undefined;

    constructor() {
        this.nome = '';
        this.vencimento = 0;
        this.ativo = true;
    }
}