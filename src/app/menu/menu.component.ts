import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent {
  constructor(private rota: Router) { }

  desenvolvimento() {
    Swal.fire({
      title: 'Em Desenvolvimento!',
      text: 'Essa area ainda está em desenvolvimento',
      icon: 'info'
    });
  }

  sair() {
    Swal.fire({
      title: 'Logout',
      text: 'Deseja Realmente sair?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sair',
      cancelButtonText: 'Cancelar'
    }).then((res) => {
      if (res.value) {
        window.localStorage.clear();
        this.rota.navigate(['']);
      }
    });
  }
}
