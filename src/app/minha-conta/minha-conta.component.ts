import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuario } from '../shared/models/usuario.model';
import { MinhaContaService } from './minha-conta.service';

@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.component.html',
  styleUrls: ['./minha-conta.component.css']
})
export class MinhaContaComponent implements OnInit {

  usuario: Usuario = new Usuario();
  
  constructor(private service : MinhaContaService) { }

  ngOnInit(): void { 
    this.service.getPorId().subscribe((res) =>{
      this.usuario = res.dados;
    });
  }

  salvar(){
    this.service.salvar(this.usuario, false).subscribe((res) =>{
      this.usuario = res.dados;
    });
  }

  trocarSenha(){
    Swal.fire({
      icon: 'info',
      title: 'Em desenvolvimento!',
      text: 'A opção de troca de senha está em desenvolvimento'
    })
  }

}
