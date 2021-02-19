import { Usuario } from "./usuario.model";

export class Mes {
    id: Number | undefined;
    mes: number;
    ano: number;
    usuario: Usuario | undefined;
    salario: number;
    economia: number;
    livre: number;
    totalCartao: number;
    totalFixo: number;
    totalGasto: number;

    constructor() {
        this.mes = 0;
        this.ano = 0;
        this.salario = 0;
        this.economia = 0;
        this.livre = 0;
        this.totalCartao = 0;
        this.totalFixo = 0;
        this.totalGasto = 0;
    }
}