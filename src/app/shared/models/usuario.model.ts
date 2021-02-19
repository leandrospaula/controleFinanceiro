
export class Usuario {
    id: Number | undefined;
    email: string;
    senha: string;
    nome: string;

    constructor() {
        this.email = '';
        this.senha = '';
        this.nome = '';
    }
}