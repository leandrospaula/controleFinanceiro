import { Usuario } from "./usuario.model";

export class Cartao{
    id : Number | undefined;
    nome: string;
    ativo: boolean;
    vencimento: Number  | undefined;
    fechamento: Number  | undefined;
    usuario : Usuario | undefined;

    constructor(){
        this.nome = '';
        this.ativo = true;
        this.vencimento = undefined;
        this.fechamento = undefined;
        this.usuario = undefined;
    }
}