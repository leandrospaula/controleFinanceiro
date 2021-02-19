import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isScrolled: boolean = false;
  deslogado: boolean = window.localStorage.getItem('token') == null;

  constructor(private service: HomeService, private rota: Router) { }

  ngOnInit(): void {
  }


  goto(s: string) {
    let e = document.getElementById(s);
    e.scrollIntoView();
  }

  @HostListener("window:scroll")
  scrollEvent() {
    window.pageYOffset >= 80 ? (this.isScrolled = true) : (this.isScrolled = false);
  }

  irRota() {
    this.rota.navigate(['controle']);
  }

}
